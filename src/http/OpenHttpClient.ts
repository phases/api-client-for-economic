import HttpClient from "./HttpClient";

class OpenHttpClient extends HttpClient {
  getUrl(): string {
    return "https://apis.e-conomic.com";
  }
}

export default OpenHttpClient;
