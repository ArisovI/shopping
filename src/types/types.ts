export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  favorites: boolean;
  count: number
};
export type ProductState = {
  products: ProductItem[];
  isError: null | string;
  isLoading: boolean;
};

export type CommentsItem = {
  id: number;
  title: string;
  body: string;
  reactions: number;
};

export type CommentState = {
  comments: CommentsItem[];
  isError: null | string;
  isLoading: boolean;
};

export type User = {
  id: number;
  avatar: string;
  name: string;
  password?: string;
  role?: string;
  creationAt?: string;
  updatedAt?: string;
  email: string;
};
