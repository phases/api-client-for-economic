import OpenApi from "../../OpenApi";
import { AuthToken, ProjectResponse } from "../../../types/Economic.type";
import { HttpResponse } from "../../../types/Http.type";

export type Project = {
  name: string;
  projectGroupNumber: number;
  closedDate: string | null;
  contactPersonId: number | null;
  costPrice: number | null;
  customerNumber: number | null;
  deliveryDate: number | null;
  deliveryLocationNumber: number | null;
  departmentNumber: number | null;
  description: string | null;
  fixedPrice: number | null;
  invoicedTotal: number | null;
  isBarred: boolean;
  isClosed: boolean;
  isMainProject: boolean;
  isMileageInvoiced: boolean;
  lastUpdated: string | null;
  mainProjectNumber: number | null;
  mileage: number;
  number: number;
  objectVersion: string | null;
  otherReference: string | null;
  otherResponsibleEmployeeNumber: number | null;
  responsibleEmployeeNumber: number | null;
  salesPrice: number | null;
  status: number | null;
  self: string;
};

const VERSION: string = "v22.0.0";

export default class Projects extends OpenApi {
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
   * Use this endpoint to retrieve all Projects in bulk. Max number of items returned in a single call is 1000
   *
   * @see https://apis.e-conomic.com/redoc.html#tag/Projects/operation/GetAllProjects
   *
   * @returns {Promise<HttpResponse>}
   */

  getAll(): Promise<HttpResponse<ProjectResponse<Project[]>>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/projects`,
    };
    return this._httpRequest<ProjectResponse<Project[]>>(requestObj);
  }

  /**
   * This endpoint is to load a collection of Projects with pagination.
   *
   * @see https://apis.e-conomic.com/#Projects..tag/Projects/operation/GetPageOfProjects
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<Project[]>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/projects/paged?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<Project[]>(requestObj);
  }

  /**
   * This endpoint is to load a single Project by id/number.
   *
   * @see https://apis.e-conomic.com/redoc.html#tag/Projects/operation/GetProjectById
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   */

  getFor(id: number): Promise<HttpResponse<Project>> {
    const requestObj = {
      method: "get",
      url: `${this.getUrlSegment()}${this.getVersion()}/projects/${id}`,
    };
    return this._httpRequest<Project>(requestObj);
  }
}
