import { AuthToken } from "../types/Economic.type";

//RestApi
import Accounts from "./rest/Accounts";
import Currency from "./rest/Currency";
import CustomerGroups from "./rest/CustomerGroups";
import Customers from "./rest/Customers";
import Departments from "./rest/Departments";
import Invoices from "./rest/Invoices";
import Journals from "./rest/Journals";
import Orders from "./rest/Orders";
import PaymentTerms from "./rest/PaymentTerms";
import Products from "./rest/Products";
import Quotes from "./rest/Quotes";
import Suppliers from "./rest/Suppliers";
import Units from "./rest/Units";
import VatAccounts from "./rest/VatAccounts";
import VatTypes from "./rest/VatTypes";
import VatZones from "./rest/Vatzone";

//OpenApi
import EmployeeGroups from "./open/employees/EmployeeGroups";
import Employees from "./open/employees/Employees";
import ProductGroups from "./open/products/productGroups";
import ProjectGroups from "./open/projects/ProjectGroups";
import Projects from "./open/projects/Projects";
import Subscriptions from "./open/subscriptions/Subscriptions";
import SupplierGroups from "./open/suppliers/SupplierGroups";
import Self from "./rest/Self";

export default {
  accounts: (props: AuthToken) => new Accounts(props),
  departments: (props: AuthToken) => new Departments(props),
  currency: (props: AuthToken) => new Currency(props),
  customers: (props: AuthToken) => new Customers(props),
  customerGroups: (props: AuthToken) => new CustomerGroups(props),
  invoices: (props: AuthToken) => new Invoices(props),
  units: (props: AuthToken) => new Units(props),
  orders: (props: AuthToken) => new Orders(props),
  quotes: (props: AuthToken) => new Quotes(props),
  paymenTerms: (props: AuthToken) => new PaymentTerms(props),
  products: (props: AuthToken) => new Products(props),
  productGroups: (props: AuthToken) => new ProductGroups(props),
  projects: (props: AuthToken) => new Projects(props),
  projectGroups: (props: AuthToken) => new ProjectGroups(props),
  subscriptions: (props: AuthToken) => new Subscriptions(props),
  self: (props: AuthToken) => new Self(props),
  suppliers: (props: AuthToken) => new Suppliers(props),
  employees: (props: AuthToken) => new Employees(props),
  employeeGroups: (props: AuthToken) => new EmployeeGroups(props),
  journals: (props: AuthToken) => new Journals(props),
  supplierGroups: (props: AuthToken) => new SupplierGroups(props),
  vatAccounts: (props: AuthToken) => new VatAccounts(props),
  vatTypes: (props: AuthToken) => new VatTypes(props),
  vatZones: (props: AuthToken) => new VatZones(props),
};
