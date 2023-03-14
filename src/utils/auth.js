import { setCookie, deleteCookie } from 'cookies-next';

const storeSession = (session) => {
  localStorage.setItem('session', JSON.stringify(session));
  setCookie('session', JSON.stringify(session));
};
const removeSession = () => {
  localStorage.removeItem('session');
  deleteCookie('session');
};

export const getSession = (context = null) => {
  // Check client or server
  if (typeof window === 'undefined' && context) {
    const session = context.req.cookies?.session;
    if (session) {
      return JSON.parse(session);
    }
    return null;
  } else {
    const session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }
};

export const login = (username, password) => {
  storeSession({ username, password });
};
export const logout = (router) => {
  removeSession();
};
