export type AuthToken = {
  secret_token: string;
  grant_token: string;
};

export type Collection<T> = T;

export type Pagination = {
  skipPages: number;
  pageSize: number;
  maxPageSizeAllowed: number;
  results: number;
  resultsWithoutFilter: number;
  firstPage: string;
  lastPage: string;
};

export type MetaData<T> = T;

export type EconomicResponse<
  CollectionType = any,
  PaginationType = Pagination,
  MetaDataType = any
> = {
  collection: Collection<CollectionType>;
  pagination: PaginationType;
  metadata: MetaData<MetaDataType>;
  self: string;
};

export type InvoiceResponse<
  CollectionType = any,
  PaginationType = Pagination
> = {
  collection: Collection<CollectionType>;
  pagination: PaginationType;
  self: string;
};

export type OrderResponse<CollectionType = any, PaginationType = Pagination> = {
  collection: Collection<CollectionType>;
  pagination: PaginationType;
  self: string;
};

export type QuoteResponse<CollectionType = any, PaginationType = Pagination> = {
  collection: Collection<CollectionType>;
  pagination: PaginationType;
  self: string;
};

export type Items<T> = T;

export type ProjectResponse<ItemType = any> = {
  items: Items<ItemType>;
};

export type SubscriptionResponse<ItemType = any> = {
  items: Items<ItemType>;
  cursor: number;
};

export type EmployeeResponse<ItemType = any> = {
  items: Items<ItemType>;
};

export type EmployeeGroupResponse<ItemType = any> = {
  items: Items<ItemType>;
};
