import { AuthToken, EconomicResponse, Pagination } from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";
import RestApi from "../RestApi";
import { Employee } from "./Employees";
import { DraftInvoice, InvoiceEndpoints, Totals } from "./Invoices";
import { Layout } from "./Layouts";
import { PaymentTerms } from "./PaymentTerms";
import { Templates } from "./Templates";
import { VatZone, VatZoneInfo } from "./Vatzone";

export type CustomerGroup = {
  customerGroupNumber: number;
  self: string;
};

export type Customer = {
  authToken: any;
  address: string;
  attention: Attention;
  balance: number;
  barred: boolean;
  city: string;
  contacts: string;
  corporateIdentificationNumber: string;
  country: string;
  creditLimit: number;
  currency: string;
  customerContact: CustomerContactInfo;
  customerGroup: CustomerGroup;
  customerNumber: number;
  defaultDeliveryLocation: DefaultDeliveryLocation;
  deliveryLocations: string;
  dueAmount: number;
  ean: string;
  eInvoicingDisabledByDefault: boolean;
  email: string;
  invoices: Pick<InvoiceEndpoints, "booked" | "drafts" | "self">;
  lastUpdated: string;
  layout: Layout;
  mobilePhone: string;
  name: string;
  paymentTerms: PaymentTerms;
  pNumber: string;
  publicEntryNumber: string;
  salesPerson: Employee;
  self: string;
  telephoneAndFaxNumber: string;
  templates: Pick<Templates, "invoice" | "invoiceLine" | "self">;
  totals: Totals;
  vatNumber: string;
  vatZone: VatZone;
  website: string;
  zip: string;
};

export type CustomerInfo = Pick<Customer, "customerNumber" | "self">;

export type Attention = {
  customerContactNumber: number;
  self: string;
};

export type CustomerContactInfo = {
  customerContactNumber: number;
  self: string;
};

export type DefaultDeliveryLocation = {
  deliveryLocationNumber: number;
  self: string;
};

export type CustomerTotals = {
  booked: string;
  drafts: string;
  self: string;
};

export type CustomerDeliveryLocations = {
  address: string;
  barred: boolean;
  city: string;
  country: string;
  customer: CustomerInfo;
  deliveryLocationNumber: number;
  postalCode: string;
  self: string;
  sortKey: number;
  termsOfDelivery: string;
};

export type CustomerContact = {
  customer: CustomerInfo;
  customerContactNumber: number;
  deleted: boolean;
  eInvoiceId: string;
  email: string;
  emailNotifications: [];
  name: string;
  notes: string;
  phone: string;
  self: string;
  sortKey: number;
};

export type CreateCustomerContact = {
  customer: CustomerInfo;
  eInvoiceId: string;
  email: string;
  name: string;
  phone: string;
  sortKey: number;
  notes?: string;
};

export type CreateCustomerDeliveryLocation = {
  address: string;
  barred: boolean;
  city: string;
  country: string;
  postalCode: string;
  sortKey: number;
  termsOfDelivery: string;
};

// SalesPerson type
export type SalesPerson = {
  employeeNumber: number;
  self: string;
};

// References type
export type References = {
  customerContact: {
    customerContactNumber: number;
    self: string;
  };
  salesPerson: SalesPerson;
};

// Recipient type
export type Recipient = {
  address: string;
  attention: Attention;
  city: string;
  country: string;
  ean: string;
  name: string;
  publicEntryNumber: string;
  vatZone: VatZoneInfo;
  zip: string;
};

// DeliveryInfo type
export type DeliveryInfo = {
  address: string;
  city: string;
  country: string;
  deliveryDate: string; // full-date format
  deliveryTerms: string;
  zip: string;
};

// DeliveryLocationInfo type
export type DeliveryLocationInfo = {
  deliveryLocationNumber: number;
  self: string;
};

// TemplateInvoice type
export type CustomerInvoiceTemplate = {
  customer: {
    customerNumber?: number; 
    self: string; 
  };
  deliveryLocation: {
    deliveryLocationNumber?: number; 
    self: string; 
  };
  paymentTerms: {
    paymentTermsNumber?: number; 
    self: string; 
  };
  recipient: {
    attention: {
      customerContactNumber?: number;
      self: string; 
    };
    vatZone: {
      vatZoneNumber?: number; 
      self: string; 
    };
    address?: string; 
    city?: string; 
    country?: string; 
    ean?: string; 
    name?: string;
    publicEntryNumber?: string; 
    zip?: string; 
  };
  references: {
    customerContact: {
      customerContactNumber?: number; 
      self: string;
    };
    salesPerson: {
      employeeNumber?: number;
      self: string; 
    };
  };
  currency?: string; 
  date?: string;
  dueDate?: string; 
  exchangeRate?: number; 
  delivery?: {
    address?: string;
    city?: string;
    country?: string;
    deliveryDate?: string;
    deliveryTerms?: string;
    zip?: string;
  };
};


export type ProductInfo = {
  productNumber?: string;
  self: string;
};

export type CustomerInvoiceLineTemplate = {
  description?: string;
  product: ProductInfo; 
  self: string;
};

export default class Customers extends RestApi {
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
   * Get collection of customers.
   * @see https://restdocs.e-conomic.com/#get-customers
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */

  get(
    offset: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<Customer[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/customers?skippages=${offset}&pagesize=${limit}`,
    };
    return this._httpRequest<EconomicResponse<Customer[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Get a specific customer
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getFor(customerNumber: number): Promise<HttpResponse<Customer>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}`,
    };

    return this._httpRequest<Customer>(requestObj);
  }

