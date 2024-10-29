import OpenApi from "../../OpenApi";
import { AuthToken, SubscriptionResponse } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type Subscription = {
  collection: 0 | 1; //0: full ,1: proportional
  interval: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  name: string;
  accrue: boolean;
  allowMoreThanOnePerCustomer: boolean;
  description: string | null;
  includeName: boolean;
  includePeriod: boolean;
  isBarred: boolean;
  isCalendarBased: boolean;
  lastUpdated: string | null;
  number: number;
  objectVersion: string | null;
};

const VERSION: string = "v5.0.1";

export default class Subscriptions extends OpenApi {
  private version: string = "";

  getVersion(): string {
    return this.version ? this.version : VERSION;
  }
  setVersion(version: string): this {
    this.version = version;
    return this;
  }
  getUrlSegment(): string {
    return "subscriptionsapi/";
  }
  constructor(authToken: AuthToken) {
    super(authToken);
  }

  /**
   * Use this endpoint to load a page of Subscriptions.
   *
   * @see https://apis.e-conomic.com/#Subscriptions..tag/Subscriptions/operation/GetAllSubscriptions
   *
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse>}
   */

  getAll(
    cursorValue: number = 0
  ): Promise<HttpResponse<SubscriptionResponse<Subscription[]>>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/subscriptions?cursor=${cursorValue}`,
    };
    return this._httpRequest<SubscriptionResponse<Subscription[]>>(requestObj);
  }

  /**
   * This endpoint is to load a page of Subscriptions.
   *
   * @see https://apis.e-conomic.com/#Subscriptions..tag/Subscriptions/operation/GetPageOfSubscriptions
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<Subscription[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/subscriptions/paged?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<Subscription[]>(requestObj);
  }

  /**
   * This endpoint is to load a single Subscription by number.
   *
   * @see https://apis.e-conomic.com/#Subscriptions..tag/Subscriptions/operation/GetSubscriptionById
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   */

  getFor(id: number): Promise<HttpResponse<Subscription>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/subscriptions/${id}`,
    };
    return this._httpRequest<Subscription>(requestObj);
  }
}
