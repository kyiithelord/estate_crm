import { clients, deals, properties, stats, tasks } from "./mockData";

const stages = [
  { key: "new", label: "New Lead" },
  { key: "contacted", label: "Contacted" },
  { key: "visit", label: "Visit" },
  { key: "negotiation", label: "Negotiation" },
  { key: "closed", label: "Closed" }
] as const;

function App() {
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
            <p>5 reminders due</p>
            <button type="button">Create reminder</button>
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

        <section id="deals" className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Core feature</p>
              <h3>Deal Pipeline</h3>
            </div>
            <button type="button">New deal</button>
          </div>
          <div className="kanban">
            {stages.map((stage) => (
              <div key={stage.key} className="kanban-column">
                <header>
                  <h4>{stage.label}</h4>
                  <span>{deals[stage.key].length}</span>
                </header>
                <div className="deal-list">
                  {deals[stage.key].map((deal) => (
                    <article key={deal.id} className="deal-card">
                      <strong>{deal.client}</strong>
                      <p>{deal.property}</p>
                      <small>{deal.task}</small>
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
            <button type="button">Add property</button>
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
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.title}</td>
                    <td>{property.type}</td>
                    <td>{property.location}</td>
                    <td>{property.status}</td>
                    <td>{property.price}</td>
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
              <button type="button">Add client</button>
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
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.interest}</td>
                      <td>{client.agent}</td>
                      <td>{client.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="tasks" className="task-panel">
            <div className="panel-header">
              <h3>Tasks</h3>
              <button type="button">Add reminder</button>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <article key={task.id} className="task-card">
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.due}</p>
                  </div>
                  <span className={`pill ${task.status}`}>{task.status}</span>
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
