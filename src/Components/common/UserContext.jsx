// 로그인/유저 상태 관리를 위한 Context
// 전역적으로 유저 정보와 인증 상태를 관리합니다.

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      fetch("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
        });
    }
  }, []);

  const login = (user, token) => {
    setUser(user);
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <UserContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
