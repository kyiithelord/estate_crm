const API_BASE = (import.meta as { env?: Record<string, string> }).env?.VITE_API_URL || "http://localhost:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  listProperties: () => request("/properties"),
  createProperty: (payload: unknown) => request("/properties", { method: "POST", body: JSON.stringify(payload) }),
  listClients: () => request("/clients"),
  createClient: (payload: unknown) => request("/clients", { method: "POST", body: JSON.stringify(payload) }),
  listDeals: () => request("/deals"),
  createDeal: (payload: unknown) => request("/deals", { method: "POST", body: JSON.stringify(payload) }),
  updateDealStage: (id: number, stage: string) =>
    request(`/deals/${id}/stage`, { method: "PATCH", body: JSON.stringify({ stage }) }),
  listTasks: () => request("/tasks"),
  createTask: (payload: unknown) => request("/tasks", { method: "POST", body: JSON.stringify(payload) }),
  completeTask: (id: number) => request(`/tasks/${id}/complete`, { method: "PATCH" })
};
