import OpenApi from "../../OpenApi";
import { AuthToken } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type EmployeeGroup = {
  name: string;
  number: number;
  objectVersion: string | null;
};

const VERSION: string = "v22.0.0";

export default class EmployeeGroups extends OpenApi {
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
   * Use this endpoint to retrieve all Employee Groups in bulk. Max number of items returned in a single call is 1000. Use the continuation cursor parameter to set the continuation cursor for retrieval of next set of data
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employee-groups/operation/GetAllEmployeeGroups
   *
   * @param {number} cursorValue
   * @returns {Promise<HttpResponse>}
   */

  getAll(cursorValue: number = 0): Promise<HttpResponse<EmployeeGroup[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employeegroups?cursor=${cursorValue}`,
    };
    return this._httpRequest<EmployeeGroup[]>(requestObj);
  }

  /**
   * This endpoint is to load a page of Employee Groups.
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employee-groups/operation/GetPageOfEmployeeGroups
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EmployeeGroup[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employeegroups/paged?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<EmployeeGroup[]>(requestObj);
  }

  /**
   * This endpoint is endpoint to load a single Employee Group by id/number.
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employee-groups/operation/GetEmployeeGroupById
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   */

  getFor(number: number): Promise<HttpResponse<EmployeeGroup>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employeegroups/${number}`,
    };
    return this._httpRequest<EmployeeGroup>(requestObj);
  }

  /**
   * This endpoint is endpoint to create a single Employee group.
   * @see https://apis.e-conomic.com/#Projects..tag/Employee-groups/operation/CreateEmployeeGroup
   *
   * @param {EmployeeGroup} employeeGroup
   * @returns {Promise<HttpResponse>}
   */

  create(employeeGroup: EmployeeGroup): Promise<HttpResponse<EmployeeGroup>> {
    const requestObj = {
      method: "post",
      url: `${this.getUrlSegment()}${this.getVersion()}/employeegroups`,
      data: employeeGroup,
    };
    return this._httpRequest<EmployeeGroup>(requestObj);
  }
}
