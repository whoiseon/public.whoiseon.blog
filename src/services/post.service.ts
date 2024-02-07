import db from '@/lib/db';
import { Prisma } from '.prisma/client';
import PostCreateInput = Prisma.PostCreateInput;
import { TagService } from '@/services/tag.service';
import PostUpdateInput = Prisma.PostUpdateInput;
import PostInclude = Prisma.PostInclude;
import PostSelect = Prisma.PostSelect;

export class PostService {
  private readonly tagService: TagService = new TagService();

  constructor() {}

  public async postWrite(params: PostWriteParams) {
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
      return this.postUpdate(params);
    }

    const postDataField: PostCreateInput = {
      title,
      body,
      description,
      thumbnail,
      urlSlug,
      isTemp,
    };

    if (tags) {
      postDataField.tags = {
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

    const post = await db.post.create({
      data: postDataField,
    });

    return {
      error: '',
      payload: {
        postId: post.id,
      },
    };
  }

  public async postUpdate(params: PostWriteParams) {
    const { id, title, body, description, tags, urlSlug, thumbnail, isTemp } =
      params;

    const tempPostUpdateInput: PostUpdateInput = {
      title,
      body,
      description,
      thumbnail,
      urlSlug,
      isTemp,
      updatedAt: new Date(),
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

    const updatedPost = await db.post.update({
      where: {
        id,
      },
      data: tempPostUpdateInput,
    });

    return {
      error: '',
      payload: {
        postId: updatedPost.id,
      },
    };
  }

  public async postDelete(postId: number) {
    if (!postId) {
      return {
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      };
    }

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      error: '',
      payload: {
        postId,
      },
    };
  }

  public async getPostById(postId: number) {
    if (!postId) {
      return {
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      };
    }

    const postInclude: PostInclude = {
      tags: true,
    };

    const post = await db.post.findFirst({
      where: {
        id: postId,
      },
      include: postInclude,
    });

    if (!post) {
      return {
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      };
    }

    return {
      error: '',
      payload: post,
    };
  }

  public async getPostByIdWithSlug(urlSlug: string, postId: number) {
    const postInclude: PostInclude = {
      tags: true,
    };

    const post = await db.post.findFirst({
      where: {
        urlSlug,
      },
      include: postInclude,
    });

    if (!post) {
      return {
        error: '포스트를 찾을 수 없습니다.',
        payload: null,
      };
    }

    return {
      error: '',
      payload: post,
    };
  }

  public async getTempPosts() {
    try {
      const postSelect: PostSelect = {
        id: true,
        title: true,
        body: true,
        createdAt: true,
        updatedAt: true,
      };

      const posts = await db.post.findMany({
        where: {
          isTemp: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: postSelect,
      });

      return {
        error: '',
        payload: posts || [],
      };
    } catch (e) {
      console.error(e);
      return {
        error: e,
        payload: [],
      };
    }
  }
}

export interface PostWriteParams {
  id?: number;
  title: string;
  body: string;
  description: string;
  tags: string[];
  urlSlug: string;
  thumbnail?: string | null;
  isTemp: boolean;
}
