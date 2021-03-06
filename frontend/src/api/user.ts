import axios, { AxiosPromise } from "axios";
import cookies from 'next-cookies';
import Cookie from 'js-cookie';

import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import { IUser } from "@/src/utils/types/user";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const instance = axios.create({
  // baseURL: process.env.DB_HOST,
  baseURL: "http://localhost:3000",
})

const request = <T,>(method: Method, url: string, data: any = {}, ctx?: GetServerSidePropsContext<ParsedUrlQuery> | void) => {
  let token;
  if (ctx) {
    token = cookies(ctx)?.token;
  } else {
    token = Cookie.get('token');
  }

  const headers = token ? {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  } : {};

  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method,
      data: { ...data },
      headers
    }).then((response) => {
      resolve(response.data)
    }).catch(err => {
      reject(err);
    })
  })
}

const getAll = () => {
  return request<IUser[]>("GET", '/api/test/');
}

export const userApi = {
  getAll
}