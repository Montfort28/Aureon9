import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI, setAuthToken, getAuthToken } from '../api/client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      // Token exists, set auth state (in production, verify token validity)
      const user = localStorage.getItem('aureon9_user');
      if (user) {
        setAuth(JSON.parse(user));
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      setAuthToken(token);
      localStorage.setItem('aureon9_user', JSON.stringify(user));
      setAuth(user);
      
      return { success: true, user };
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      setAuthToken(token);
      localStorage.setItem('aureon9_user', JSON.stringify(user));
      setAuth(user);
      
      return { success: true, user };
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem('aureon9_user');
    setAuth(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    auth,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
