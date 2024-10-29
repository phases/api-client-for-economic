import RestApi from "../../modules/RestApi";
import {
    AuthToken,
    EconomicResponse,
    Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";

// Enums for entry types to improve type safety
export enum EntryType {
    FinanceVoucher = 'financeVoucher',
    SupplierInvoice = 'supplierInvoice',
    SupplierPayment = 'supplierPayment',
    CustomerPayment = 'customerPayment',
    ManualCustomerInvoice = 'manualCustomerInvoice'
}

// Base type for accounts
export type ContraAccountInfo = {
    accountNumber: number;
    self: string;
};

// Type for voucher numbers
export type VoucherNumbers = {
    maximumVoucherNumber: number;
    minimumVoucherNumber: number;
};

// Settings containing contra accounts and entry type restrictions
export type Settings = {
    contraAccounts: {
        customerPayments: ContraAccountInfo;
        financeVouchers: ContraAccountInfo;
        supplierPayments: ContraAccountInfo;
    };
    entryTypeRestrictedTo: EntryType; 
    voucherNumbers: VoucherNumbers;
};

// Templates for various types of documents
export type Templates = {
    financeVoucher: string;
    manualCustomerInvoice: string;
    self: string;
};

// Journal structure for financial records
export type Journal = {
    entries: Entries; 
    journalNumber: number;
    metaData: Record<string, unknown>; 
    name: string;
    pagination: Record<string, unknown>; 
    self: string;
    settings: Settings; 
    templates: Templates; 
    vouchers: string;
};

// Journal number structure
export type JournalNumber = {
    entries: Entries; 
    journalNumber: number;
    name: string;
    self: string;
    settings: Settings;  
    templates: Templates;
    vouchers: string;
};

// Accounting year details
export type AccountingYear = {
    self: string;
    year: string;
};

// Contra account representation
export type ContraAccount = {
    accountNumber: number;
    self: string;
};

// VAT account information
export type ContraVatAccount = {
    self: string;
    vatCode: string;
};

// Currency details
export type Currency = {
    code: string;
    self: string;
};

// Customer information
export type Customer = {
    customerNumber: number;
    self: string;
};

// Departmental distribution details
export type DepartmentalDistribution = {
    departmentalDistributionNumber: number;
    distributionType: string;
    self: string;
};

// Employee information
export type Employee = {
    employeeNumber: number;
    self: string;
};

// Voucher entry representation
export type VoucherEntry = {
    self: string;
    voucherNumber: number;
};

// Base structure for financial transactions
export type BaseTransaction = {
    amount: number;
    amountBaseCurrency: number;
    contraAccount?: ContraAccount;
    contraVatAccount?: ContraVatAccount;
    contraVatAmount: number;
    contraVatAmountInBaseCurrency: number;
    currency: Currency;
    departmentalDistribution?: DepartmentalDistribution;
    employee?: Employee;
    entryType: EntryType;
    exchangeRate: number;
    journal: Journal;
    remainder: number;
    remainderInDefaultCurrency: number;
    text: string;
    voucher: VoucherEntry;
};

// Specific transaction types
export type CustomerPayment = BaseTransaction & {
    customer?: Customer;
    customerInvoice: number;
    date: string;
    entryType: EntryType.CustomerPayment; // Use enum for entry type
};

export type FinanceVoucher = BaseTransaction & {
    account: ContraAccount;
    date: string;
    entryType: EntryType.FinanceVoucher; // Use enum for entry type
};

export type ManualCustomerInvoice = BaseTransaction & {
    customer?: Customer;
    customerInvoice: number;
    date: string;
    dueDate: string;
    entryType: EntryType.ManualCustomerInvoice; // Use enum for entry type
};

export type Supplier = {
    supplierNumber: number;
    self: string;
};

export type SupplierInvoice = BaseTransaction & {
    date: string;
    dueDate: string;
    entryType: EntryType.SupplierInvoice; // Use enum for entry type
};

export type SupplierPayment = BaseTransaction & {
    supplier?: Supplier;
    supplierInvoiceNumber: string;
    date: string;
    entryType: EntryType.SupplierPayment; // Use enum for entry type
};

// Consolidated entries structure
export type Entries = {
    customerPayments: CustomerPayment[];
    financeVouchers: FinanceVoucher[];
    manualCustomerInvoices: ManualCustomerInvoice[];
    supplierInvoices: SupplierInvoice[];
    supplierPayments: SupplierPayment[];
};

// Voucher representation containing accounting year and entries
export type Voucher = {
    accountingYear: AccountingYear;
    entries: Entries;
    journal: Journal;
    voucherNumber: number;
    self: string;
};

export type VoucherNumber = {
    accountingYear: AccountingYear; 
    attachment: string;  
    entries: Entries; 
};

export type CreateVoucher = {
    accountingYear: AccountingYear;
    entries: Entries;
    journal: Journal;
    voucherNumber: number;
};

export type Attachment = {
    self: string;        // Required property
    createdAt: string;  
    description: string; 
    file: string;       
    pages: number;      
};

export type Account = {
    accountNumber?: number; 
    self: string;
};  

export type PaymentDetails = {
    paymentType: {
      paymentTypeNumber?: number; 
      self: string;
    };
};
  
export type JournalEntries = {
    account: Account;
    contraAccount: ContraAccount;
    contraVatAccount: ContraVatAccount;
    currency: Currency;
    customer: Customer;
    employee: Employee;
    journal: Journal;
    paymentDetails: PaymentDetails;
    supplier: Supplier;
    voucher: Voucher;
    self: string;
    // Optional fields for filtering/sorting
    amount?: number;
    amountDefaultCurrency?: number;
    contraVatAmount?: number;
    date?: string;
    entryType?: EntryType; 
    exchangeRate?: number;
    journalEntryNumber?: number;
    text?: string;
};
  
export type EntryNumber = {
    account: Account;
    contraAccount: ContraAccount;
    contraVatAccount: ContraVatAccount;
    currency: Currency;
    customer: Customer;
    employee: Employee;
    journal: Journal;
    paymentDetails: PaymentDetails;
    supplier: Supplier;
    voucher: Voucher;
    self: string; // Required
    // Optional fields for filtering/sorting
    amount?: number;
    amountDefaultCurrency?: number;
    contraVatAmount?: number;
    date?: string;
    entryType?: string; // Enum in actual use case
    exchangeRate?: number;
    journalEntryNumber?: number;
    text?: string;
};
  
export type JournalTemplate = {
    financeVoucher?: string;          
    manualCustomerInvoice?: string;   
    self: string;                     
};
  
export type FinanceVoucherTemplate = {
    account?: string;        
    contraAccount?: string;  
    self: string;            
};
  
export type ManualCustomerInvoiceTemplate = {
    customer: Customer;
    metaData?: object;         
    pagination?: object;       
    self: string;              
};

export default class Journals extends RestApi {
    /**
     * @constructor
     */
    constructor(props: AuthToken) {
      super(props);
    }
    
    /**
       * Root for the journal endpoint. 
       *
       * @see https://restdocs.e-conomic.com/#get-journals
       * @returns {Promise<HttpResponse>}
       *
       */
    getJournals(
        offset: number = 0,
        limit: number = 100
        ): Promise<HttpResponse<EconomicResponse<Journal[], Pagination, any>>> {
        const requestObj = {
            method: "get",
            url: `/journals?skippages=${offset}&pagesize=${limit}`,
        };
        return this._httpRequest<EconomicResponse<Journal[], Pagination, any>>(
            requestObj
        );
    }

    /**
       * Root for the journal endpoint. 
       *
       * @see https://restdocs.e-conomic.com/#get-journals-journalnumber
       *
       */
    getJournalNumber(journalNumber: number): Promise<HttpResponse<JournalNumber>> {
        const requestObj = {
          method: "get",
          url: `/journals/${journalNumber}`,
        };
    
        return this._httpRequest<JournalNumber>(requestObj);
    }

   /**
       * Root for the voucher endpoint. 
       * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-vouchers
       * @returns {Promise<HttpResponse>}
       *
       */
    getVouchers(
        journalNumber: number,
        skipPages: number = 0,
        limit: number = 100
    ): Promise<HttpResponse<EconomicResponse<Voucher[], Pagination, any>>> {
        const requestObj = {
            method: "get",
            url: `/journals/${journalNumber}/vouchers?skippages=${skipPages}&pagesize=${limit}`,
        };
        return this._httpRequest<EconomicResponse<Voucher[], Pagination, any>>(
            requestObj
        );
    }

  /**
   * Create vouchers
   * @see https://restdocs.e-conomic.com/#post-journals-journalnumber-vouchers
   * @returns {Promise<HttpResponse<CreateVoucher>>}
   */
    createVoucher(
        journalNumber: number,
        voucher: CreateVoucher
    ): Promise<HttpResponse<CreateVoucher>> {
        const requestObj = {
        method: "post",
        url: `/journals/${journalNumber}/vouchers`,
        data: voucher,
        };

        return this._httpRequest<CreateVoucher>(requestObj);
    }

    /**
   * Get voucher number
   * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-vouchers-accountingyear-vouchernumber
   * @returns {Promise<HttpResponse<VoucherNumber>>}
   */
    getVoucherNumber(
        journalNumber: number,
        voucherNumber: number
      ): Promise<HttpResponse<VoucherNumber>> {
        const requestObj = {
          method: "get",
          url: `/journals/${journalNumber}/vouchers/${voucherNumber}`,
        };
    
        return this._httpRequest<VoucherNumber>(requestObj);
    }

    /**
     * Get number of pages available on the document.
     * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-vouchers-accountingyear-vouchernumber-attachment
     * @returns {Promise<HttpResponse<Attachment>>}
     */
    getAttachment(
        journalNumber: number,
        voucherNumber: number
    ): Promise<HttpResponse<Attachment>> {
        const requestObj = {
        method: "get",
        url: `/journals/${journalNumber}/vouchers/${voucherNumber}/attachment`,
        };

        return this._httpRequest<Attachment>(requestObj);
    }
   
     /**
     * Get the file attachment for the given voucher
     * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-vouchers-accountingyear-vouchernumber-attachment-file
     * @returns {Promise<HttpResponse<any>>}
     */
    getAttachedFile(
        journalNumber: number,
        voucherNumber: number
    ): Promise<HttpResponse<any>> {
        const requestObj = {
        method: "get",
        url: `/journals/${journalNumber}/vouchers/${voucherNumber}/attachment/file`,
        };

        return this._httpRequest<any>(requestObj);
    }

    /**
     * Attaching a document to the voucher
     * @see https://restdocs.e-conomic.com/#post-journals-journalnumber-vouchers-accountingyear-vouchernumber-attachment-file
     * @returns {Promise<HttpResponse<any>>}
     */
    attachFile(
        journalNumber: number,
        voucherNumber: number
    ): Promise<HttpResponse<any>> {
        const requestObj = {
        method: "post",
        url: `/journals/${journalNumber}/vouchers/${voucherNumber}/attachment/file`,
        };

        return this._httpRequest<any>(requestObj);
    }

    /**
     * Attach more pages to the file, that is associated with the voucher.
     * @see https://restdocs.e-conomic.com/#patch-journals-journalnumber-vouchers-accountingyear-vouchernumber-attachment-file
     * @returns {Promise<HttpResponse<any>>}
     */
    attachFiles(
        journalNumber: number,
        voucherNumber: number
    ): Promise<HttpResponse<any>> {
        const requestObj = {
        method: "patch",
        url: `/journals/${journalNumber}/vouchers/${voucherNumber}/attachment/file`,
        };

        return this._httpRequest<any>(requestObj);
    }

    /**
       *  Returns a collection of all entries in the journal 
       * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-entries
       * @returns {Promise<HttpResponse>}
       *
       */
    getEntries(
        journalNumber: number,
        skipPages: number = 0,
        limit: number = 100
    ): Promise<HttpResponse<EconomicResponse<JournalEntries[], Pagination, any>>> {
        const requestObj = {
            method: "get",
            url: `/journals/${journalNumber}/entries?skippages=${skipPages}&pagesize=${limit}`,
        };
        return this._httpRequest<EconomicResponse<JournalEntries[], Pagination, any>>(
            requestObj
        );
    }

     /**
   * Get entry number
   * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-entries-entrynumber
   * @returns {Promise<HttpResponse<EntryNumber>>}
   */
    getEntryNumber(
        journalNumber: number,
        entryNumber: number
      ): Promise<HttpResponse<EntryNumber>> {
        const requestObj = {
          method: "get",
          url: `/journals/${journalNumber}/entries/${entryNumber}`,
        };
    
        return this._httpRequest<EntryNumber>(requestObj);
    }

    /**
   * Returns the templates available for journal entries.
   * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-templates
   * @returns {Promise<HttpResponse<JournalTemplate>>}
   */
    getJournalTemplate(
        journalNumber: number,
      ): Promise<HttpResponse<JournalTemplate>> {
        const requestObj = {
          method: "get",
          url: `/journals/${journalNumber}/templates`,
        };
    
        return this._httpRequest<JournalTemplate>(requestObj);
    }

    /**
     * Returns a template that sets the boilerplate for a finance voucher entry
     * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-templates-financevoucher
     * @returns {Promise<HttpResponse<FinanceVoucherTemplate>>}
     */
    getFinanceVoucherTemplate(
        journalNumber: number,
    ): Promise<HttpResponse<FinanceVoucherTemplate>> {
        const requestObj = {
        method: "get",
        url: `/journals/${journalNumber}/templates/financeVoucher`,
        };

        return this._httpRequest<FinanceVoucherTemplate>(requestObj);
    }

    /**
     * Returns a template that sets the boilerplate for a manual customer invoice
     * @see https://restdocs.e-conomic.com/#get-journals-journalnumber-templates-financevoucher
     * @returns {Promise<HttpResponse<ManualCustomerInvoiceTemplate[]>>}
     */
    getManualCustomerInvoiceTemplates(
        journalNumber: number,
        skipPages: number = 0,
        limit: number = 100
    ): Promise<HttpResponse<EconomicResponse<ManualCustomerInvoiceTemplate[], Pagination, any>>> {
        const requestObj = {
            method: "get",
            url: `/journals/${journalNumber}/templates/manualCustomerInvoice?skippages=${skipPages}&pagesize=${limit}`,
        };
        return this._httpRequest<EconomicResponse<ManualCustomerInvoiceTemplate[], Pagination, any>>(
            requestObj
        );
    }
}
