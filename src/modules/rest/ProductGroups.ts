import RestApi from "../../modules/RestApi";
import { Accrual } from "./Accounts";
import {
  AuthToken,
  InvoiceResponse,
  Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";

export type ProductGroup = {
  accrual: Accrual;
  inventoryEnabled: boolean;
  name: string;
  productGroupNumber: number;
  products: string;
  salesAccounts: string;
  self: string;
};

export default class ProductGroups extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * This endpoint allows you to fetch a collection of all product groups.
   *
   * @see https://restdocs.e-conomic.com/#get-product-groups
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<ProductGroup[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/product-groups?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<ProductGroup[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint allows you to fetch a specific product group.
   *
   * @see https://restdocs.e-conomic.com/#get-product-groups-productgroupnumber
   *
   * @param {number} productGroupNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getFor(productGroupNumber: number): Promise<HttpResponse<ProductGroup>> {
    const requestObj = {
      method: "get",
      url: `/product-groups/${productGroupNumber}`,
    };
    return this._httpRequest<ProductGroup>(requestObj);
  }
}
