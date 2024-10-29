import OpenApi from "../../OpenApi";
import { AuthToken } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type ProductGroup = {
  id: number;
  name: string;
  domesticAccountId: number;
  objectVersion: string | null;
};

export type AllProductGroups = {
  items: ProductGroup[];
};

const VERSION: string = "v1.1.0";

export default class ProductGroups extends OpenApi {
  private version: string = "";

  getVersion(): string {
    return this.version ? this.version : VERSION;
  }

  setVersion(version: string): this {
    this.version = version;
    return this;
  }

  getUrlSegment(): string {
    return "productsapi/";
  }

  constructor(authToken: AuthToken) {
    super(authToken);
  }

  /**
   *
   * @see https://apis.e-conomic.com/#Products..tag/ProductGroups/operation/GetNumberOfProductGroups
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse>}
   */

  count(): Promise<HttpResponse> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/productgroups/count`,
    };
    return this._httpRequest(requestObj);
  }

  /**
   * Get all product groups
   *
   * @see https://apis.e-conomic.com/#Products..tag/ProductGroups/operation/GetAllProductGroups
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse<AllProductGroups>>}
   */

  getAll(cursorValue: number = 0): Promise<HttpResponse<AllProductGroups>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/productgroups?cursor=${cursorValue}`,
    };

    return this._httpRequest<AllProductGroups>(requestObj);
  }

  /**
   * This endpoint is to load a page of Employee Groups.
   *
   * @see https://apis.e-conomic.com/#Products..tag/ProductGroups/operation/GetPageOfProductGroups
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<ProductGroup[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/productgroups/paged?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<ProductGroup[]>(requestObj);
  }

  /**
   * Get single product group.
   *
   * @see https://apis.e-conomic.com/#Products..tag/ProductGroups/operation/GetProductGroupById
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   */

  getFor(id: number): Promise<HttpResponse<ProductGroup>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/productgroups/${id}`,
    };
    return this._httpRequest<ProductGroup>(requestObj);
  }

  /**
   * Create a new product group
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employee-groups/operation/CreateEmployeeGroup
   * @param {ProductGroup} employeeGroup
   * @returns {Promise<HttpResponse>}
   */

  create(data: ProductGroup): Promise<HttpResponse<ProductGroup>> {
    const requestObj = {
      method: "post",
      url: `${this.getUrlSegment()}${this.getVersion()}/productgroups`,
      data: data,
    };
    return this._httpRequest<ProductGroup>(requestObj);
  }

  /**
   * Product group update
   *
   * @see https://apis.e-conomic.com/#Products..tag/ProductGroups/operation/GetAllProductGroups
   * @param {ProductGroup} data
   * @returns {Promise<HttpResponse>}
   */
  update(data: ProductGroup) {
    const requestObj = {
      method: "put",
      url: `${this.getUrlSegment()}${this.getVersion()}/productgroups`,
      data: data,
    };

    return this._httpRequest<ProductGroup>(requestObj);
  }
}
