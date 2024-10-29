import { HttpResponse } from "../../types/Http.type";
import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";
import { CustomerInfo } from "./Customers";

export type DeliveryLocation = {
  deliveryLocationNumber: number;
  self: string;
  address: string;
  barred: boolean;
  city: string;
  country: string;
  postalCode: string;
  sortKey: number;
  termsOfDelivery: string;
  customer: CustomerInfo;
};

export type CreateDeliveryLocation = {
  address: string;
  barred: boolean;
  city: string;
  country: string;
  postalCode: string;
  sortKey: number;
  termsOfDelivery: string;
};

export type Delivery = {
  address: string;
  city: string;
  country: string;
  deliveryDate: string;
  deliveryTerms: string;
  zip: string;
};

export type UpdateDeliveryLocation = Partial<CreateDeliveryLocation>;

export default class DeliveryLocations extends RestApi {
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
   * Get collection of delivery locations for a specific customer.
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-delivery-locations
   *
   * @param {number} customerNumber
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */
  get(
    customerNumber: number,
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<DeliveryLocation[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/delivery-locations?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<DeliveryLocation[], Pagination>>(
      requestObj
    );
  }

  /**
   * Get a specific delivery location for a customer.
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-delivery-locations-deliverylocationnumber
   * @param {number} customerNumber
   * @param {number} deliveryLocationNumber
   * @returns {Promise<HttpResponse>}
   */
  getFor(
    customerNumber: number,
    deliveryLocationNumber: number
  ): Promise<HttpResponse<DeliveryLocation>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/delivery-locations/${deliveryLocationNumber}`,
    };
    return this._httpRequest<DeliveryLocation>(requestObj);
  }

  /**
   * Create a new delivery location for a specific customer.
   * @see https://restdocs.e-conomic.com/#post-customers-customernumber-delivery-locations
   * @param {number} customerNumber
   * @param {CreateDeliveryLocation} deliveryLocation
   * @returns {Promise<HttpResponse<DeliveryLocation>>}
   */
  createDeliveryLocation(
    customerNumber: number,
    deliveryLocation: CreateDeliveryLocation
  ): Promise<HttpResponse<DeliveryLocation>> {
    const requestObj = {
      method: "post",
      url: `/customers/${customerNumber}/delivery-locations`,
      data: deliveryLocation,
    };
    return this._httpRequest<DeliveryLocation>(requestObj);
  }

  /**
   * Update an existing delivery location for a specific customer.
   * @see https://restdocs.e-conomic.com/#put-customers-customernumber-delivery-locations-deliverylocationnumber
   * @param {number} customerNumber
   * @param {number} deliveryLocationNumber
   * @param {UpdateDeliveryLocation} deliveryLocation
   * @returns {Promise<HttpResponse<DeliveryLocation>>}
   */
  updateDeliveryLocation(
    customerNumber: number,
    deliveryLocationNumber: number,
    deliveryLocation: UpdateDeliveryLocation
  ): Promise<HttpResponse<DeliveryLocation>> {
    const requestObj = {
      method: "put",
      url: `/customers/${customerNumber}/delivery-locations/${deliveryLocationNumber}`,
      data: deliveryLocation,
    };
    return this._httpRequest<DeliveryLocation>(requestObj);
  }

  /**
   * Delete an existing delivery location for a specific customer.
   * @see https://restdocs.e-conomic.com/#delete-customers-customernumber-delivery-locations-deliverylocationnumber
   * @param {number} customerNumber
   * @param {number} deliveryLocationNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteDeliveryLocation(
    customerNumber: number,
    deliveryLocationNumber: number
  ): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/customers/${customerNumber}/delivery-locations/${deliveryLocationNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }
}
