import { HttpResponse } from "../../types/Http.type";
import { VatAccount } from "./VatAccounts";
import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";

export type ICurrency = {
  name: string;
  code: string;
  isoNumber: string;
  self: string;
};

export default class Currency extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * Get collection of accounts.
   * @see https://restdocs.e-conomic.com/#get-accounts
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<ICurrency[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/currencies?skippages=${offset}&pagesize=${limit}`,
    };

    return this._httpRequest<EconomicResponse<ICurrency[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Get currency by code
   *
   * @param {string} code
   * @returns
   */
  getFor(
    code: string
  ): Promise<HttpResponse<EconomicResponse<ICurrency[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/currencies/${code}`,
    };

    return this._httpRequest<EconomicResponse<ICurrency[], Pagination, any>>(
      requestObj
    );
  }
}
