import { CustomerInfo } from "./Customers";
import RestApi from "../../modules/RestApi";
import {
  AuthToken,
  InvoiceResponse,
  Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";

export type IPaymentTerms = {
  paymentTermsNumber: number;
  daysOfCredit: number;
  description: string;
  name: string;
  paymentTermsType: string;
  self: string;
};

export type PaymentTerms = {
  contraAccountForPrepaidAmount: ContraAccountForPrepaidAmount;
  paymentTermsNumber: number;
  contraAccountForRemainderAmount: ContraAccountForRemainderAmount;
  description: string;
  self: string;
  daysOfCredit: number;
  name: string;
  paymentTermsType:
    | "net"
    | "invoiceMonth"
    | "paidInCash"
    | "prepaid"
    | "dueDate"
    | "factoring"
    | "invoiceWeekStartingSunday"
    | "invoiceWeekStartingMonday"
    | "creditcard";
  percentageForPrepaidAmount: number;
  percentageForRemainderAmount: number;
};

export type ContraAccountForPrepaidAmount = {
  accountNumber: number;
  self: string;
};

export type ContraAccountForRemainderAmount = {
  accountNumber: number;
  self: string;
};

export type creditCardCompany = CustomerInfo;

export default class ProductGroups extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * This endpoint allows you to fetch a collection of all product groups.
   *
   * @see https://restdocs.e-conomic.com/#get-payment-terms
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */
  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<IPaymentTerms[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/payment-terms?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<IPaymentTerms[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint allows you to fetch a specific product group.
   *
   * @see https://restdocs.e-conomic.com/#get-payment-terms
   * @param {number} paymentTermsNumber
   * @returns {Promise<HttpResponse>}
   */
  getFor(paymentTermsNumber: number): Promise<HttpResponse<IPaymentTerms>> {
    const requestObj = {
      method: "get",
      url: `/payment-terms/${paymentTermsNumber}`,
    };
    return this._httpRequest<IPaymentTerms>(requestObj);
  }

  /**
   * Create a new product
   * .
   * @see https://restdocs.e-conomic.com/#post-payment-terms
   * @param {PaymentTerms} paymentTerms
   * @returns {Promise<HttpResponse<PaymentTerms>>}
   */
  create(paymentTerms: any): Promise<HttpResponse<PaymentTerms>> {
    const requestObj = {
      method: "post",
      url: `/payment-terms`,
      data: paymentTerms,
    };
    return this._httpRequest<PaymentTerms>(requestObj);
  }
}
