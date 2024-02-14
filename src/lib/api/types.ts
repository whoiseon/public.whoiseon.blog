export interface Tag {
  id?: number;
  name?: string;
  createdAt?: string;
}

export interface Post {
  id?: number;
  title?: string;
  body?: string;
  urlSlug?: string;
  description?: string;
  thumbnail?: string;
  isTemp?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags?: Tag[];
  prevPost?: Post;
  nextPost?: Post;
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
