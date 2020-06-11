export const isBrowser = () => typeof window !== 'undefined';

export const getUser = (type = 'default') =>
  isBrowser() && window.localStorage.getItem(`user::${type}`)
    ? JSON.parse(window.localStorage.getItem(`user::${type}`))
    : {};

export const setUser = ({ type = 'default', user }) =>
  window.localStorage.setItem(`user::${type}`, JSON.stringify(user));
