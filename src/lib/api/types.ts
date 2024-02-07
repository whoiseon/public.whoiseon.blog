export interface Tag {
  id: number;
  name: string;
  createdAt: string;
}

export interface Post {
  id?: number;
  title?: string;
  body?: string;
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

export interface ResponsePost {
  error: string;
  payload: Post;
}
