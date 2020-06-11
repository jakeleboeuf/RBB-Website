export const isBrowser = () => typeof window !== 'undefined';

export const getUser = (type = 'default') => {
  return isBrowser() &&
    window.localStorage.getItem(`user::${type}`) &&
    window.localStorage.getItem(`user::${type}`) !== 'undefined'
    ? window.localStorage.getItem(`user::${type}`)
    : null;
};

export const setUser = ({ type = 'default', user }) => {
  window.localStorage.setItem(`user::${type}`, user);
};
