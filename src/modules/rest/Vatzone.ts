import RestApi from "../../modules/RestApi";
import {
  AuthToken,
  EconomicResponse,
  Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";

export type VatZone = {
  vatZoneNumber: number;
  self: string;
  name: string;
  enabledForSupplier: boolean;
  enabledForCustomer: boolean;
};

export type VatZoneInfo = Pick<VatZone, "vatZoneNumber" | "self">;


export default class VatZones extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }
  
  /**
     * fetch a collection of all vat zones.
     *
     * @see https://restdocs.e-conomic.com/#get-vat-zones
     * @returns {Promise<HttpResponse>}
     *
     */
  getVatZones(
      offset: number = 0,
      limit: number = 100
      ): Promise<HttpResponse<EconomicResponse<VatZone[], Pagination, any>>> {
      const requestObj = {
          method: "get",
          url: `/vat-zones?skippages=${offset}&pagesize=${limit}`,
      };
      return this._httpRequest<EconomicResponse<VatZone[], Pagination, any>>(
          requestObj
      );
  }

  /**
       * Fetch a specific vat type. 
       *
       * @see https://restdocs.e-conomic.com/#get-vat-zones-vatzonenumber
       *
       */
  getVatZone(vatZoneNumber: number): Promise<HttpResponse<VatZone>> {
    const requestObj = {
      method: "get",
      url: `/vat-zones/${vatZoneNumber}`,
    };

    return this._httpRequest<VatZone>(requestObj);
  }

}