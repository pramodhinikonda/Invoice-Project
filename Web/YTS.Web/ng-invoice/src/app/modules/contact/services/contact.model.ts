export interface IContact {
  contactID: string;
  organizationID: string;
  name: string;
  email: string;
  mobile: string;
}

export class Contact implements IContact {
  contactID: string;
  organizationID: string;
  name: string;
  email: string;
  mobile: string;
}

export interface ITransferObject {
  isNew: boolean;
  contact: IContact
}
