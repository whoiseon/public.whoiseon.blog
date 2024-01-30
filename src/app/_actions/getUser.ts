'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/lib/store/useUser';

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
