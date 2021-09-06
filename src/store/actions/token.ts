import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { NextPageContext } from 'next';

export const GET_TOKEN = (ctx?: NextPageContext & { cookies?: any }) => {
  return () => {
    return parseCookies(ctx).token;
  };
};

export const SAVE_TOKEN = (token: string, ctx?: NextPageContext) => {
  return () => {
    setCookie(ctx, 'token', token, {
      path: '/',
    });
  };
};

export const CLEAR_TOKEN = (ctx?: NextPageContext) => {
  return () => {
    destroyCookie(ctx, 'token');
  };
};
