import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import Customers, { Customer } from "../../../src/modules/rest/Customers";
import RestApi from "../../../src/modules/RestApi";

const secret_token = "string";
const grant_token = "string";
const customerNumber = 1;

const mockResponseData = {
  data: {},
  headers: {},
  status: 200,
  statusText: "OK",
  request: {},
};

/**
 * Create customer class instance
 * @returns
 */
function customerInstance(): Customers {
  return new Customers({
    secret_token,
    grant_token,
  });
}

describe("customer properties test", () => {
  const customers: Customers = customerInstance();
  it("should match properties", () => {
    expect(customers.headers["Content-Type"]).toBe("application/json");
    expect(customers.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(customers.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(customers instanceof Customers).toBeTruthy();
  });
});

describe("customer mock test", () => {
  const spy = jest.spyOn(RestApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const customers: Customers = customerInstance();

  test("getFor request properties should match values", () => {
    customers.getFor(customerNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/customers/${customerNumber}`);
  });

  test("getAll  request properties should match values", () => {
    customers.get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/customers?skippages=0&pagesize=100`);
  });

  test("getCustomerTotals  request properties should match values", () => {
    customers.getCustomerTotals(customerNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/customers/${customerNumber}/totals`);
  });
});
