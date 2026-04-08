const API_BASE = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";

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
  listClients: () => request("/clients"),
  listDeals: () => request("/deals"),
  listProperties: () => request("/properties"),
  listTasks: () => request("/tasks"),
  updateDealStage: (id: number, stage: string) =>
    request(`/deals/${id}/stage`, { method: "PATCH", body: JSON.stringify({ stage }) }),
  updateTask: (id: number, payload: Record<string, unknown>) =>
    request(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(payload) })
};
