import { AppRoles } from "./AppRoles";
import { AgreementType } from "./AppSettings";
import { HttpResponse } from "../../types/Http.type";
import { AuthToken } from "../../types/Economic.type";
import RestApi from "../../modules/RestApi";

export type SelfType = {
  agreementNumber: number;
  agreementType: AgreementType;
  application: Application;
  bankInformation: BankInformation;
  canSendElectronicInvoice: boolean;
  company: Company;
  companyAffiliation: string;
  modules: Modules[];
  self: string;
  settings: OtherSettings;
  signupDate: string;
  user: User;
};

export type Application = {
  appNumber: number;
  appPublicToken: string;
  created: string;
  name: string;
  requiredRoles: AppRoles;
  self: string;
};

export type BankInformation = {
  bankAccountNumber: string;
  bankGiroNumber: string;
  bankName: string;
  bankSortCode: string;
  pbsCustomerGroupNumber: string;
  pbsFiSupplierNumber: string;
};

export type Company = {
  addressLine1: string;
  addressLine2: string;
  attention: string;
  city: string;
  companyIdentificationNumber: string;
  country: string;
  email: string;
  name: string;
  phoneNumber: string;
  vatNumber: string;
  website: string;
  zip: string;
};

export type Modules = {
  moduleNumber: number;
  name: string;
  self: string;
};

export type OtherSettings = {
  baseCurrency: string;
  defaultPaymentTerm: string;
  internationalLedger: string;
};

export type User = {
  agreementNumber: number;
  email: string;
  language: Language;
  loginId: string;
  name: string;
  userName: string;
};

export type Language = {
  culture: string;
  languageNumber: number;
  name: string;
  self: string;
};

export type UpdateSelfType = Partial<SelfType>;
export type UpdateUserType = Partial<User>;
export type UpdateCompanyType = Partial<Company>;
export type UpdateBankInformationType = Partial<BankInformation>;

export default class Self extends RestApi {
  /**
   * @constructor
   */
  constructor(props: AuthToken) {
    super(props);
  }

  /**
   * This endpoint provides you with information about your settings.
   * @see https://restdocs.e-conomic.com/#get-self
   * @returns {Promise<HttpResponse<SelfType>>}
   */
  get(): Promise<HttpResponse<SelfType>> {
    const requestObj = {
      method: "get",
      url: `/self`,
    };
    return this._httpRequest<SelfType>(requestObj);
  }

  /**
   * This endpoint allows you to update user settings.
   * @see https://restdocs.e-conomic.com/#put-self-user
   * @param {UpdateUserType} updateData
   * @returns {Promise<HttpResponse<User>>}
   */
  updateUser(updateData: UpdateUserType): Promise<HttpResponse<User>> {
    const requestObj = {
      method: "put",
      url: `/self/user`,
      data: updateData,
    };
    return this._httpRequest<User>(requestObj);
  }

  /**
   * This endpoint allows you to update company settings.
   * @see https://restdocs.e-conomic.com/#put-self-company
   * @param {UpdateCompanyType} updateData
   * @returns {Promise<HttpResponse<Company>>}
   */
  updateCompany(updateData: UpdateCompanyType): Promise<HttpResponse<Company>> {
    const requestObj = {
      method: "put",
      url: `/self/company`,
      data: updateData,
    };
    return this._httpRequest<Company>(requestObj);
  }

  /**
   * This endpoint allows you to update bank information.
   * @see https://restdocs.e-conomic.com/#put-self-company-bankinformation
   * @param {UpdateBankInformationType} updateData
   * @returns {Promise<HttpResponse<BankInformation>>}
   */
  updateBankInformation(
    updateData: UpdateBankInformationType
  ): Promise<HttpResponse<BankInformation>> {
    const requestObj = {
      method: "put",
      url: `/self/company/bankinformation`,
      data: updateData,
    };
    return this._httpRequest<BankInformation>(requestObj);
  }
}
