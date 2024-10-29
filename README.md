Here’s a comprehensive `README.md` file for your new package:

---

# E-conomic API Client for JavaScript/Node.js

An easy-to-use JavaScript/Node.js client for interacting with the E-conomic API. This library simplifies access to E-conomic’s features, enabling developers to manage accounts, invoices, and other financial data seamlessly.

## Features

- Full support for E-conomic’s RESTful API
- Supports operations for accounts, invoices, customers, and more
- Easy error handling and response parsing
- Compatible with modern JavaScript (ES6+) and Node.js environments

## Installation

Install via npm:

```bash
npm i @phasesdk/api-client-for-economic
```

## Getting Started

Here’s a basic example demonstrating how to authenticate using OAuth2 tokens and fetch a list of accounts:

```javascript
import { Economic } from "api-client-for-economic";

// Define your authentication tokens
const authToken = {
  grant_token: "your_grant_token",
  secret_token: "your_secret_token",
};

// Function to fetch a list of accounts with pagination support
async function fetchAccounts(offset, limit) {
  try {
    // Fetch accounts from E-conomic API
    const response = await Economic.api.accounts(authToken).get(offset, limit);

    console.log("Accounts fetched successfully:", response);
  } catch (error) {
    console.error("Error fetching accounts:", error.message);
  }
}

// Example usage
const offset = 0;
const limit = 20; // Number of accounts to retrieve

fetchAccounts(offset, limit);
```

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

### Reference

- Rest API documentation: https://restdocs.e-conomic.com/
- OpenAPI documentation: https://apis.e-conomic.com/
