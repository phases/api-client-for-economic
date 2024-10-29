import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";

export type Employee = {
  employeeNumber: number;
  self: string;
  name: string;
  phone: string;
};

export type EmployeeInfo = Pick<Employee, "employeeNumber" | "self">;

export type CreateEmployee = {
  name: string;
  phone: string;
};

export default class Employees extends RestApi {
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
   * Get collection of employees.
   * @see https://restdocs.e-conomic.com/#get-employees
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */
  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<Employee[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/employees?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<Employee[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Get a specific employee
   * @see https://restdocs.e-conomic.com/#get-employees-employeenumber
   * @param {number} employeeNumber
   * @returns {Promise<HttpResponse>}
   */
  getFor(employeeNumber: number): Promise<HttpResponse<Employee>> {
    const requestObj = {
      method: "get",
      url: `/employees/${employeeNumber}`,
    };

    return this._httpRequest<Employee>(requestObj);
  }

  /**
   * Create a new employee
   * @see https://restdocs.e-conomic.com/#post-employees
   * @param {CreateEmployee} employee
   * @returns {Promise<HttpResponse<Employee>>}
   */
  createEmployee(employee: CreateEmployee): Promise<HttpResponse<Employee>> {
    const requestObj = {
      method: "post",
      url: `/employees`,
      data: employee,
    };

    return this._httpRequest<Employee>(requestObj);
  }

  /**
   * Update an existing employee
   * @see https://restdocs.e-conomic.com/#put-employees-employeenumber
   * @param {number} employeeNumber
   * @param {Partial<CreateEmployee>} employee
   * @returns {Promise<HttpResponse<Employee>>}
   */
  updateEmployee(
    employeeNumber: number,
    employee: Partial<CreateEmployee>
  ): Promise<HttpResponse<Employee>> {
    const requestObj = {
      method: "put",
      url: `/employees/${employeeNumber}`,
      data: employee,
    };

    return this._httpRequest<Employee>(requestObj);
  }

  /**
   * Delete an existing employee
   * @see https://restdocs.e-conomic.com/#delete-employees-employeenumber
   * @param {number} employeeNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteEmployee(employeeNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/employees/${employeeNumber}`,
    };

    return this._httpRequest<void>(requestObj);
  }
}
