'use client';

import { useUser } from '@/lib/store/modules/useUser';
import { redirect } from 'next/navigation';

/**
 * already logged in redirect to route
 * @param route
 */
function authRedirect(route?: string): void {
  const { user } = useUser();

  if (user) {
    redirect(route || '/');
  }
}

export default authRedirect;
