// JWT 토큰을 자동으로 헤더에 추가해주는 fetch 유틸 함수
// 인증이 필요한 API 요청 시 사용합니다.
// fetchWithAuth: 토큰 자동 헤더 포함 fetch
export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("accessToken");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };
  return fetch(url, { ...options, headers });
}
