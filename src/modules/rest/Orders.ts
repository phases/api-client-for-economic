import RestApi from "../../modules/RestApi";
import { CustomerInfo } from "./Customers";
import { Delivery, DeliveryLocation } from "./DeliveryLocation";
import { Lines, Note, Pdf, Recipient, References } from "./Invoices";
import { Templates } from "./Templates";
import { ProjectInfo } from "./Projects";
import { PaymentTerms } from "./PaymentTerms";
import { HttpResponse } from "../../types/Http.type";
import {
  AuthToken,
  OrderResponse,
  Pagination,
} from "../../types/Economic.type";
import { Endpoints } from "./Common";

/**
 *  Represents the base `Order` interface for all order types.
 */

interface Order {
  currency: string;
  customer: CustomerInfo;
  date: string;
  dueDate: string;
  delivery: Delivery;
  deliveryLocation: DeliveryLocation;
  grossAmount: number;
  netAmount: number;
  netAmountInBaseCurrency: number;
  notes: Note;
  paymentTerms: Pick<
    PaymentTerms,
    | "paymentTermsNumber"
    | "paymentTermsType"
    | "name"
    | "self"
    | "description"
    | "daysOfCredit"
  >;
  pdf: Pdf;
  project: ProjectInfo;
  recipient: Recipient;
  references: References;
  roundingAmount: number;
  self: string;
  vatAmount: number;
}

export type InvoiceEndpoints = Pick<
  Endpoints,
  "archived" | "drafts" | "sent" | "self"
>;

type Soap = {
  orderHandle: OrderHandle;
};

type OrderHandle = {
  id: number;
};

/**
 *  Represents a draft order interface extending  the base `Order` interface.
 */
export interface DraftOrder extends Order {
  costPriceInBaseCurrency: number;
  exchangeRate: number;
  grossAmountInBaseCurrency: number;
  lastUpdated: number;
  marginInBaseCurrency: number;
  marginPercentage: number;
  soap: Soap;
  templates: Pick<Templates, "self" | "upgradeInstructions">;
  orderNumber: number;
}

/**
 *  Represents a single draft order interface extending  `DraftOrder` interface.
 */
export interface SingleDraftOrder extends DraftOrder {
  lines: Lines;
}

/**
 *  Represents a sent order interface extending  `DraftOrder` interface.
 */
export interface SentOrder extends DraftOrder {}

/**
 *  Represents a archived order interface extending  `DraftOrder` interface.
 */
export interface ArchivedOrder extends DraftOrder {}

export type SentOrderUpdate = Pick<DraftOrder, "orderNumber">;

export default class Orders extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * This is the root for the orders endpoint. From here you can navigate to draft, sent and archived orders.
   *
   * @see https://restdocs.e-conomic.com/#orders
   * @returns {Promise<HttpResponse>}
   *
   */

  get(): Promise<HttpResponse<InvoiceEndpoints>> {
    const requestObj = {
      method: "get",
      url: `/orders`,
    };
    return this._httpRequest<InvoiceEndpoints>(requestObj);
  }

  /**
   * This returns a collection of all draft orders.
   *
   * @see https://restdocs.e-conomic.com/#get-orders-drafts
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getDrafts(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<OrderResponse<DraftOrder[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/orders/drafts?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<OrderResponse<DraftOrder[], Pagination>>(
      requestObj
    );
  }

  /**
   * Returns a specific customer's order drafts.
   *
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerOrderDrafts(
    customerNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<OrderResponse<DraftOrder[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/orders/drafts?skippages=${skipPages}&pagesize=${limit}&filter=customer.customerNumber$eq:${customerNumber}`,
    };

    return this._httpRequest<OrderResponse<DraftOrder[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific order draft.
   *
   * @see https://restdocs.e-conomic.com/#get-orders-drafts-ordernumber
   * @param {number} orderNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getDraft(orderNumber: number): Promise<HttpResponse<SingleDraftOrder>> {
    const requestObj = {
      method: "get",
      url: `/orders/drafts/${orderNumber}`,
    };
    return this._httpRequest<SingleDraftOrder>(requestObj);
  }

  /**
   * Create a new draft order.
   * @see https://restdocs.e-conomic.com/#post-orders-drafts
   * @param {DraftOrder} draftOrder
   * @returns {Promise<HttpResponse<SingleDraftOrder>>}
   */
  createDraftOrder(
    draftOrder: DraftOrder
  ): Promise<HttpResponse<SingleDraftOrder>> {
    const requestObj = {
      method: "post",
      url: `/orders/drafts`,
      data: draftOrder,
    };
    return this._httpRequest<SingleDraftOrder>(requestObj);
  }

  /**
   * Update an existing draft order.
   * @see https://restdocs.e-conomic.com/#put-orders-drafts-ordernumber
   * @param {number} orderNumber
   * @param {DraftOrder} draftOrder
   * @returns {Promise<HttpResponse<SingleDraftOrder>>}
   */
  updateDraftOrder(
    orderNumber: number,
    draftOrder: DraftOrder
  ): Promise<HttpResponse<SingleDraftOrder>> {
    const requestObj = {
      method: "put",
      url: `/orders/drafts/${orderNumber}`,
      data: draftOrder,
    };
    return this._httpRequest<SingleDraftOrder>(requestObj);
  }

  /**
   * Delete an existing draft order.
   * @see https://restdocs.e-conomic.com/#delete-orders-drafts-ordernumber
   * @param {number} orderNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteDraftOrder(orderNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/orders/drafts/${orderNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }

  /**
   * This returns a collection of all sent orders.
   *
   * @see https://restdocs.e-conomic.com/#get-orders-sent
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getAllSent(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<OrderResponse<SentOrder[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/orders/sent?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<OrderResponse<SentOrder[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific sent order.
   *
   * @see https://restdocs.e-conomic.com/#get-orders-sent-ordernumber
   *
   * @param {number} orderNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getSent(orderNumber: number): Promise<HttpResponse<SentOrder>> {
    const requestObj = {
      method: "get",
      url: `/orders/sent/${orderNumber}`,
    };
    return this._httpRequest<SentOrder>(requestObj);
  }

  /**
   * Create sent order
   *
   * @param {SentOrderUpdate} sentOrder
   * @returns {Promise<HttpResponse<DraftOrder>>}
   */
  sentDraftOrder(
    sentOrder: SentOrderUpdate
  ): Promise<HttpResponse<DraftOrder>> {
    const requestObj = {
      method: "post",
      url: `/orders/sent`,
      data: sentOrder,
    };

    return this._httpRequest<DraftOrder>(requestObj);
  }

  /**
   * This returns a collection of all archived orders.
   *
   * @see https://restdocs.e-conomic.com/#get-orders-archived
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getAllArchived(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<OrderResponse<ArchivedOrder[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/orders/archived?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<OrderResponse<ArchivedOrder[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific archived order. An archived order is an order that was first registered as sent and then upgraded to invoice draft.
   *
   * @see https://restdocs.e-conomic.com/#get-orders-archived-ordernumber
   *
   * @param {number} orderNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getArchived(orderNumber: number): Promise<HttpResponse<ArchivedOrder>> {
    const requestObj = {
      method: "get",
      url: `/orders/archived/${orderNumber}`,
    };
    return this._httpRequest<ArchivedOrder>(requestObj);
  }
}
