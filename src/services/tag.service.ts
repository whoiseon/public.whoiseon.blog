import db from '@/lib/db';
import { Tag } from '@prisma/client';

export class TagService {
  constructor() {}

  public async getTags() {
    const tags = await db.tag.findMany({
      where: {
        posts: {
          some: {
            isTemp: false,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    });

    try {
      return {
        error: '',
        payload: tags,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
