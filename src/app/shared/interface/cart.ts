export interface Cart {
  count: number;
  price: number;
  totalCartPrice: number;
  products: [];
  product: Product;
}
interface Product {
  title: string;
  imageCover: string;
  _id: string;
}
