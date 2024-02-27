export interface Products {
  _id: string;
  name: string;
  imageCover: string;
  images: [];
  title: string;
  price: number;
  ratingsAverage: number;
  description: string;
  image: [];
  category: Category;
}

interface Category {
  name: string;
}
