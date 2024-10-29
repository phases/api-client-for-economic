import RestHttpClient from "../http/RestHttpClient";
import { AuthToken } from "../types/Economic.type";
import { RawAxiosRequestHeaders } from "axios";
import { HttpResponse } from "../types/Http.type";

abstract class RestApi {
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
  async _httpRequest<ResponseType = any>(
    requestObj: any
  ): Promise<HttpResponse<ResponseType>> {
    return await new RestHttpClient({
      ...requestObj,
      headers: this.headers,
    }).call();
  }
}

export default RestApi;
