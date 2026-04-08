import { useEffect, useMemo, useState, type FormEvent } from "react";
import { api } from "./api";

const stages = [
  { key: "new", label: "New Lead" },
  { key: "contacted", label: "Contacted" },
  { key: "visit", label: "Visit" },
  { key: "negotiation", label: "Negotiation" },
  { key: "closed", label: "Closed" }
] as const;

function App() {
  const [properties, setProperties] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  const [propertyForm, setPropertyForm] = useState({ title: "", type: "sale", location: "", price: "" });
  const [clientForm, setClientForm] = useState({ name: "", interest: "buy", phone: "" });
  const [dealForm, setDealForm] = useState({ clientId: "", propertyId: "", stage: "new" });
  const [taskForm, setTaskForm] = useState({ title: "", due: "" });

  const scrollToForm = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const loadData = async () => {
    const [nextProperties, nextClients, nextDeals, nextTasks] = await Promise.all([
      api.listProperties(),
      api.listClients(),
      api.listDeals(),
      api.listTasks()
    ]);

    setProperties(nextProperties as typeof properties);
    setClients(nextClients as typeof clients);
    setDeals(nextDeals as typeof deals);
    setTasks(nextTasks as typeof tasks);
  };

  const stats = useMemo(() => {
    const openDeals = deals.filter((deal) => deal.stage !== "closed").length;
    const dueTasks = tasks.filter((task) => task.status === "pending").length;
    return [
      { label: "Properties", value: properties.length },
      { label: "Clients", value: clients.length },
      { label: "Open Deals", value: openDeals },
      { label: "Due Tasks", value: dueTasks }
    ];
  }, [clients.length, deals, properties.length, tasks]);

  const dealsByStage = useMemo(() => {
    return stages.reduce((acc, stage) => {
      acc[stage.key] = deals.filter((deal) => deal.stage === stage.key);
      return acc;
    }, {} as Record<(typeof stages)[number]["key"], typeof deals>);
  }, [deals]);

  const clientLookup = useMemo(
    () => new Map(clients.map((client) => [client.id, client.name])),
    [clients]
  );

  const propertyLookup = useMemo(
    () => new Map(properties.map((property) => [property.id, property.title])),
    [properties]
  );

  useEffect(() => {
    let cancelled = false;
    let retryTimer: number | undefined;

    const load = async () => {
      try {
        await loadData();
        if (!cancelled) {
          setFeedback("");
        }
      } catch {
        if (!cancelled) {
          setProperties([]);
          setClients([]);
          setDeals([]);
          setTasks([]);
          setFeedback("Could not load data from the backend yet. Retrying automatically...");
          retryTimer = window.setTimeout(load, 2000);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, []);

  const handleAddProperty = async (event: FormEvent) => {
    event.preventDefault();
    if (!propertyForm.title.trim() || !propertyForm.location.trim()) {
      return;
    }
    const nextProperty = {
      title: propertyForm.title,
      property_type: propertyForm.type,
      location: propertyForm.location,
      status: "available",
      price: propertyForm.price ? Number(propertyForm.price) : 0
    };

    try {
      await api.createProperty(nextProperty);
      await loadData();
      setPropertyForm({ title: "", type: "sale", location: "", price: "" });
      setFeedback("Property saved.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not save property.");
    }
  };

  const handleAddClient = async (event: FormEvent) => {
    event.preventDefault();
    if (!clientForm.name.trim()) {
      return;
    }
    const nextClient = {
      name: clientForm.name,
      interest: clientForm.interest,
      phone: clientForm.phone || null
    };

    try {
      await api.createClient(nextClient);
      await loadData();
      setClientForm({ name: "", interest: "buy", phone: "" });
      setFeedback("Client saved.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not save client.");
    }
  };

  const handleAddDeal = async (event: FormEvent) => {
    event.preventDefault();
    if (!dealForm.clientId || !dealForm.propertyId) {
      return;
    }
    const nextDeal = {
      client_id: Number(dealForm.clientId),
      property_id: Number(dealForm.propertyId),
      stage: dealForm.stage
    };

    try {
      await api.createDeal(nextDeal);
      await loadData();
      setDealForm({ clientId: "", propertyId: "", stage: "new" });
      setFeedback("Deal saved.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not save deal.");
    }
  };

  const handleAddTask = async (event: FormEvent) => {
    event.preventDefault();
    if (!taskForm.title.trim()) {
      return;
    }
    const nextTask = {
      user_id: 1,
      title: taskForm.title,
      due_date: taskForm.due || new Date().toISOString()
    };

    try {
      await api.createTask(nextTask);
      await loadData();
      setTaskForm({ title: "", due: "" });
      setFeedback("Task saved.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not save task.");
    }
  };

  const toggleTask = (id: number) => {
    const nextStatus = tasks.find((task) => task.id === id)?.status === "pending" ? "completed" : "pending";
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: nextStatus ?? task.status } : task))
    );

    if (nextStatus) {
      api.updateTask(id, { status: nextStatus }).catch(() => {
        setTasks(previousTasks);
      });
    }
  };

  const advanceDealStage = (id: number) => {
    const stageOrder = stages.map((stage) => stage.key);
    const nextDeals = deals.map((deal) => {
      if (deal.id !== id) {
        return deal;
      }
        const currentIndex = stageOrder.indexOf(deal.stage);
        const nextIndex = Math.min(currentIndex + 1, stageOrder.length - 1);
        return { ...deal, stage: stageOrder[nextIndex] };
      });
    const previousDeals = deals;

    setDeals(nextDeals);

    const updatedDeal = nextDeals.find((deal) => deal.id === id);
    if (updatedDeal) {
      api.updateDealStage(id, updatedDeal.stage).catch(() => {
        setDeals(previousDeals);
      });
    }
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">EC</span>
          <div>
            <h1>Estate CRM</h1>
            <p>Agent workspace</p>
          </div>
        </div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#properties">Properties</a>
          <a href="#clients">Clients</a>
          <a href="#deals">Deals</a>
          <a href="#tasks">Tasks</a>
        </nav>
      </aside>

      <main className="content">
        {feedback ? <p className="feedback">{feedback}</p> : null}
        <section id="dashboard" className="hero">
          <div>
            <p className="eyebrow">Real estate CRM SaaS</p>
            <h2>Track leads, properties, deals, and follow-ups in one place.</h2>
            <p className="hero-copy">
              This starter dashboard is aligned to the MVP so we stay focused on what helps agents use the product every day.
            </p>
          </div>
          <div className="quick-card">
            <h3>Today</h3>
            <p>{stats[3].value} reminders due</p>
            <button type="button" onClick={() => scrollToForm("quick-add-task")}>Create reminder</button>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>

        <section className="panel" id="quick-add">
          <div className="panel-header">
            <h3>Quick Add</h3>
            <p className="eyebrow">Live data flow</p>
          </div>
          <div className="quick-grid">
            <form id="quick-add-property" className="quick-form" onSubmit={handleAddProperty}>
              <h4>Add property</h4>
              <input
                type="text"
                placeholder="Title"
                value={propertyForm.title}
                onChange={(event) => setPropertyForm((prev) => ({ ...prev, title: event.target.value }))}
              />
              <input
                type="text"
                placeholder="Location"
                value={propertyForm.location}
                onChange={(event) => setPropertyForm((prev) => ({ ...prev, location: event.target.value }))}
              />
              <input
                type="text"
                placeholder="Price"
                value={propertyForm.price}
                onChange={(event) => setPropertyForm((prev) => ({ ...prev, price: event.target.value }))}
              />
              <select
                value={propertyForm.type}
                onChange={(event) => setPropertyForm((prev) => ({ ...prev, type: event.target.value }))}
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
              <button type="submit">Save</button>
            </form>

            <form id="quick-add-client" className="quick-form" onSubmit={handleAddClient}>
              <h4>Add client</h4>
              <input
                type="text"
                placeholder="Name"
                value={clientForm.name}
                onChange={(event) => setClientForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                type="text"
                placeholder="Phone"
                value={clientForm.phone}
                onChange={(event) => setClientForm((prev) => ({ ...prev, phone: event.target.value }))}
              />
              <select
                value={clientForm.interest}
                onChange={(event) => setClientForm((prev) => ({ ...prev, interest: event.target.value }))}
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
              <button type="submit">Save</button>
            </form>

            <form id="quick-add-deal" className="quick-form" onSubmit={handleAddDeal}>
              <h4>Add deal</h4>
              <select
                value={dealForm.clientId}
                onChange={(event) => setDealForm((prev) => ({ ...prev, clientId: event.target.value }))}
              >
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <select
                value={dealForm.propertyId}
                onChange={(event) => setDealForm((prev) => ({ ...prev, propertyId: event.target.value }))}
              >
                <option value="">Select property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.title}
                  </option>
                ))}
              </select>
              <select
                value={dealForm.stage}
                onChange={(event) => setDealForm((prev) => ({ ...prev, stage: event.target.value }))}
              >
                {stages.map((stage) => (
                  <option key={stage.key} value={stage.key}>
                    {stage.label}
                  </option>
                ))}
              </select>
              <button type="submit">Save</button>
            </form>

            <form id="quick-add-task" className="quick-form" onSubmit={handleAddTask}>
              <h4>Add task</h4>
              <input
                type="text"
                placeholder="Task title"
                value={taskForm.title}
                onChange={(event) => setTaskForm((prev) => ({ ...prev, title: event.target.value }))}
              />
              <input
                type="text"
                placeholder="Due date"
                value={taskForm.due}
                onChange={(event) => setTaskForm((prev) => ({ ...prev, due: event.target.value }))}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </section>

        <section id="deals" className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Core feature</p>
              <h3>Deal Pipeline</h3>
            </div>
            <button type="button" onClick={() => scrollToForm("quick-add-deal")}>New deal</button>
          </div>
          <div className="kanban">
            {stages.map((stage) => (
              <div key={stage.key} className="kanban-column">
                <header>
                  <h4>{stage.label}</h4>
                  <span>{dealsByStage[stage.key].length}</span>
                </header>
                <div className="deal-list">
                  {!dealsByStage[stage.key].length ? <p className="empty-copy">No deals in this stage yet.</p> : null}
                  {dealsByStage[stage.key].map((deal) => (
                    <article key={deal.id} className="deal-card">
                      <strong>
                        {typeof deal.client !== "undefined"
                          ? deal.client
                          : clientLookup.get(deal.client_id) ?? "Client"}
                      </strong>
                      <p>
                        {typeof deal.property !== "undefined"
                          ? deal.property
                          : propertyLookup.get(deal.property_id) ?? "Property"}
                      </p>
                      <small>{deal.task}</small>
                      {stage.key !== "closed" ? (
                        <button type="button" className="ghost" onClick={() => advanceDealStage(deal.id)}>
                          Advance stage
                        </button>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="properties" className="panel">
          <div className="panel-header">
            <h3>Properties</h3>
            <button type="button" onClick={() => scrollToForm("quick-add-property")}>Add property</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {!properties.length ? (
                  <tr>
                    <td colSpan={5} className="empty-cell">No properties yet.</td>
                  </tr>
                ) : null}
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.title}</td>
                    <td>{"property_type" in property ? property.property_type : property.type}</td>
                    <td>{property.location}</td>
                    <td>{property.status}</td>
                    <td>{typeof property.price === "number" ? `$${property.price.toLocaleString()}` : property.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="clients" className="panel two-column">
          <div>
            <div className="panel-header">
              <h3>Clients</h3>
              <button type="button" onClick={() => scrollToForm("quick-add-client")}>Add client</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Interest</th>
                    <th>Agent</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                {!clients.length ? (
                  <tr>
                    <td colSpan={4} className="empty-cell">No clients yet.</td>
                  </tr>
                ) : null}
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.interest}</td>
                    <td>{"agent" in client ? client.agent : "-"}</td>
                    <td>{client.phone ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div id="tasks" className="task-panel">
            <div className="panel-header">
              <h3>Tasks</h3>
              <button type="button" onClick={() => scrollToForm("quick-add-task")}>Add reminder</button>
            </div>
            <div className="task-list">
              {!tasks.length ? <p className="empty-copy">No tasks yet.</p> : null}
              {tasks.map((task) => (
                <article key={task.id} className="task-card">
                  <div>
                    <strong>{task.title}</strong>
                    <p>
                      {"due" in task
                        ? task.due
                        : task.due_date
                          ? new Date(task.due_date).toLocaleString()
                          : "Today"}
                    </p>
                  </div>
                  <div className="task-actions">
                    <span className={`pill ${task.status}`}>{task.status}</span>
                    <button type="button" className="ghost" onClick={() => toggleTask(task.id)}>
                      {task.status === "pending" ? "Complete" : "Reopen"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
