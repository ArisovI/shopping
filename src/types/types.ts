export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
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
