export interface Paymentdetails {
  cartItems: CartItems[];
  createdAt: string;
  id: number;
  totalOrderPrice: number;
  paymentMethodType: string;
}
export interface CartItems {
  count: number;
  _id: string;
  product: Product;
  price: number;
}
export interface Product {
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  id: string;
}
