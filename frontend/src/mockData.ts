export const initialDeals = [
  { id: 1, client_id: 1, property_id: 1, task: "Call today", stage: "new" },
  { id: 2, client_id: 2, property_id: 2, task: "Send pricing", stage: "new" },
  { id: 3, client_id: 3, property_id: 3, task: "Book visit", stage: "contacted" },
  { id: 4, client_id: 1, property_id: 2, task: "Collect feedback", stage: "visit" },
  { id: 5, client_id: 2, property_id: 3, task: "Discuss final offer", stage: "negotiation" },
  { id: 6, client_id: 3, property_id: 1, task: "Completed", stage: "closed" }
];

export const initialTasks = [
  { id: 1, title: "Call Aung Aung", due: "Today 4:00 PM", status: "pending" },
  { id: 2, title: "Prepare visit notes", due: "Tomorrow 10:00 AM", status: "pending" },
  { id: 3, title: "Update closed deal", due: "Done", status: "completed" }
];

export const initialProperties = [
  { id: 1, title: "Lanmadaw Condo", type: "sale", location: "Yangon", status: "available", price: "$85,000" },
  { id: 2, title: "Insein House", type: "rent", location: "Yangon", status: "reserved", price: "$900/mo" },
  { id: 3, title: "Bahan Condo", type: "sale", location: "Yangon", status: "available", price: "$120,000" }
];

export const initialClients = [
  { id: 1, name: "Aung Aung", interest: "buy", agent: "Moe", phone: "+95 9 123 456 789" },
  { id: 2, name: "Su Su", interest: "rent", agent: "Moe", phone: "+95 9 987 654 321" },
  { id: 3, name: "Min Thu", interest: "buy", agent: "Admin", phone: "+95 9 444 555 666" }
];
