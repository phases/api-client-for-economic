import { ProjectInfo } from "./Projects";
import { Customer, CustomerInfo } from "./Customers";
import { Delivery, DeliveryLocation } from "./DeliveryLocation";
import { EmployeeInfo } from "./Employees";
import { PaymentTerms } from "./PaymentTerms";
import { VatZoneInfo } from "./Vatzone";
import { LayoutInfo } from "./Layouts";
import RestApi from "../../modules/RestApi";
import { HttpResponse } from "../../types/Http.type";
import {
  AuthToken,
  EconomicResponse,
  InvoiceResponse,
  Pagination,
} from "../../types/Economic.type";
import { ProductInfo } from "./Products";
import { Endpoints } from "./Common";
import { IBookedInvoice } from "./BookedInvoices";

export type InvoiceEndpoints = Pick<
  Endpoints,
  | "booked"
  | "drafts"
  | "notDue"
  | "overdue"
  | "paid"
  | "unpaid"
  | "sent"
  | "totals"
  | "self"
>;

export type Totals = Pick<InvoiceEndpoints, "booked" | "drafts" | "self">;

export type Note = {
  heading: string;
  textLine1: string;
  textLine2: string;
};
export type Pdf = {
  download: string;
};

export type Recipient = Pick<
  Customer,
  | "address"
  | "attention"
  | "city"
  | "country"
  | "ean"
  | "name"
  | "publicEntryNumber"
  | "zip"
> & {
  cvr: string;
  nemHandelType: "ean" | "corporateIdentificationNumber" | "pNumber" | "peppol";
  vatZone: VatZoneInfo;
};

export type References = {
  customerContact: Pick<Customer, "customerContact">;
  other: string;
  salesPerson: EmployeeInfo;
  vendorReference: EmployeeInfo;
};

export type Soap = {
  currentInvoiceHandle: currentInvoiceHandle;
};

export type currentInvoiceHandle = {
  id: number;
};
export type DraftInvoiceTemplate = {
  bookingInstructions: string;
  self: string;
};
/**
 *  Represents the base `Invoice` interface for all invoice types.
 */

interface Invoice {
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

/**
 *  Represents a draft invoice interface  extending the base `Invoice` interface.
 */
export interface DraftInvoice extends Invoice {
  attachment: string;
  exchangeRate: number;
  costPriceInBaseCurrency: number;
  draftInvoiceNumber: number;
  grossAmountInBaseCurrency: number;
  lastUpdated: number;
  marginInBaseCurrency: number;
  marginPercentage: number;
  soap: Soap;
  templates: DraftInvoiceTemplate;
}

export interface SingleDraftInvoice extends DraftInvoice {
  lines: Lines;
}

export type Lines = Line[];

type Line = {
  accrual: Accrual;
  departmentalDistribution: DepartmentalDistribution;
  description: string;
  discountPercentage: number;
  lineNumber: number;
  marginInBaseCurrency: number;
  marginPercentage: number;
  product: ProductInfo;
  quantity: number;
  sortKey: number;
  totalNetAmount: number;
  unit: Unit;
  unitCostPrice: number;
  unitNetPrice: number;
};

type Unit = {
  name: string;
  self: string;
  unitNumber: number;
};

type Accrual = {
  endDate: string;
  startDate: string;
};
type DepartmentalDistribution = {
  departmentalDistributionNumber: number;
  distributionType: string;
  self: string;
};

/**
 *  Represents a booked invoice interface  extending the base `Invoice` interface.
 */
export interface BookedInvoice extends Invoice {
  grossAmountInBaseCurrency: number;
  exchangeRate: number;
  bookedInvoiceNumber: number;
  layout: LayoutInfo;
  remainder: number;
  remainderInBaseCurrency: number;
  sent: string;
}

export interface BookedInvoiceRequestData {
  draftInvoice: {
    draftInvoiceNumber: number;
    self: string;
  };
}

/**
 *  Represents a paid and unpaid invoice interface  extending the base `Invoice` interface.
 */
export interface PaidAndUnpaidInvoice extends Invoice {
  bookedInvoiceNumber: number;
  layout: LayoutInfo;
  remainder: number;
  remainderInBaseCurrency: number;
  sent: string;
}

/**
 *  Represents a paid invoice interface  extending the base `Invoice` interface.
 */
export interface PaidInvoice extends Invoice {
  bookedInvoiceNumber: number;
  layout: LayoutInfo;
  remainder: number;
  remainderInBaseCurrency: number;
  sent: string;
}

/**
 *  Represents a unpaid invoice interface  extending the base `PaidInvoice` interface.
 */
export interface UnpaidInvoice extends PaidInvoice {}

/**
 *  Represents  overdue invoice interface  extending the base `PaidInvoice` interface.
 */
export interface OverdueInvoice extends PaidInvoice {}

/**
 *  Represents not-due invoice interface  extending the base `PaidInvoice` interface.
 */
export interface NotdueInvoice extends PaidInvoice {}

/**
 *  Represents type for sent invoice
 */
export type SentInvoice = {
  createdBy: string;
  creationDate: string; //format Date
  id: number;
  invoice: InvoiceInfo;
  recipient: Pick<Recipient, "ean" | "name"> & { mobilePhone: string };
  self: string;
  sendBy: "mobilePay" | "ean";
  status: string;
};

export type InvoiceInfo = Pick<BookedInvoice, "bookedInvoiceNumber" | "self">;

export default class Invoices extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * This is the root for the invoice endpoint. From here you can navigate to draft and booked invoices, but also to a number of convenience endpoints such as ‘paid’ and ‘overdue’.
   *
   * @see https://restdocs.e-conomic.com/#invoices
   * @returns {Promise<HttpResponse>}
   *
   */

