import { getSession, logout } from '../utils/auth';
import { useState, useEffect } from 'react';

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const _session = getSession();
    if (_session) {
      // doubt
      setSession(_session);
    }
    setLoading(false);
  }, []);
  const _logout = () => {
    logout();
    setSession(null);
  };
  return { session, loading, logout: _logout };
};
