import RestApi from "../RestApi";
import { CustomerInfo } from "./Customers";
import { Delivery, DeliveryLocation } from "./DeliveryLocation";
import { Lines, Note, Pdf, Recipient, References } from "./Invoices";
import { Templates } from "./Templates";
import { ProjectInfo } from "./Projects";
import { PaymentTerms } from "./PaymentTerms";
import { HttpResponse } from "../../types/Http.type";
import {
  AuthToken,
  QuoteResponse,
  Pagination,
} from "../../types/Economic.type";
import { Endpoints } from "./Common";

/**
 *  Represents the base `Quote` interface for all quote types.
 */

interface Quote {
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

export type QuoteEndpoints = Pick<
  Endpoints,
  "archived" | "drafts" | "sent" | "self"
>;

type Soap = {
  quoteHandle: QuoteHandle;
};

type QuoteHandle = {
  id: number;
};

/**
 *  Represents a draft quote interface extending the base `Quote` interface.
 */
export interface DraftQuote extends Quote {
  costPriceInBaseCurrency: number;
  exchangeRate: number;
  grossAmountInBaseCurrency: number;
  lastUpdated: number;
  marginInBaseCurrency: number;
  marginPercentage: number;
  soap: Soap;
  templates: Pick<Templates, "self" | "upgradeInstructions">;
  quoteNumber: number;
}

/**
 *  Represents a single draft quote interface extending `DraftQuote` interface.
 */
export interface SingleDraftQuote extends DraftQuote {
  lines: Lines;
}

/**
 *  Represents a sent quote interface extending `DraftQuote` interface.
 */
export interface SentQuote extends DraftQuote {}

/**
 *  Represents an archived quote interface extending `DraftQuote` interface.
 */
export interface ArchivedQuote extends DraftQuote {}

export default class Quotes extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * This is the root for the quotes endpoint. From here you can navigate to draft, sent and archived quotes.
   *
   * @see https://restdocs.e-conomic.com/#quotes
   * @returns {Promise<HttpResponse>}
   *
   */

  get(): Promise<HttpResponse<QuoteEndpoints>> {
    const requestObj = {
      method: "get",
      url: `/quotes`,
    };
    return this._httpRequest<QuoteEndpoints>(requestObj);
  }

  /**
   * This returns a collection of all draft quotes.
   *
   * @see https://restdocs.e-conomic.com/#get-quotes-drafts
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getDrafts(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<QuoteResponse<DraftQuote[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/quotes/drafts?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<QuoteResponse<DraftQuote[], Pagination>>(
      requestObj
    );
  }

  /**
   * Returns a specific customer's quote drafts.
   *
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerQuoteDrafts(
    customerNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<QuoteResponse<DraftQuote[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/quotes/drafts?skippages=${skipPages}&pagesize=${limit}&filter=customer.customerNumber$eq:${customerNumber}`,
    };

    return this._httpRequest<QuoteResponse<DraftQuote[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific quote draft.
   *
   * @see https://restdocs.e-conomic.com/#get-quotes-drafts-quotenumber
   * @param {number} quoteNumber
   * @returns {Promise<HttpResponse<SingleDraftQuote>>}
   *
   */

  getDraft(quoteNumber: number): Promise<HttpResponse<SingleDraftQuote>> {
    const requestObj = {
      method: "get",
      url: `/quotes/drafts/${quoteNumber}`,
    };
    return this._httpRequest<SingleDraftQuote>(requestObj);
  }

  /**
   * Create a new draft quote.
   * @see https://restdocs.e-conomic.com/#post-quotes-drafts
   * @param {DraftQuote} draftQuote
   * @returns {Promise<HttpResponse<SingleDraftQuote>>}
   */
  createDraftQuote(
    draftQuote: DraftQuote
  ): Promise<HttpResponse<SingleDraftQuote>> {
    const requestObj = {
      method: "post",
      url: `/quotes/drafts`,
      data: draftQuote,
    };
    return this._httpRequest<SingleDraftQuote>(requestObj);
  }

  /**
   * Update an existing draft quote.
   * @see https://restdocs.e-conomic.com/#put-quotes-drafts-quotenumber
   * @param {number} quoteNumber
   * @param {DraftQuote} draftQuote
   * @returns {Promise<HttpResponse<SingleDraftQuote>>}
   */
  updateDraftQuote(
    quoteNumber: number,
    draftQuote: DraftQuote
  ): Promise<HttpResponse<SingleDraftQuote>> {
    const requestObj = {
      method: "put",
      url: `/quotes/drafts/${quoteNumber}`,
      data: draftQuote,
    };
    return this._httpRequest<SingleDraftQuote>(requestObj);
  }

  /**
   * Delete an existing draft quote.
   * @see https://restdocs.e-conomic.com/#delete-quotes-drafts-quotenumber
   * @param {number} quoteNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteDraftQuote(quoteNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/quotes/drafts/${quoteNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }

  /**
   * This returns a collection of all sent quotes.
   *
   * @see https://restdocs.e-conomic.com/#get-quotes-sent
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getAllSent(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<QuoteResponse<SentQuote[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/quotes/sent?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<QuoteResponse<SentQuote[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific sent quote.
   *
   * @see https://restdocs.e-conomic.com/#get-quotes-sent-quotenumber
   *
   * @param {number} quoteNumber
   * @returns {Promise<HttpResponse<SentQuote>>}
   *
   */

  getSent(quoteNumber: number): Promise<HttpResponse<SentQuote>> {
    const requestObj = {
      method: "get",
      url: `/quotes/sent/${quoteNumber}`,
    };
    return this._httpRequest<SentQuote>(requestObj);
  }

  /**
   * This returns a collection of all archived quotes.
   *
   * @see https://restdocs.e-conomic.com/#get-quotes-archived
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   *
   */

  getAllArchived(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<QuoteResponse<ArchivedQuote[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/quotes/archived?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<QuoteResponse<ArchivedQuote[], Pagination>>(
      requestObj
    );
  }

  /**
   * This endpoint provides you with the entire document for a specific archived quote. An archived quote is a quote that was first registered as sent and then upgraded to quote draft.
   *
   * @see https://restdocs.e-conomic.com/#get-quotes-archived-quotenumber
   *
   * @param {number} quoteNumber
   * @returns {Promise<HttpResponse>}
   *
   */

  getArchived(quoteNumber: number): Promise<HttpResponse<ArchivedQuote>> {
    const requestObj = {
      method: "get",
      url: `/quotes/archived/${quoteNumber}`,
    };
    return this._httpRequest<ArchivedQuote>(requestObj);
  }
}
