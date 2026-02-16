/**
 * Fetch wrapper for API calls. Uses relative /api so Vite dev server proxies
 * to the backend (no CORS). Same /api in production if your server proxies it.
 */
const API_BASE = "/api";

export async function request(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = res.status === 204 ? null : await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || res.statusText || "Request failed");
  }
  return data;
}
