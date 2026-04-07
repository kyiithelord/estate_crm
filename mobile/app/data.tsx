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
  type: string;
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
  const [deals, setDeals] = useState<Deal[]>([
    { id: 1, title: "Aung Aung - Lanmadaw Condo", stage: "new" },
    { id: 2, title: "Su Su - Insein House", stage: "new" },
    { id: 3, title: "Min Thu - Sanchaung Apartment", stage: "contacted" },
    { id: 4, title: "Mya Mya - Dagon Land", stage: "visit" },
    { id: 5, title: "Ko Lin - Bahan Condo", stage: "negotiation" },
    { id: 6, title: "Hnin - North Okkalapa House", stage: "closed" }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Call Aung Aung", due: "Today 4:00 PM", status: "pending" },
    { id: 2, title: "Prepare visit notes", due: "Tomorrow 10:00 AM", status: "pending" },
    { id: 3, title: "Update closed deal", due: "Done", status: "completed" }
  ]);

  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Aung Aung", interest: "Buy", phone: "+95 9 123 456 789" },
    { id: 2, name: "Su Su", interest: "Rent", phone: "+95 9 987 654 321" },
    { id: 3, name: "Min Thu", interest: "Buy", phone: "+95 9 444 555 666" }
  ]);

  const [properties, setProperties] = useState<Property[]>([
    { id: 1, title: "Lanmadaw Condo", type: "Sale", location: "Yangon", status: "Available" },
    { id: 2, title: "Insein House", type: "Rent", location: "Yangon", status: "Reserved" },
    { id: 3, title: "Bahan Condo", type: "Sale", location: "Yangon", status: "Available" }
  ]);

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

        setDeals(nextDeals as Deal[]);
        setTasks(nextTasks as Task[]);
        if (Array.isArray(nextClients)) {
          setClients(nextClients as Client[]);
        }
        if (Array.isArray(nextProperties)) {
          setProperties(nextProperties as Property[]);
        }
      } catch {
        // Keep local seed data when API is unavailable.
      }
    };

    load();
  }, []);

  const advanceDeal = (id: number) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== id) {
          return deal;
        }
        const currentIndex = stageOrder.indexOf(deal.stage);
        const nextIndex = Math.min(currentIndex + 1, stageOrder.length - 1);
        const nextStage = stageOrder[nextIndex];
        api.updateDealStage(id, nextStage).catch(() => null);
        return { ...deal, stage: nextStage };
      })
    );
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task
      )
    );

    api.completeTask(id).catch(() => null);
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
