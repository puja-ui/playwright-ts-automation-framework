export type attributeType =
  'data-qa'
  | 'action'
  | 'value'
  | 'id'
  | 'class';

export type AddressDetails = {
  name: string
  address1: string
  cityStatePostcode: string
  country: string
  mobileNumber: string
}

export type CardDetails = {
  nameOnCard: string
  cardNumber: string
  CVC: string
  expirationMonth: string
  expirationYear: string
}