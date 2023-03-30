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

export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users;
};

export const login = (username, password) => {
  const users = getUsers();
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });
  if (user) {
    storeSession({ username, password });
    return user;
  }
  return null;
};
export const logout = (router) => {
  removeSession();
};

export const signup = (userDetails) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(userDetails);
  localStorage.setItem('users', JSON.stringify(users));
};

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
