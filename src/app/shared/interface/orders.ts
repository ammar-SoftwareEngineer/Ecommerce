export interface Orders {
  paymentMethodType: string;
  totalOrderPrice: number;
  createdAt: string;
  _id: string;
  shippingAddress: Address;
}
interface Address {
  city: string;
  details: string;
  phone: number;
}
