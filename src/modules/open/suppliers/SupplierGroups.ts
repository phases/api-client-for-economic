import OpenApi from "../../OpenApi";
import { AuthToken } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type SupplierGroup = {
  accountNumber: number;
  name: string;
  number: number;
  objectVersion: string | null;
};

export type AllSupplierGroups = {
  items: SupplierGroup[];
};

const VERSION: string = "v1.0.1";

export default class SupplierGroups extends OpenApi {
  private version: string = "";

  getVersion(): string {
    return this.version ? this.version : VERSION;
  }

  setVersion(version: string): this {
    this.version = version;
    return this;
  }

  getUrlSegment(): string {
    return "suppliersapi/";
  }

  constructor(authToken: AuthToken) {
    super(authToken);
  }

  /**
   *
   * @see https://apis.e-conomic.com/#Suppliers..tag/Groups/operation/GetNumberOfGroups
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse>}
   */
 
  count(): Promise<HttpResponse> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/Groups/count`,
    };
    return this._httpRequest(requestObj);
  }

  /**
   * Get all supplier groups
   *
   * @see https://apis.e-conomic.com/#Suppliers..tag/Groups/operation/GetAllGroups
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse<AllSupplierGroups>>}
   */

  getAll(cursorValue: number = 0): Promise<HttpResponse<AllSupplierGroups>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/Groups?cursor=${cursorValue}`,
    };

    return this._httpRequest<AllSupplierGroups>(requestObj);
  }

  /**
   * This endpoint is to load a page of Supplier Groups.
   *
   * @see https://apis.e-conomic.com/#Suppliers..tag/Groups/operation/GetPageOfGroups
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<SupplierGroup[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/Groups/paged?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<SupplierGroup[]>(requestObj);
  }

  /**
   * Get single supplier group.
   *
   * @see https://apis.e-conomic.com/#Suppliers..tag/Groups/operation/GetGroupById
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   */

  getFor(id: number): Promise<HttpResponse<SupplierGroup>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/Groups/${id}`,
    };
    return this._httpRequest<SupplierGroup>(requestObj);
  }

  /**
   * Create a new supplier group
   *
   * @see https://apis.e-conomic.com/#Suppliers..tag/Groups/operation/CreateGroup
   * @param {SupplierGroup} SupplierGroup
   * @returns {Promise<HttpResponse>}
   */

  create(data: SupplierGroup): Promise<HttpResponse<SupplierGroup>> {
    const requestObj = {
      method: "post",
      url: `${this.getUrlSegment()}${this.getVersion()}/Groups`,
      data: data,
    };
    return this._httpRequest<SupplierGroup>(requestObj);
  }

  /**
   * supplier group update
   *
   * @see https://apis.e-conomic.com/#Suppliers..tag/Groups/operation/UpdateGroupById
   * @param {SupplierGroup} data
   * @returns {Promise<HttpResponse>}
   */
  update(data: SupplierGroup) {
    const requestObj = {
      method: "put",
      url: `${this.getUrlSegment()}${this.getVersion()}/Groups`,
      data: data,
    };

    return this._httpRequest<SupplierGroup>(requestObj);
  }
}
