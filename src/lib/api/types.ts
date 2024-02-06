export interface ResponsePostWrite {
  error: string;
  payload: {
    postId: number;
  };
}

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
}
