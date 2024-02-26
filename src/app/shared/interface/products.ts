export interface Products {
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage: number;
  description: string;
  category: Category;
}

interface Category {
  name: string;
}
