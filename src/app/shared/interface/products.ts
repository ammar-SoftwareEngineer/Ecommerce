export interface Products {
  _id: string;
  imageCover: string;
  images: [];
  title: string;
  price: number;
  ratingsAverage: number;
  description: string;
  category: Category;
}

interface Category {
  name: string;
}
