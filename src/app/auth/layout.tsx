import { redirect } from 'next/navigation';
import useIsAdmin from '@/lib/store/useIsAdmin';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  if (!useIsAdmin.getState().isAdmin) {
    redirect('/');
  }

  return children;
}

export default AuthLayout;
