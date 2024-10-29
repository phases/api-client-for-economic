import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import Orders from "../../../src/modules/rest/Orders";
import RestApi from "../../../src/modules/RestApi";

const secret_token = "string";
const grant_token = "string";

const offset = 0;
const limit = 100;

const orderNumber = 1;

const mockResponseData = {
  data: {},
  headers: {},
  status: 200,
  statusText: "OK",
  request: {},
};

/**
 * Create order class instance
 * @returns
 */
function orderInstance(): Orders {
  return new Orders({
    secret_token,
    grant_token,
  });
}

describe("order properties test", () => {
  const orders: Orders = orderInstance();

  it("should match properties", () => {
    expect(orders.headers["Content-Type"]).toBe("application/json");
    expect(orders.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(orders.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(orders instanceof Orders).toBeTruthy();
  });
});

describe("orders mock test", () => {
  const spy = jest.spyOn(RestApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const orders: Orders = orderInstance();

  test("get request properties should match values", () => {
    orders.get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/orders`);
  });

  test("getDrafts request properties should match values", () => {
    orders.getDrafts();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/orders/drafts?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getDraft request properties should match values", () => {
    orders.getDraft(orderNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/orders/drafts/${orderNumber}`);
  });

  test("getAllSent request properties should match values", () => {
    orders.getAllSent();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/orders/sent?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getSent request properties should match values", () => {
    orders.getSent(orderNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/orders/sent/${orderNumber}`);
  });

  test("getAllArchived request properties should match values", () => {
    orders.getAllArchived();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/orders/archived?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getArchived request properties should match values", () => {
    orders.getArchived(orderNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/orders/archived/${orderNumber}`);
  });
});
