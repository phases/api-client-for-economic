export type DeliveryLocation = {
  customerNumber: number;
  address: string | null;
  city: string | null;
  country: string | null;
  eInvoiceId: string | null;
  isBarred: boolean;
  lastUpdated: string;
  number: number;
  objectVersion: string | null;
  postalCode: string | null;
  termsOfDelivery: string | null;
  userInterfaceNumber: number;
};
