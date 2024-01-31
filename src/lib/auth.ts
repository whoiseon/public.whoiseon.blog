import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AuthService } from '@/services/auth.service';

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const authService = new AuthService();

      const findUser = await authService.findUser(user?.email as string);
      await authService.createSignInLog(user);

      return !!findUser;
    },
  },
  cookies: {
    sessionToken: {
      name: 'imslow.session_token',
      options: {
        httpOnly: true,
        sameSite: '',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: 'imslow.callback_url',
      options: {
        sameSite: '',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: 'imslow.csrf_token',
      options: {
        sameSite: '',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
};

export type AuthErrors = 'AccessDenied' | 'undefined';

export const authErrors: Record<AuthErrors, string> = {
  AccessDenied: '잘못된 계정 정보입니다.',
  undefined: '알 수 없는 오류가 발생했습니다.',
};
