import { getSession, logout, login } from '../utils/auth';
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
    login(...args);
    const _session = getSession();
    if (_session) {
      setSession({ ..._session });
    }
  }
  return { session, loading, logout: _logout, login: _login };
};
