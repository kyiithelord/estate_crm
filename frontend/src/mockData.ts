export const stats = [
  { label: "Properties", value: 42 },
  { label: "Clients", value: 128 },
  { label: "Open Deals", value: 16 },
  { label: "Due Tasks", value: 5 }
];

export const deals = {
  new: [
    { id: 1, client: "Aung Aung", property: "Lanmadaw Condo", task: "Call today" },
    { id: 2, client: "Su Su", property: "Insein House", task: "Send pricing" }
  ],
  contacted: [
    { id: 3, client: "Min Thu", property: "Sanchaung Apartment", task: "Book visit" }
  ],
  visit: [
    { id: 4, client: "Mya Mya", property: "Dagon Land", task: "Collect feedback" }
  ],
  negotiation: [
    { id: 5, client: "Ko Lin", property: "Bahan Condo", task: "Discuss final offer" }
  ],
  closed: [
    { id: 6, client: "Hnin", property: "North Okkalapa House", task: "Completed" }
  ]
};

export const tasks = [
  { id: 1, title: "Call Aung Aung", due: "Today 4:00 PM", status: "pending" },
  { id: 2, title: "Prepare visit notes", due: "Tomorrow 10:00 AM", status: "pending" },
  { id: 3, title: "Update closed deal", due: "Done", status: "completed" }
];

export const properties = [
  { id: 1, title: "Lanmadaw Condo", type: "sale", location: "Yangon", status: "available", price: "$85,000" },
  { id: 2, title: "Insein House", type: "rent", location: "Yangon", status: "reserved", price: "$900/mo" },
  { id: 3, title: "Bahan Condo", type: "sale", location: "Yangon", status: "available", price: "$120,000" }
];

export const clients = [
  { id: 1, name: "Aung Aung", interest: "buy", agent: "Moe", phone: "+95 9 123 456 789" },
  { id: 2, name: "Su Su", interest: "rent", agent: "Moe", phone: "+95 9 987 654 321" },
  { id: 3, name: "Min Thu", interest: "buy", agent: "Admin", phone: "+95 9 444 555 666" }
];
