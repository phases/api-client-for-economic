import RestApi from "../../modules/RestApi";
import {
  AuthToken,
  EconomicResponse,
  Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";

export type VatType = {
  vatTypeNumber: number;
  name: string;
  self: string;
};


export default class VatTypes extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }
  
  /**
     * fetch a collection of all vat types.
     *
     * @see https://restdocs.e-conomic.com/#get-vat-types
     * @returns {Promise<HttpResponse>}
     *
     */
  getVatTypes(
      offset: number = 0,
      limit: number = 100
      ): Promise<HttpResponse<EconomicResponse<VatType[], Pagination, any>>> {
      const requestObj = {
          method: "get",
          url: `/vat-types?skippages=${offset}&pagesize=${limit}`,
      };
      return this._httpRequest<EconomicResponse<VatType[], Pagination, any>>(
          requestObj
      );
  }

  /**
       * Fetch a specific vat type. 
       *
       * @see https://restdocs.e-conomic.com/#get-vat-types-vattypeid
       *
       */
  getVatType(vatTypeNumber: number): Promise<HttpResponse<VatType>> {
    const requestObj = {
      method: "get",
      url: `/vat-types/${vatTypeNumber}`,
    };

    return this._httpRequest<VatType>(requestObj);
  }

}