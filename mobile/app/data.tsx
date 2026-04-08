import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";

type DealStage = "new" | "contacted" | "visit" | "negotiation" | "closed";

type Deal = {
  id: number;
  title?: string;
  client_id?: number;
  property_id?: number;
  stage: DealStage;
};

type Task = {
  id: number;
  title: string;
  due?: string;
  due_date?: string;
  status: "pending" | "completed";
};

type Client = {
  id: number;
  name: string;
  interest: string;
  phone: string;
};

type Property = {
  id: number;
  title: string;
  type?: string;
  property_type?: string;
  location: string;
  status: string;
};

type DataContextValue = {
  deals: Deal[];
  tasks: Task[];
  clients: Client[];
  properties: Property[];
  clientLookup: Map<number, string>;
  propertyLookup: Map<number, string>;
  advanceDeal: (id: number) => void;
  toggleTask: (id: number) => void;
};

const DataContext = createContext<DataContextValue | null>(null);

const stageOrder: DealStage[] = ["new", "contacted", "visit", "negotiation", "closed"];
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  const clientLookup = useMemo(
    () => new Map(clients.map((client) => [client.id, client.name])),
    [clients]
  );

  const propertyLookup = useMemo(
    () => new Map(properties.map((property) => [property.id, property.title])),
    [properties]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const [nextClients, nextDeals, nextProperties, nextTasks] = await Promise.all([
          api.listClients(),
          api.listDeals(),
          api.listProperties(),
          api.listTasks()
        ]);

        setDeals(Array.isArray(nextDeals) ? (nextDeals as Deal[]) : []);
        setTasks(Array.isArray(nextTasks) ? (nextTasks as Task[]) : []);
        setClients(Array.isArray(nextClients) ? (nextClients as Client[]) : []);
        setProperties(Array.isArray(nextProperties) ? (nextProperties as Property[]) : []);
      } catch {
        setDeals([]);
        setTasks([]);
        setClients([]);
        setProperties([]);
      }
    };

    load();
  }, []);

  const advanceDeal = (id: number) => {
    const previousDeals = deals;
    const nextDeals = deals.map((deal) => {
      if (deal.id !== id) {
        return deal;
      }
      const currentIndex = stageOrder.indexOf(deal.stage);
      const nextIndex = Math.min(currentIndex + 1, stageOrder.length - 1);
      return { ...deal, stage: stageOrder[nextIndex] };
    });

    setDeals(nextDeals);

    const updatedDeal = nextDeals.find((deal) => deal.id === id);
    if (!updatedDeal) {
      return;
    }

    api.updateDealStage(id, updatedDeal.stage).catch(() => {
      setDeals(previousDeals);
    });
  };

  const toggleTask = (id: number) => {
    const previousTasks = tasks;
    const nextTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: (task.status === "pending" ? "completed" : "pending") as Task["status"] } : task
    );

    setTasks(nextTasks);

    const updatedTask = nextTasks.find((task) => task.id === id);
    if (!updatedTask) {
      return;
    }

    api.updateTask(id, { status: updatedTask.status }).catch(() => {
      setTasks(previousTasks);
    });
  };

  const value = useMemo(
    () => ({
      deals,
      tasks,
      clients,
      properties,
      clientLookup,
      propertyLookup,
      advanceDeal,
      toggleTask
    }),
    [clients, deals, properties, tasks, clientLookup, propertyLookup]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
}
