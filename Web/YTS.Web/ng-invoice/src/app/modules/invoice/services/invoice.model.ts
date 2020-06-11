import { inherits } from 'util';

export interface IInvoice {
  customerID: string;
  customerName: string;
  placeOfSupply: string;
  invoiceNumber: string;
  orderNumber: string;
  date: string;
  terms: string;
  dueDate: string;
  salesPerson: string;
  itemRateTax: string;
  subTotal: number;
  gst: number;
  shippingCharge: number;
  adjustment: number;
  roundOff: number;
  total: number;
  paymentOptions: Array<string>;
  customerNotes: string;
  termConditions: string;
  emails: Array<string>;
  items: Array<IInvoiceItem>;
}

export interface IInvoiceItem {
  itemID: string;
  name: string;
  description: string;
  type: string;
  hsn: number;
  quantity: number;
  unit: string;
  rate: number;
  discount: number;
  scale: string;
  tax: string;
  amount: number
}
