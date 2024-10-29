import { jest, it, test, describe, expect, beforeEach } from "@jest/globals";
import ProjectGroups from "../../../../src/modules/open/projects/ProjectGroups";
import OpenApi from "../../../../src/modules/OpenApi";

const secret_token = "string";
const grant_token = "string";

const offset = 0;
const limit = 100;

const cursorValue = 234;
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
 * Create project group class instance
 * @returns
 */
function projecGrouptInstance(): ProjectGroups {
  return new ProjectGroups({
    secret_token,
    grant_token,
  });
}

describe("project groups properties test", () => {
  const projectsGroups: ProjectGroups = projecGrouptInstance();

  it("should match properties", () => {
    expect(projectsGroups.headers["Content-Type"]).toBe("application/json");
    expect(projectsGroups.headers["X-AppSecretToken"]).toBe(secret_token);
    expect(projectsGroups.headers["X-AgreementGrantToken"]).toBe(grant_token);
    expect(projectsGroups instanceof ProjectGroups).toBeTruthy();
  });
});

describe("project groups mock test", () => {
  const spy = jest.spyOn(OpenApi.prototype as any, "_httpRequest");
  spy.mockResolvedValue(mockResponseData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const projectsGroups: ProjectGroups = projecGrouptInstance();

  test("getAll request properties should match values", () => {
    projectsGroups.setVersion("v22.0.0").getAll(cursorValue);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/projectgroups?cursor=${cursorValue}`
    );
  });

  test("get request properties should match values", () => {
    projectsGroups.setVersion("v22.0.0").get();
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/projectgroups/paged?skippages=${offset}&pagesize=${limit}`
    );
  });

  test("getFor request properties should match values", () => {
    projectsGroups.setVersion("v22.0.0").getFor(id);
    const request: any = spy.mock.calls[0][0];
    expect(spy).toHaveBeenCalled();
    expect(request.method).toBe("get");
    expect(request.url).toBe(
      `${getUrlSegment()}${getVersion()}/projectgroups/${id}`
    );
  });
});
