import axios from "axios";
import RestHttpClient from "../../src/http/RestHttpClient";
import OpenHttpClient from "../../src/http/OpenHttpClient";
import { expect, jest, test } from "@jest/globals";
import { HttpRequest } from "../../src/types/Http.type";
import { SimpleObject } from "../../src/types/Basic.type";

jest.mock("axios", () => jest.fn());
const mockedAxios = axios as jest.Mocked<typeof axios>;

const REST_BASE_URL = "https://restapi.e-conomic.com";
const OPEN_BASE_URL = "https://apis.e-conomic.com";

test("RestHttpClient class function test for url", () => {
  let restClient = new RestHttpClient({ method: "get", url: "/", headers: {} });
  expect(restClient.getUrl()).toBe(REST_BASE_URL);
});

test("OpenHttpClient class function test  for url", () => {
  let openClient = new OpenHttpClient({ method: "get", url: "/", headers: {} });
  expect(openClient.getUrl()).toBe(OPEN_BASE_URL);
});

test("call() function test for REST", async () => {
  mockedAxios.mockResolvedValue({});

  let requestData: HttpRequest = {
    url: "/",
    method: "post",
    data: "",
    headers: {
      AppSecretToken: "app_secret_token",
      AgreementGrantToken: "agreement_grant_token",
    },
  };

  let request = await new RestHttpClient(requestData).call();
  let mockedRequestParameters = mockedAxios.mock
    .calls[0][0] as any as SimpleObject;

  expect(mockedRequestParameters.url).toBe(requestData.url);
  expect(mockedRequestParameters.method).toBe(requestData.method);
  expect(mockedRequestParameters.data).toBe(requestData.data);
  expect(mockedRequestParameters.headers).toBe(requestData.headers);
  expect(mockedRequestParameters.baseURL).toBe(REST_BASE_URL);
});
