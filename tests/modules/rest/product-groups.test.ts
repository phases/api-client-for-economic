import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import ProductGroups from "../../../src/modules/rest/ProductGroups";
import RestApi from "../../../src/modules/RestApi";

const secret_token = "string";
const grant_token = "string";

const offset = 0;
const limit = 100;

const productGroupNumber = 1;

const mockResponseData = {
  data: {},
  headers: {},
  status: 200,
  statusText: "OK",
  request: {},
};

/**
 * Create product-group class instance
 * @returns
 */
function productGroupInstance(): ProductGroups {
  return new ProductGroups({
    secret_token,
    grant_token,
  });
}

describe("productGroup properties test", () => {
  const productGroups: ProductGroups = productGroupInstance();

  it("should match properties", () => {
    expect(productGroups.headers["Content-Type"]).toBe("application/json");
    expect(productGroups.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(productGroups.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(productGroups instanceof ProductGroups).toBeTruthy();
  });
});

describe("productGroup mock test", () => {
  const spy = jest.spyOn(RestApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const productGroups: ProductGroups = productGroupInstance();

  test("get request properties should match values", () => {
    productGroups.get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/product-groups?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getFor request properties should match values", () => {
    productGroups.getFor(productGroupNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/product-groups/${productGroupNumber}`);
  });
});
