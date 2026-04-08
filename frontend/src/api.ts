const env = (import.meta as { env?: Record<string, string | boolean> }).env ?? {};
const API_BASE = (env.VITE_API_URL as string | undefined) || (env.DEV ? "http://localhost:8000/api" : "/api");

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options
  });

  if (!response.ok) {
    let message = `API ${response.status}`;

    try {
      const data = (await response.json()) as { message?: string };
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Keep the fallback status message when no JSON error payload is available.
    }

    throw new Error(message);
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
  updateTask: (id: number, payload: unknown) => request(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(payload) })
};
