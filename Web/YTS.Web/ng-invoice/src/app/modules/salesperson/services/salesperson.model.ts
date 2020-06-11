export interface ISalesPerson {
  salespersonID: string;
  organizationID: string;
  name: string;
  mobile: string;
}

export class SalesPerson implements ISalesPerson {
  salespersonID: string;
  organizationID: string;
  name: string;
  mobile: string;
}

export interface ITransferObject {
  isNew: boolean;
  salesperson: ISalesPerson
}
