import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import Invoices, { InvoiceInfo } from "../../../src/modules/rest/Invoices";
import RestApi from "../../../src/modules/RestApi";

const secret_token = "string";
const grant_token = "string";
const offset = 0;
const limit = 100;
const draftInvoiceNumber = 1;
const bookedInvoiceNumber = 1;
const id = 1;

const mockResponseData = {
  data: {},
  headers: {},
  status: 200,
  statusText: "OK",
  request: {},
};

/**
 * Create invoice class instance
 * @returns
 */
function invoiceInstance(): Invoices {
  return new Invoices({
    secret_token,
    grant_token,
  });
}

describe("invoice properties test", () => {
  const invoices: Invoices = invoiceInstance();
  it("should match properties", () => {
    expect(invoices.headers["Content-Type"]).toBe("application/json");
    expect(invoices.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(invoices.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(invoices instanceof Invoices).toBeTruthy();
  });
});

describe("invoices mock test", () => {
  const spy = jest.spyOn(RestApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const invoices: Invoices = invoiceInstance();

  test("get request properties should match values", () => {
    invoices.get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/invoices`);
  });

  test("getDrafts request properties should match values", () => {
    invoices.getDrafts();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/drafts?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getDraft request properties should match values", () => {
    invoices.getDraft(draftInvoiceNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/invoices/drafts/${draftInvoiceNumber}`);
  });

  test("getAllBooked request properties should match values", () => {
    invoices.getAllBooked();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/booked?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getBooked request properties should match values", () => {
    invoices.getBooked(bookedInvoiceNumber);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/invoices/booked/${bookedInvoiceNumber}`);
  });

  test("getPaid request properties should match values", () => {
    invoices.getPaid();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/paid?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getUnpaid request properties should match values", () => {
    invoices.getUnpaid();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/unpaid?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getOverdue request properties should match values", () => {
    invoices.getOverdue();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/overdue?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getNotdue request properties should match values", () => {
    invoices.getNotdue();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/not-due?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getAllSent request properties should match values", () => {
    invoices.getAllSent();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `/invoices/sent?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getSent request properties should match values", () => {
    invoices.getSent(id);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`/invoices/sent/${id}`);
  });
});