  /**
   * Returns a specific customer totals.
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-totals
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerTotals(
    customerNumber: number
  ): Promise<HttpResponse<CustomerTotals>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/totals`,
    };

    return this._httpRequest<CustomerTotals>(requestObj);
  }

  /**
   * Returns a specific customer delivery locations.
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-delivery-locations
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerDeliveryLocations(
    customerNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<
    HttpResponse<EconomicResponse<CustomerDeliveryLocations[], Pagination, any>>
  > {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/delivery-locations?skippages=${skipPages}&pagesize=${limit}`,
    };

    return this._httpRequest<
      EconomicResponse<CustomerDeliveryLocations[], Pagination, any>
    >(requestObj);
  }

  /**
   * Returns a specific customer contacts.
   *
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-contacts
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerContacts(
    customerNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<
    HttpResponse<EconomicResponse<CustomerContact[], Pagination, any>>
  > {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/contacts?skippages=${skipPages}&pagesize=${limit}`,
    };

    return this._httpRequest<
      EconomicResponse<CustomerContact[], Pagination, any>
    >(requestObj);
  }

  /**
   * Returns a specific customer invoices drafts.
   *
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-invoices-drafts
   * @param {number} customerNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerInvoiceDrafts(
    customerNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<EconomicResponse<DraftInvoice[], Pagination, any>>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/invoices/drafts?skippages=${skipPages}&pagesize=${limit}`,
    };

    return this._httpRequest<EconomicResponse<DraftInvoice[], Pagination, any>>(
      requestObj
    );
  }

  /**
   * Create a new customer
   * @see https://restdocs.e-conomic.com/#customers-create
   * @param {Customer} customer
   * @returns {Promise<HttpResponse<Customer>>}
   */
  createCustomer(customer: Customer): Promise<HttpResponse<Customer>> {
    const requestObj = {
      method: "post",
      url: `/customers`,
      data: customer,
    };

    return this._httpRequest<Customer>(requestObj);
  }

  /**
   * Create a new customer contact
   * @see https://restdocs.e-conomic.com/#post-customers-customernumber-contacts
   * @param {number} customerNumber
   * @param {CreateCustomerContact} contact
   * @returns {Promise<HttpResponse<CustomerContact>>}
   */
  createCustomerContact(
    customerNumber: number,
    contact: CreateCustomerContact
  ): Promise<HttpResponse<CustomerContact>> {
    const requestObj = {
      method: "post",
      url: `/customers/${customerNumber}/contacts`,
      data: contact,
    };

    return this._httpRequest<CustomerContact>(requestObj);
  }

  /**
   * Create a new customer delivery location
   * @see https://restdocs.e-conomic.com/#post-customers-customernumber-delivery-locations
   * @param {number} customerNumber
   * @param {CreateCustomerDeliveryLocation} deliveryLocation
   * @returns {Promise<HttpResponse<CustomerDeliveryLocations>>}
   */
  createCustomerDeliveryLocation(
    customerNumber: number,
    deliveryLocation: CreateCustomerDeliveryLocation
  ): Promise<HttpResponse<CustomerDeliveryLocations>> {
    const requestObj = {
      method: "post",
      url: `/customers/${customerNumber}/delivery-locations`,
      data: deliveryLocation,
    };

    return this._httpRequest<CustomerDeliveryLocations>(requestObj);
  }

  /**
   * Get a specific contact for a specific customer
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-contacts-contactnumber
   * @param {number} customerNumber
   * @param {number} contactNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerContact(
    customerNumber: number,
    contactNumber: number
  ): Promise<HttpResponse<CustomerContact>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/contacts/${contactNumber}`,
    };

    return this._httpRequest<CustomerContact>(requestObj);
  }

  /**
   * Get a specific delivery location for a specific customer
   * @see https://restdocs.e-conomic.com/#get-customers-customernumber-delivery-locations-deliverylocationnumber
   * @param {number} customerNumber
   * @param {number} deliveryLocationNumber
   * @returns {Promise<HttpResponse>}
   */

  getCustomerDeliveryLocation(
    customerNumber: number,
    deliveryLocationNumber: number
  ): Promise<HttpResponse<CustomerDeliveryLocations>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/delivery-locations/${deliveryLocationNumber}`,
    };

    return this._httpRequest<CustomerDeliveryLocations>(requestObj);
  }

  getCustomerTemplate(
    customerNumber: number,
  ): Promise<HttpResponse<Templates>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/templates`,
    };

    return this._httpRequest<Templates>(requestObj);
  }

  getCustomerInvoiceTemplate(
    customerNumber: number,
  ): Promise<HttpResponse<CustomerInvoiceTemplate>> {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/templates/invoice`,
    };

    return this._httpRequest<CustomerInvoiceTemplate>(requestObj);
  }  

  getCustomerInvoiceLineTemplate(
    customerNumber: number,
    skipPages: number = 0,
    limit: number = 100
  ): Promise<
    HttpResponse<EconomicResponse<CustomerInvoiceLineTemplate[], Pagination, any>>
  > {
    const requestObj = {
      method: "get",
      url: `/customers/${customerNumber}/templates/invoiceline?skippages=${skipPages}&pagesize=${limit}`,
    };

    return this._httpRequest<
      EconomicResponse<CustomerInvoiceLineTemplate[], Pagination, any>
    >(requestObj);
  }
}