  get(): Promise<HttpResponse<InvoiceEndpoints>> {
    const requestObj = {
      method: "get",
      url: `/invoices`,
    };
    return this._httpRequest<InvoiceEndpoints>(requestObj);
  }

  /**
   * This endpoint provides you with a collection of draft invoices.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-drafts
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getDrafts(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<DraftInvoice[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/invoices/drafts?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<DraftInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific draft invoice.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-drafts-draftinvoicenumber
   * @param {number} draftInvoiceNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getDraft(
    draftInvoiceNumber: number
  ): Promise<HttpResponse<SingleDraftInvoice>> {
    const requestObj = {
      method: "get",
      url: `/invoices/drafts/${draftInvoiceNumber}`,
    };
    return this._httpRequest<SingleDraftInvoice>(requestObj);
  }

  /**
   * This returns a collection of all booked invoices.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-booked
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */
  getAllBooked(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<IBookedInvoice[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/invoices/booked?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<IBookedInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint returns a specific booked invoice.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-booked-bookedinvoicenumber
   * @param {number} bookedInvoiceNumber
   * @returns {Promise<HttpResponse>}
   *
   */
  getBooked(
    bookedInvoiceNumber: number
  ): Promise<HttpResponse<IBookedInvoice>> {
    const requestObj = {
      method: "get",
      url: `/invoices/booked/${bookedInvoiceNumber}`,
    };
    return this._httpRequest<IBookedInvoice>(requestObj);
  }

  /**
   * Create booked invoices
   *
   * @see https://restdocs.e-conomic.com/?javascript#post-invoices-booked
   * @param {BookedInvoiceRequestData} data
   * @returns {Promise<HttpResponse>}
   */
  createBookedInvoice(
    data: BookedInvoiceRequestData
  ): Promise<HttpResponse<IBookedInvoice>> {
    const requestObj = {
      method: "post",
      url: `/invoices/booked/`,
      data: data,
    };

    return this._httpRequest<IBookedInvoice>(requestObj);
  }

  /**
   * This returns a collection of all paid invoices.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-paid
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getPaid(
    offset: number = 0,
    limit: number = 100,
    queryParams: any = {}
  ): Promise<HttpResponse<InvoiceResponse<PaidInvoice[], Pagination>>> {
    const url =
      `/invoices/paid?skippages=${offset}&pagesize=${limit}` +
      (queryParams.filter
        ? `&filter=${encodeURIComponent(queryParams.filter)}`
        : "");
    const requestObj = {
      method: "get",
      url,
    };
    return this._httpRequest<InvoiceResponse<PaidInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This returns a collection of all unpaid invoices
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-unpaid
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getUnpaid(
    offset: number = 0,
    limit: number = 100,
    queryParams: any = {}
  ): Promise<HttpResponse<InvoiceResponse<UnpaidInvoice[], Pagination>>> {
    const url =
      `/invoices/unpaid?skippages=${offset}&pagesize=${limit}` +
      (queryParams.filter
        ? `&filter=${encodeURIComponent(queryParams.filter)}`
        : "");

    const requestObj = {
      method: "get",
      url,
    };
    return this._httpRequest<InvoiceResponse<UnpaidInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This returns a collection of all overdue invoices.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-overdue
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getOverdue(
    offset: number = 0,
    limit: number = 100,
    queryParams: any = {}
  ): Promise<HttpResponse<InvoiceResponse<OverdueInvoice[], Pagination>>> {
    const url =
      `/invoices/overdue?skippages=${offset}&pagesize=${limit}` +
      (queryParams.filter
        ? `&filter=${encodeURIComponent(queryParams.filter)}`
        : "");
    const requestObj = {
      method: "get",
      url,
    };
    return this._httpRequest<InvoiceResponse<OverdueInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This returns a collection of all not due invoices.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-not-due
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getNotdue(
    offset: number = 0,
    limit: number = 100,
    queryParams: any = {}
  ): Promise<HttpResponse<InvoiceResponse<NotdueInvoice[], Pagination>>> {
    const url =
      `/invoices/not-due?skippages=${offset}&pagesize=${limit}` +
      (queryParams.filter
        ? `&filter=${encodeURIComponent(queryParams.filter)}`
        : "");
    const requestObj = {
      method: "get",
      url,
    };
    return this._httpRequest<InvoiceResponse<NotdueInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with a collection of all the invoices sent via e-invoicing.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-sent
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getAllSent(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<SentInvoice[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/invoices/sent?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<SentInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with a single object of the invoice sent via e-invoicing.
   *
   * @see https://restdocs.e-conomic.com/#get-invoices-sent-id
   *
   * @param {number} id
   * @returns {Promise<HttpResponse>}
   *
   */

  getSent(id: number): Promise<HttpResponse<SentInvoice>> {
    const requestObj = {
      method: "get",
      url: `/invoices/sent/${id}`,
    };
    return this._httpRequest<SentInvoice>(requestObj);
  }

  /**
   * Create a new draft invoice.
   * @see https://restdocs.e-conomic.com/#post-invoices-drafts
   * @param {DraftInvoice} draftInvoice
   * @returns {Promise<HttpResponse<SingleDraftInvoice>>}
   */
  createDraftInvoice(
    draftInvoice: DraftInvoice
  ): Promise<HttpResponse<SingleDraftInvoice>> {
    const requestObj = {
      method: "post",
      url: `/invoices/drafts`,
      data: draftInvoice,
    };
    return this._httpRequest<SingleDraftInvoice>(requestObj);
  }

  /**
   * Get a collection of order drafts.
   * @see https://restdocs.e-conomic.com/#get-orders-drafts
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse<InvoiceResponse<DraftInvoice[], Pagination>>>}
   */
  getOrderDrafts(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<DraftInvoice[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/orders/drafts?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<DraftInvoice[], Pagination>>(
      requestObj
    );
  }

  /**
   * Get a specific order draft.
   * @see https://restdocs.e-conomic.com/#get-orders-drafts-draftOrderNumber
   * @param {number} draftOrderNumber
   * @returns {Promise<HttpResponse<SingleDraftInvoice>>}
   */
  getOrderDraft(
    draftOrderNumber: number
  ): Promise<HttpResponse<SingleDraftInvoice>> {
    const requestObj = {
      method: "get",
      url: `/orders/drafts/${draftOrderNumber}`,
    };
    return this._httpRequest<SingleDraftInvoice>(requestObj);
  }

  /**
   * Create a new order draft.
   * @see https://restdocs.e-conomic.com/#post-orders-drafts
   * @param {DraftInvoice} draftOrder
   * @returns {Promise<HttpResponse<SingleDraftInvoice>>}
   */
  createOrderDraft(
    draftOrder: DraftInvoice
  ): Promise<HttpResponse<SingleDraftInvoice>> {
    const requestObj = {
      method: "post",
      url: `/orders/drafts`,
      data: draftOrder,
    };
    return this._httpRequest<SingleDraftInvoice>(requestObj);
  }

  /**
   * Update an existing order draft.
   * @see https://restdocs.e-conomic.com/#put-orders-drafts-draftOrderNumber
   * @param {number} draftOrderNumber
   * @param {DraftInvoice} draftOrder
   * @returns {Promise<HttpResponse<SingleDraftInvoice>>}
   */
  updateOrderDraft(
    draftOrderNumber: number,
    draftOrder: DraftInvoice
  ): Promise<HttpResponse<SingleDraftInvoice>> {
    const requestObj = {
      method: "put",
      url: `/orders/drafts/${draftOrderNumber}`,
      data: draftOrder,
    };
    return this._httpRequest<SingleDraftInvoice>(requestObj);
  }

  /**
   * Delete an existing order draft.
   * @see https://restdocs.e-conomic.com/#delete-orders-drafts-draftOrderNumber
   * @param {number} draftOrderNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteOrderDraft(draftOrderNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/orders/drafts/${draftOrderNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }
}
