import { HttpResponse } from "../../types/Http.type";
import RestApi from "../RestApi";
import { AuthToken } from "../../types/Economic.type";
import { EconomicResponse, Pagination } from "../../types/Economic.type";
import { Layout } from "./Layouts";
import { PaymentTerms } from "./PaymentTerms";
import { VatZone } from "./Vatzone";

export type CostAccount = {
  accountNumber: number;
  self: string;
};

export type RemittanceAdvice = {
  creditorId: string;
  paymentType: {
    paymentTypeNumber: number;
    self: string;
  };
};

export type SalesPerson = {
  employeeNumber: number;
  self: string;
};

export type SupplierContact = {
  supplierContactNumber: number;
  self: string;
};

export type SupplierGroup = {
  supplierGroupNumber: number;
  self: string;
};

export type Supplier = {
  authToken: any;
  address: string;
  attention: Attention;
  bankAccount: string;
  barred: boolean;
  city: string;
  contacts: string;
  corporateIdentificationNumber: string;
  costAccount: CostAccount;
  country: string;
  currency: string;
  defaultInvoiceText: string;
  email: string;
  layout: Layout;
  name: string;
  paymentTerms: PaymentTerms;
  phone: string;
  remittanceAdvice: RemittanceAdvice;
  salesPerson: SalesPerson;
  self: string;
  supplierContact: SupplierContact;
  supplierGroup: SupplierGroup;
  supplierNumber: number;
  vatZone: VatZone;
  website: string;
  zip: string;
};

export type SupplierInfo = Pick<Supplier, "supplierNumber" | "self">;

export type Attention = {
  customerContactNumber: number;
  self: string;
};

export type CreateSupplier = {
  address: string;
  attention: Attention;
  bankAccount: string;
  barred: boolean;
  city: string;
  contacts: string;
  corporateIdentificationNumber: string;
  costAccount: { accountNumber: number };
  country: string;
  currency: string;
  defaultInvoiceText: string;
  email: string;
  layout: { layoutNumber: number };
  name: string;
  paymentTerms: { paymentTermsNumber: number };
  phone: string;
  remittanceAdvice: {
    creditorId: string;
    paymentType: { paymentTypeNumber: number };
  };
  salesPerson: { employeeNumber: number };
  supplierContact: { supplierContactNumber: number };
  supplierGroup: { supplierGroupNumber: number };
  vatZone: { vatZoneNumber: number };
  website: string;
  zip: string;
};

export type UpdateSupplier = Partial<CreateSupplier>;

export default class Suppliers extends RestApi {
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
   * Get collection of suppliers.
   * @see https://restdocs.e-conomic.com/#get-suppliers
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */
  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<Supplier[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/suppliers?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<Supplier[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Get a specific supplier.
   * @see https://restdocs.e-conomic.com/#get-suppliers-suppliernumber
   * @param {number} supplierNumber
   * @returns {Promise<HttpResponse>}
   */
  getFor(supplierNumber: number): Promise<HttpResponse<Supplier>> {
    const requestObj = {
      method: "get",
      url: `/suppliers/${supplierNumber}`,
    };
    return this._httpRequest<Supplier>(requestObj);
  }

  /**
   * Create a new supplier.
   * @see https://restdocs.e-conomic.com/#post-suppliers
   * @param {CreateSupplier} supplier
   * @returns {Promise<HttpResponse<Supplier>>}
   */
  createSupplier(supplier: CreateSupplier): Promise<HttpResponse<Supplier>> {
    const requestObj = {
      method: "post",
      url: `/suppliers`,
      data: supplier,
    };
    return this._httpRequest<Supplier>(requestObj);
  }

  /**
   * Update an existing supplier.
   * @see https://restdocs.e-conomic.com/#put-suppliers-suppliernumber
   * @param {number} supplierNumber
   * @param {UpdateSupplier} supplier
   * @returns {Promise<HttpResponse<Supplier>>}
   */
  updateSupplier(
    supplierNumber: number,
    supplier: UpdateSupplier
  ): Promise<HttpResponse<Supplier>> {
    const requestObj = {
      method: "put",
      url: `/suppliers/${supplierNumber}`,
      data: supplier,
    };
    return this._httpRequest<Supplier>(requestObj);
  }

  /**
   * Delete an existing supplier.
   * @see https://restdocs.e-conomic.com/#delete-suppliers-suppliernumber
   * @param {number} supplierNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteSupplier(supplierNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/suppliers/${supplierNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }
}
