import OpenApi from "../../OpenApi";
import { AuthToken, EmployeeResponse } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type Employee = {
  access: boolean;
  groupNumber: number;
  name: string;
  number: number | null;
  email: string | null;
  objectVersion: string | null;
};

type CreateEmployee = {
  access: boolean;
  groupNumber: number;
  name: string;
  number: number | null;
  email: string | null;
  objectVersion: string | null;
  phone: string | null;
};

const VERSION: string = "v22.0.0";

export default class Employees extends OpenApi {
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
   * Use this endpoint to retrieve all Employees in bulk. Max number of items returned in a single call is 1000
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employees/operation/GetAllEmployees
   *
   * @returns {Promise<HttpResponse>}
   */

  getAll(): Promise<HttpResponse<EmployeeResponse<Employee[]>>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employees`,
    };
    return this._httpRequest<EmployeeResponse<Employee[]>>(requestObj);
  }

  /**
   * This endpoint is to load a collection of Employees with pagination.
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employees/operation/GetPageOfEmployees
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<Employee[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employees/paged?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<Employee[]>(requestObj);
  }

  /**
   * This endpoint is to load a collection of Employees under an Employee Group with pagination.
   *
   * @param {number} groupNumber
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  getEmployeesByEmployeeGroup(
    groupNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<Employee[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employees/paged?skippages=${skipPages}&pagesize=${limit}&filter=groupNumber$eq:${groupNumber}`,
    };
    return this._httpRequest<Employee[]>(requestObj);
  }

  /**
   * This endpoint is to load a single Employee by id/number.
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employees/operation/GetEmployeeById
   *
   * @param {number} number
   * @returns {Promise<HttpResponse>}
   */

  getFor(number: number): Promise<HttpResponse<Employee>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/employees/${number}`,
    };
    return this._httpRequest<Employee>(requestObj);
  }

  /**
   * This endpoint is to to create a single Employee.
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Employees/operation/CreateEmployee
   *
   * @param {CreateEmployee} createEmployee
   * @returns {Promise<HttpResponse>}
   */

  create(createEmployee: CreateEmployee): Promise<HttpResponse<Employee>> {
    const requestObj = {
      method: "post",
      url: `${this.getUrlSegment()}${this.getVersion()}/employees`,
      data: createEmployee,
    };
    return this._httpRequest<Employee>(requestObj);
  }
}
