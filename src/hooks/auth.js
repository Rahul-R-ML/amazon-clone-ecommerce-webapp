import { getSession, logout, login, signup } from '../utils/auth';
import { useState, useEffect } from 'react';

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const _session = getSession();
    if (_session) {
      setSession({ ..._session });
    }
    setLoading(false);
  }, []);

  function _logout() {
    logout();
    setSession(null);
  }
  function _login(...args) {
    const user = login(...args);
    if (!user) return null;
    const _session = getSession();
    if (_session) {
      setSession({ ..._session });
    }
    return user;
  }
  function _signup(userDetails) {
    signup(userDetails);
  }
  return {
    session,
    loading,
    logout: _logout,
    login: _login,
    signup: _signup,
  };
};
