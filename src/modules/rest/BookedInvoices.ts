interface PaymentTerms {
  paymentTermsNumber: number;
  daysOfCredit: number;
  description: string;
  name: string;
  paymentTermsType: string;
  self: string;
}

interface Customer {
  customerNumber: number;
  self: string;
}

interface VatZone {
  name: string;
  vatZoneNumber: number;
  enabledForCustomer: boolean;
  enabledForSupplier: boolean;
  self: string;
}

interface Recipient {
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  vatZone: VatZone;
}

interface Layout {
  layoutNumber: number;
  self: string;
}

interface Pdf {
  download: string;
}

interface Product {
  productNumber: string;
  self: string;
}

interface Unit {
  unitNumber: number;
  name: string;
  products: string;
  self: string;
}

interface Line {
  lineNumber: number;
  sortKey: number;
  description: string;
  quantity: number;
  unitNetPrice: number;
  discountPercentage: number;
  unitCostPrice: number;
  vatRate: number;
  vatAmount: number;
  totalNetAmount: number;
  product: Product;
  unit: Unit;
}

export interface IBookedInvoice {
  bookedInvoiceNumber: number;
  orderNumber: number;
  date: string;
  currency: string;
  exchangeRate: number;
  netAmount: number;
  netAmountInBaseCurrency: number;
  grossAmount: number;
  grossAmountInBaseCurrency: number;
  vatAmount: number;
  roundingAmount: number;
  remainder: number;
  remainderInBaseCurrency: number;
  dueDate: string;
  paymentTerms: PaymentTerms;
  customer: Customer;
  recipient: Recipient;
  layout: Layout;
  pdf: Pdf;
  lines?: Line[];
  sent: string;
  self: string;
}
