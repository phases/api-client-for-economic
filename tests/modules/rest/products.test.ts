import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import Products from "../../../src/modules/rest/Products";
import RestApi from "../../../src/modules/RestApi";

const secret_token = "string";
const grant_token = "string";

const offset = 0;
const limit = 100;

const productNumber = "1";

const mockResponseData = {
  data: {},
  headers: {},
  status: 200,
  statusText: "OK",
  request: {},
};

/**
 * Create product class instance
 * @returns
 */
function productInstance(): Products {
  return new Products({
    secret_token,
    grant_token,
  });
}

describe("product properties test", () => {
  const products: Products = productInstance();

  it("should match properties", () => {
    expect(products.headers["Content-Type"]).toBe("application/json");
    expect(products.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(products.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(products instanceof Products).toBeTruthy();
  });
});

describe("products mock test", () => {
  const spy = jest.spyOn(RestApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const products: Products = productInstance();

  test("get request properties should match values", () => {
    products.get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/products?skippages=${offset}&pagesize=${limit}`);
  });

  test("getFor request properties should match values", () => {
    products.getFor(productNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/products/${productNumber}`);
  });
});
