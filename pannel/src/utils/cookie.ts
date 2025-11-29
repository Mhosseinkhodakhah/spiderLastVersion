import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const setCookie = (name: string, value: object, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  cookies.set(name, value, { expires: expirationDate, secure: true });
};  

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
