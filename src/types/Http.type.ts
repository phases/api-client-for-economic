import {
  AxiosHeaders,
  RawAxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";

export type HttpRequest = {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  params?: string;
  data?: string;
  headers: RawAxiosRequestHeaders;
};

export type HttpResponse<ResponseType = any> = {
  data: ResponseType;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  status: number;
  statusText: string;
  request: any;
};
