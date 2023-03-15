import React, { useState, useEffect } from 'react';
import { useSession } from '../hooks/auth';

export const AuthContext = React.createContext({
  session: null,
  loading: false,
  logout: () => {},
});

export const SessionProvider = ({ children }) => {
  const { session, loading, logout, login } = useSession();
  return (
    <AuthContext.Provider value={{ session, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
