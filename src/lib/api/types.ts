import { Post } from '@prisma/client';

export interface ResponsePostWrite {
  error: string;
  payload: {
    postId: number;
  };
}

export interface ResponsePost {
  error: string;
  payload: Post;
}

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
}
