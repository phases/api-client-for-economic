import { DepartmentalDistribution } from "./DepartmentalDistribution";
import { InvoiceEndpoints } from "./Invoices";
import { ProductGroup } from "./ProductGroups";
import {
  AuthToken,
  InvoiceResponse,
  Pagination,
} from "../../types/Economic.type";
import { HttpResponse } from "../../types/Http.type";
import RestApi from "../../modules/RestApi";

export type Product = {
  barCode: string;
  barred: boolean;
  costPrice: number;
  departmentalDistribution: DepartmentalDistribution;
  description: string;
  inventory: Inventory;
  invoices: Pick<InvoiceEndpoints, "booked" | "drafts">;
  lastUpdated: string;
  name: string;
  productGroup: ProductGroup;
  productNumber: string;
  recommendedPrice: number;
  salesPrice: number;
  unit: Unit;
  self: string;
};

type Unit = {
  name: string;
  self: string;
  unitNumber: number;
};

type Inventory = {
  available: number;
  grossWeight: number;
  inStock: number;
  inventoryLastUpdated: string;
  netWeight: number;
  orderedByCustomers: number;
  orderedFromSuppliers: number;
  packageVolume: number;
  recommendedCostPrice: number;
};

export type ProductInfo = Pick<Product, "productNumber" | "self">;

export type CreateProduct = {
  barCode: string;
  barred: boolean;
  costPrice: number;
  description: string;
  name: string;
  productGroup: { productGroupNumber: number };
  productNumber: string;
  recommendedPrice: number;
  salesPrice: number;
  unit: { unitNumber: number };
};

export type UpdateProduct = Partial<CreateProduct>;

export default class Products extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * Get collection of products.
   * @see https://restdocs.e-conomic.com/#get-products
   *
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<HttpResponse>}
   */
  get(
    skipPages: number = 0,
    limit: number = 100
  ): Promise<HttpResponse<InvoiceResponse<Product[], Pagination>>> {
    const requestObj = {
      method: "get",
      url: `/products?skippages=${skipPages}&pagesize=${limit}`,
    };
    return this._httpRequest<InvoiceResponse<Product[], Pagination>>(
      requestObj
    );
  }

  /**
   * Get a specific product.
   * @see https://restdocs.e-conomic.com/#get-products-productnumber
   * @param {string} productNumber
   * @returns {Promise<HttpResponse>}
   */
  getFor(productNumber: string): Promise<HttpResponse<Product>> {
    const requestObj = {
      method: "get",
      url: `/products/${productNumber}`,
    };
    return this._httpRequest<Product>(requestObj);
  }

  /**
   * Create a new product.
   * @see https://restdocs.e-conomic.com/#post-products
   * @param {CreateProduct} product
   * @returns {Promise<HttpResponse<Product>>}
   */
  createProduct(product: CreateProduct): Promise<HttpResponse<Product>> {
    const requestObj = {
      method: "post",
      url: `/products`,
      data: product,
    };
    return this._httpRequest<Product>(requestObj);
  }

  /**
   * Update an existing product.
   * @see https://restdocs.e-conomic.com/#put-products-productnumber
   * @param {number} productNumber
   * @param {UpdateProduct} product
   * @returns {Promise<HttpResponse<Product>>}
   */
  updateProduct(
    productNumber: number,
    product: UpdateProduct
  ): Promise<HttpResponse<Product>> {
    const requestObj = {
      method: "put",
      url: `/products/${productNumber}`,
      data: product,
    };
    return this._httpRequest<Product>(requestObj);
  }

  /**
   * Delete an existing product.
   * @see https://restdocs.e-conomic.com/#delete-products-productnumber
   * @param {number} productNumber
   * @returns {Promise<HttpResponse<void>>}
   */
  deleteProduct(productNumber: number): Promise<HttpResponse<void>> {
    const requestObj = {
      method: "delete",
      url: `/products/${productNumber}`,
    };
    return this._httpRequest<void>(requestObj);
  }
}
