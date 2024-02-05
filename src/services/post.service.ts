import db from '@/lib/db';
import { Prisma } from '.prisma/client';
import PostCreateInput = Prisma.PostCreateInput;
import { TagService } from '@/services/tag.service';
import PostUpdateInput = Prisma.PostUpdateInput;
import PostInclude = Prisma.PostInclude;
import { Post } from '@prisma/client';
import PostWhereInput = Prisma.PostWhereInput;

export class PostService {
  private readonly tagService: TagService = new TagService();

  constructor() {}

  public async postWrite(params: PostWriteParams) {
    const { title, body, description, tags, urlSlug, thumbnail, isTemp } =
      params;

    if (isTemp) {
      return await this.postTempSave(params);
    }

    console.log({
      title,
      body,
      description,
      tags,
      urlSlug,
      thumbnail,
      isTemp,
    });

    return {
      error: '',
      payload: {
        postId: null,
      },
    };
  }

  public async postTempSave(params: PostWriteParams) {
    const { id, title, body, description, tags, urlSlug, thumbnail, isTemp } =
      params;

    if (!title) {
      return {
        error: '제목을 입력해주세요.',
        payload: {
          postId: null,
        },
      };
    }

    if (id) {
      return this.postTempUpdate(params);
    }

    const tempPostDataField: PostCreateInput = {
      title,
      body: body || '',
      description: description || '',
      thumbnail: thumbnail || '',
      urlSlug: urlSlug || '',
      isTemp: true,
    };

    if (tags) {
      tempPostDataField.tags = {
        connectOrCreate: tags.map((tag) => {
          return {
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          };
        }),
      };
    }

    const tempPost = await db.post.create({
      data: tempPostDataField,
    });

    return {
      error: '',
      payload: {
        postId: tempPost.id,
      },
    };
  }

  public async postTempUpdate(params: PostWriteParams) {
    const { id, title, body, description, tags, urlSlug, thumbnail, isTemp } =
      params;

    const tempPostUpdateInput: PostUpdateInput = {
      title,
      body: body || '',
      description: description || '',
      thumbnail: thumbnail || '',
      urlSlug: urlSlug || '',
      isTemp: true,
    };

    if (tags) {
      tempPostUpdateInput.tags = {
        connectOrCreate: tags.map((tag) => {
          return {
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          };
        }),
      };
    }

    const tempPost = await db.post.update({
      where: {
        id,
      },
      data: tempPostUpdateInput,
    });

    return {
      error: '',
      payload: {
        postId: tempPost.id,
      },
    };
  }

  public async getPost(postId: number) {
    const postInclude: PostInclude = {
      tags: true,
    };

    return db.post.findFirst({
      where: {
        id: postId,
      },
      include: postInclude,
    });
  }

  public async getPostWithSlug(urlSlug: string, postId: number) {
    const postInclude: PostInclude = {
      tags: true,
    };

    return db.post.findFirst({
      where: {
        urlSlug,
      },
      include: postInclude,
    });
  }
}

export interface PostWriteParams {
  id?: number;
  title: string;
  body: string;
  description: string;
  tags: string[];
  urlSlug: string;
  thumbnail?: string;
  isTemp: boolean;
}
