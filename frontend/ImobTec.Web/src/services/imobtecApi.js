const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || DEFAULT_BASE_URL;

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.message || "Erro ao comunicar com a API.";
    throw new Error(message);
  }

  return payload;
}

export async function listProperties(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") {
      params.append(key, String(value));
    }
  });

  const query = params.toString();
  const data = await requestJson(`/api/properties${query ? `?${query}` : ""}`);

  return data?.data ?? [];
}

export async function createProperty(payload, token) {
  return requestJson("/api/properties", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(payload),
  });
}

export async function getProperty(propertyId) {
  return requestJson(`/api/properties/${propertyId}`);
}
