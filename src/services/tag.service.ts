import db from '@/lib/db';
import { Tag } from '@prisma/client';

export class TagService {
  constructor() {}

  public async getTags() {
    try {
      return await db.tag.findMany();
    } catch (e) {
      console.log(e);
    }
  }
}
