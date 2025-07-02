// fetchWithAuth: 토큰 자동 헤더 포함 fetch
export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("accessToken");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
}
