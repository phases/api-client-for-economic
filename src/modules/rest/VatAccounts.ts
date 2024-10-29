import RestApi from "../../modules/RestApi";
import {
  AuthToken,
  EconomicResponse,
  Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";
import { Account } from "./Accounts";
import { VatType } from "./VatTypes";
import { ContraAccountInfo } from "./Journals";

export type VatAccount = {
  account: Pick<Account, "accountNumber" | "self">;
  barred: boolean;
  contraAccount: Pick<Account, "accountNumber" | "self">;
  name: string;
  ratePercentage: number;
  self: string;
  vatCode: string;
  vatType: VatType;
};

// Define type for VatAccountNumber (required and optional properties)
export type VatAccountNumber = {
  account: Account;
  barred?: boolean;
  contraAccount: ContraAccountInfo;
  name: string;
  ratePercentage?: number;
  self: string;
  vatCode?: string;
  vatType: VatType;
};

export default class VatAccounts extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * fetch a collection of all vat accounts
   *
   * @see https://restdocs.e-conomic.com/#vat-accounts
   * @returns {Promise<HttpResponse>}
   *
   */
  getVatAccounts(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<VatAccount[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/vat-accounts?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<VatAccount[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Fetch a specific vat account
   *
   * @see https://restdocs.e-conomic.com/#get-vat-accounts-id
   *
   */
  getVatAccount(vatCode: string): Promise<HttpResponse<VatAccountNumber>> {
    const requestObj = {
      method: "get",
      url: `/vat-accounts/${vatCode}`,
    };

    return this._httpRequest<VatAccountNumber>(requestObj);
  }
}
