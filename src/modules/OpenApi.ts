import { HttpResponse } from "../types/Http.type";
import OpenHttpClient from "../http/OpenHttpClient";
import { AuthToken } from "../types/Economic.type";
import { RawAxiosRequestHeaders } from "axios";

abstract class OpenApi {
  abstract getVersion(): string;
  abstract setVersion(version: string): this;
  abstract getUrlSegment(): string;

  /**
   *  auth token
   *
   * @type {AuthToken}
   */
  private authToken: AuthToken;
  /**
   * Authorization header
   *
   * @type {RawAxiosRequestHeaders}
   */
  headers: RawAxiosRequestHeaders;

  constructor(authToken: AuthToken) {
    /**
     * Set authentication string property
     */
    this.authToken = authToken;

    /**
     * Set the header
     */

    this.headers = {
      "Content-Type": "application/json",
    };

    if (this.authToken.secret_token) {
      this.headers["X-AppSecretToken"] = this.authToken.secret_token;
    }

    if (this.authToken.grant_token) {
      this.headers["X-AgreementGrantToken"] = this.authToken.grant_token;
    }
  }

  /**
   * Handling the request object and authorization header to be send with the API
   * @param requestParam
   * @param requestObj:
   * @returns
   */
  protected async _httpRequest<ResponseType = any>(
    requestObj: any
  ): Promise<HttpResponse<ResponseType>> {
    return await new OpenHttpClient({
      ...requestObj,
      headers: this.headers,
    }).call();
  }
}
export default OpenApi;
