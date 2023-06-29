export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};
export type ProductState = {
  products: any[];
  isError: null | string;
  isLoading: boolean;
};
