import { useState, useCallback } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  
  const login = useCallback(() => {});

  const logout = useCallback(() => {});

  return { login, logout }
}