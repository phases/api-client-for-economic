import { HttpResponse } from "../../types/Http.type";
import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";

export type Unit = {
  unitNumber: number;
  name: string;
  products: string;
  self: string;
};

export type CreateUnit = Pick<Unit, "name">;
export type UpdateUnit = Pick<Unit, "name">;

export default class Units extends RestApi {
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
   * Get collection of units.
   *
   * @see https://restdocs.e-conomic.com/#units
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */
  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<Unit[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/units?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<Unit[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Get a specific unit.
   *
   * @see https://restdocs.e-conomic.com/#get-units
   * @param {number} unitNumber
   * @returns {Promise<HttpResponse>}
   */
  getFor(unitNumber: number): Promise<HttpResponse<Unit>> {
    const requestObj = {
      method: "get",
      url: `/units/${unitNumber}`,
    };
    return this._httpRequest<Unit>(requestObj);
  }

  /**
   * Create a new unit.
   *
   * @see https://restdocs.e-conomic.com/#post-units
   * @param {CreateUnit} unitData
   * @returns {Promise<HttpResponse<Unit>>}
   */
  createUnit(unitData: CreateUnit): Promise<HttpResponse<Unit>> {
    const requestObj = {
      method: "post",
      url: `/units`,
      data: unitData,
    };
    return this._httpRequest<Unit>(requestObj);
  }

  /**
   * Update an existing unit.
   *
   * @see https://restdocs.e-conomic.com/#put-units-unitnumber
   * @param {number} unitNumber
   * @param {UpdateUnit} unitData
   * @returns {Promise<HttpResponse<Supplier>>}
   */
  updateUnit(
    unitNumber: number,
    unitData: UpdateUnit
  ): Promise<HttpResponse<any>> {
    const requestObj = {
      method: "put",
      url: `/units/${unitNumber}`,
      data: unitData,
    };
    return this._httpRequest<Unit>(requestObj);
  }

  /**
   * Delete an existing unit.
   *
   * @see https://restdocs.e-conomic.com/#delete-units-unitnumber
   * @param {number} unitNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteUnit(unitNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/units/${unitNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }
}
