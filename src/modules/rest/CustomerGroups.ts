import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";
import { Layout } from "./Layouts";
import { Customer } from "./Customers";

export type Account = {
  accountingYears: string;
  accountNumber: number;
  accountType: string;
  balance: number;
  blockDirectEntries: boolean;
  debitCredit: string;
  name: string;
  self: string;
};
export type CustomerGroup = {
  account: Account;
  customerGroupNumber: number;
  customers: string;
  layout: Layout;
  name: string;
  self: string;
};

export type CreateCustomerGroup = {
  account: {
    accountNumber: number;
  };
  layout: {
    layoutNumber: number;
  };
  name: string;
};

export default class CustomerGroups extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  getUrl(): string {
    throw new Error("Method not implemented.");
  }

  /**
   * Get collection of customer groups.
   * @see https://restdocs.e-conomic.com/#get-customer-groups
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<CustomerGroup[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/customer-groups?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<
      EconomicResponse<CustomerGroup[], Pagination, any>
    >(requestObj);
  }

  /**
   * This endpoint allows you to fetch a collection of all customers in a specific customer group.
   *
   * @see https://restdocs.e-conomic.com/#get-customer-groups-customergroupnumber-customers
   * @param {number} customerGroupNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getCustomerGroupCustomers(
    customerGroupNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<Customer[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/customer-groups/${customerGroupNumber}/customers?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<Customer[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Create a new customer group
   * @see https://restdocs.e-conomic.com/#post-customer-groups
   * @param {CreateCustomerGroup} customerGroup
   * @returns {Promise<HttpResponse<CustomerGroup>>}
   */
  createCustomerGroup(
    customerGroup: CreateCustomerGroup
  ): Promise<HttpResponse<CustomerGroup>> {
    const requestObj = {
      method: "post",
      url: `/customer-groups`,
      data: customerGroup,
    };

    return this._httpRequest<CustomerGroup>(requestObj);
  }

  /**
   * Get a specific customer group
   * @see https://restdocs.e-conomic.com/#get-customer-groups-customergroupnumber
   * @param {number} customerGroupNumber
   * @returns {Promise<HttpResponse<CustomerGroup>>}
   */
  getFor(customerGroupNumber: number): Promise<HttpResponse<CustomerGroup>> {
    const requestObj = {
      method: "GET",
      url: `/customer-groups/${customerGroupNumber}`,
    };

    return this._httpRequest<CustomerGroup>(requestObj);
  }

  /**
   * Update an existing customer group
   * @see https://restdocs.e-conomic.com/#put-customer-groups-customergroupnumber
   * @param {number} customerGroupNumber
   * @param {Partial<CreateCustomerGroup>} customerGroup
   * @returns {Promise<HttpResponse<CustomerGroup>>}
   */
  updateCustomerGroup(
    customerGroupNumber: number,
    customerGroup: Partial<CreateCustomerGroup>
  ): Promise<HttpResponse<CustomerGroup>> {
    const requestObj = {
      method: "put",
      url: `/customer-groups/${customerGroupNumber}`,
      data: customerGroup,
    };

    return this._httpRequest<CustomerGroup>(requestObj);
  }

  /**
   * Delete an existing customer group
   * @see https://restdocs.e-conomic.com/#delete-customer-groups-customergroupnumber
   * @param {number} customerGroupNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteCustomerGroup(
    customerGroupNumber: number
  ): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/customer-groups/${customerGroupNumber}`,
    };

    return this._httpRequest<void>(requestObj);
  }
}
