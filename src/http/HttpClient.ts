import axios, { AxiosError } from "axios";
import { HttpRequest, HttpResponse } from "../types/Http.type";

abstract class HttpClient {
  abstract getUrl(): string;

  baseUrl() {
    const url = this.getUrl();
    return url;
  }

  /**
   * @type {Request}
   */
  request: HttpRequest;

  /**
   * Assign values to the private variable
   * @constructor
   * @param requestObj
   */
  constructor(requestData: HttpRequest) {
    this.request = requestData;
  }

  /**
   * Http call
   *
   * @returns Promise<HttpResponse>
   */
  async call<ResponseType = any>(): Promise<HttpResponse<ResponseType>> {
    try {
      let response = await axios({ ...this.request, baseURL: this.baseUrl() });

      let responseData: HttpResponse = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        request: response.request,
        data: response.data,
      };

      return responseData;
    } catch (e) {
      if (e instanceof AxiosError) {
        let statusCode = e.response?.status ?? 0;
        let errorMessage = e.response?.data?.error_description ?? e.message;
      }
      throw e;
    }
  }
}

export default HttpClient;
