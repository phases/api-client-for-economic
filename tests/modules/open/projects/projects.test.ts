import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import Projects from "../../../../src/modules/open/projects/Projects";
import OpenApi from "../../../../src/modules/OpenApi";

const secret_token = "string";
const grant_token = "string";

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
  return "api/";
}

function getVersion() {
  return "v22.0.0";
}

/**
 * Create project class instance
 * @returns
 */
function projectInstance(): Projects {
  return new Projects({
    secret_token,
    grant_token,
  });
}

describe("projects properties test", () => {
  const projects: Projects = projectInstance();

  it("should match properties", () => {
    expect(projects.headers["Content-Type"]).toBe("application/json");
    expect(projects.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(projects.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(projects instanceof Projects).toBeTruthy();
  });
});

describe("projects mock test", () => {
  const spy = jest.spyOn(OpenApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const projects: Projects = projectInstance();

  test("getAll request properties should match values", () => {
    projects.setVersion("v22.0.0").getAll();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(`${getUrlSegment()}${getVersion()}/projects`);
  });

  test("get request properties should match values", () => {
    projects.setVersion("v22.0.0").get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/projects/paged?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getFor request properties should match values", () => {
    projects.setVersion("v22.0.0").getFor(id);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/projects/${id}`
    );
  });
});
