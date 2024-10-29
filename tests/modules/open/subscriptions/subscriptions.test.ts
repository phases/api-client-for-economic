import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import Subscriptions from "../../../../src/modules/open/subscriptions/Subscriptions";
import OpenApi from "../../../../src/modules/OpenApi";

const secret_token = "string";
const grant_token = "string";

const cursorValue = 234;
const offset = 0;
const limit = 100;

const id = 1;

const mockResponseData = {
  data: {},
  headers: {},
  status: 200,
  statusText: "OK",
  request: {},
};

function getUrlSegment() {
  return "subscriptionsapi/";
}

function getVersion() {
  return "v5.0.1";
}

/**
 * Create subscriptions class instance
 * @returns
 */
function subscriptionInstance(): Subscriptions {
  return new Subscriptions({
    secret_token,
    grant_token,
  });
}

describe("subscriptions properties test", () => {
  const subscriptions: Subscriptions = subscriptionInstance();

  it("should match properties", () => {
    expect(subscriptions.headers["Content-Type"]).toBe("application/json");
    expect(subscriptions.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(subscriptions.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(subscriptions instanceof Subscriptions).toBeTruthy();
  });
});

describe("subscriptions mock test", () => {
  const spy = jest.spyOn(OpenApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const subscriptions: Subscriptions = subscriptionInstance();

  test("getAll request properties should match values", () => {
    subscriptions.setVersion("v5.0.1").getAll(cursorValue);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/subscriptions?cursor=${cursorValue}`
    );
  });

  test("get request properties should match values", () => {
    subscriptions.setVersion("v5.0.1").get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/subscriptions/paged?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getFor request properties should match values", () => {
    subscriptions.setVersion("v5.0.1").getFor(id);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/subscriptions/${id}`
    );
  });
});
