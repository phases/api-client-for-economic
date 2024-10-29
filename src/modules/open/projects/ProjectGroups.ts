import OpenApi from "../../OpenApi";
import { AuthToken } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type ProjectGroup = {
  name: string;
  type: 1 | 2 | 3; //1: Internal ,2: External, invoiceable ,3: External non-invoiceable
  number: number;
  costAccountClosed: number | null;
  costAccountOngoing: number | null;
  costAccountOngoingType: 0 | 1; //0: Debit ,1: Credit
  costContraAccountOngoing: number | null;
  includeCostPriceInFinance: boolean;
  includeSalesPriceInFinance: boolean;
  objectVersion: string | null;
  salesAccountClosed: number | null;
  salesAccountOngoing: number | null;
  salesAccountOngoingType: 0 | 1; //0: Debit ,1: Credit
  salesContraAccountOngoing: number | null;
};

const VERSION: string = "v22.0.0";

export default class ProjectGroups extends OpenApi {
  private version: string = "";

  getVersion(): string {
    return this.version ? this.version : VERSION;
  }
  setVersion(version: string): this {
    this.version = version;
    return this;
  }
  getUrlSegment(): string {
    return "api/";
  }
  constructor(authToken: AuthToken) {
    super(authToken);
  }
  /**
   * Use this endpoint to retrieve all Project Groups in bulk. Max number of items returned in a single call is 1000. Use the continuation cursor parameter to set the continuation cursor for retrieval of next set of data
   *
   * @see https://apis.e-conomic.com/redoc.html#tag/Project-Groups/operation/GetAllProjectGroups
   *
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse>}
   */

  getAll(cursorValue: number = 0): Promise<HttpResponse<ProjectGroup[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/projectgroups?cursor=${cursorValue}`,
    };
    return this._httpRequest<ProjectGroup[]>(requestObj);
  }

  /**
   * This endpoint is to load a page of Project Groups.
   *
   * @see https://apis.e-conomic.com/redoc.html#tag/Project-Groups/operation/GetPageOfProjectGroups
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<ProjectGroup[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/projectgroups/paged?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<ProjectGroup[]>(requestObj);
  }

  /**
   * This endpoint is endpoint to load a single Project Group by id/number.
   *
   * @see https://apis.e-conomic.com/redoc.html#tag/Project-Groups/operation/GetProjectGroupById
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   */

  getFor(id: number): Promise<HttpResponse<ProjectGroup>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/projectgroups/${id}`,
    };
    return this._httpRequest<ProjectGroup>(requestObj);
  }
}
