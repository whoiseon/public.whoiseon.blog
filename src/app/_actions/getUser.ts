'use server';

import { getServerSession } from 'next-auth';
import { User } from '@/lib/store/useUser';
import { authOptions } from '@/lib/auth';

async function getUser() {
  let user: User | null = null;

  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user) {
      user = {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      };
    }
  }

  return user;
}

export default getUser;
