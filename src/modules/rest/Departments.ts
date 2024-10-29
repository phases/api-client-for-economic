import { HttpResponse } from "../../types/Http.type";
import { VatAccount } from "./VatAccounts";
import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";

export type Accrual = {
  accountingYears: string;
  accountNumber: string;
  accountsSummed: AccountsSummed[];
  accountType:
    | "profitAndLoss"
    | "status"
    | "totalFrom"
    | "heading"
    | "headingStart"
    | "sumInterval"
    | "sumAlpha";
  balance: number;
  barred: boolean;
  blockDirectEntries: boolean;
  contraAccount: Pick<Account, "accountNumber" | "self">;
  debitCredit: "debit" | "credit";
  draftBalance: number;
  name: string;
  self: string;
  totalFromAccount: Pick<Account, "accountNumber" | "self">;
  vatAccount: Pick<VatAccount, "vatCode" | "self">;
};
export type AccountsSummed = {
  fromAccount: Pick<Account, "accountNumber" | "self">;
  toAccount: Pick<Account, "accountNumber" | "self">;
};

export type Account = {
  accountNumber: number;
  accountType: string;
  balance: string;
  blockDirectEntries: boolean;
  debitCredit: string;
  name: string;
  accountingYears: string;
  self: string;
};

export default class Departments extends RestApi {
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
  ): Promise<HttpResponse<EconomicResponse<Account[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/accounts?skippages=${offset}&pagesize=${limit}`,
    };

    return this._httpRequest<EconomicResponse<Account[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Get a specific accounts
   *
   * @see https://restdocs.e-conomic.com/#get-accounts-accountnumber
   * @param {number} accountNumber
   * @returns {Promise<HttpResponse<Account>>}
   */
  getFor(accountNumber: number): Promise<HttpResponse<Account>> {
    const requestObj = {
      method: "GET",
      url: `/accounts/${accountNumber}`,
    };

    return this._httpRequest<Account>(requestObj);
  }
}
