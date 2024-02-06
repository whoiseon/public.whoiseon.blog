export interface Tag {
  id: number;
  name: string;
  createdAt: string;
}

export interface Post {
  id?: number;
  title?: string;
  content?: string;
  urlSlug?: string;
  isTemp?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: Tag[];
}

export interface ResponsePostWrite {
  error: string;
  payload: {
    postId: number;
  };
}

export interface ResponsePosts {
  error: string;
  payload: Post[];
}
