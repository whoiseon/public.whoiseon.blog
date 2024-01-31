import getUserIp from '@/app/_actions/getUserIp';
import db from '@/lib/db';
import { User as PrismaUser } from '@prisma/client';
import { User } from 'next-auth';

export class AuthService {
  constructor() {}

  public async findUser(email: string): Promise<PrismaUser | undefined | null> {
    try {
      return await db.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async createSignInLog(user: User): Promise<void> {
    let userIp = getUserIp();

    if (userIp === '::1') {
      userIp = '127.0.0.1';
    }

    const findUser = await this.findUser(user?.email as string);

    if (findUser) {
      try {
        await db.signInLog.create({
          data: {
            email: user?.email as string,
            name: user?.name as string,
            caution: false,
            ip: userIp,
          },
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      await db.signInLog.create({
        data: {
          email: user?.email as string,
          name: user?.name as string,
          caution: true,
          ip: userIp,
        },
      });
    }

    await db.$disconnect();
  }
}
