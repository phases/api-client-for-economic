import HttpClient from "./HttpClient";

class RestHttpClient extends HttpClient {
  getUrl(): string {
    return "https://restapi.e-conomic.com";
  }
}

export default RestHttpClient;
