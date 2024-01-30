import { redirect } from 'next/navigation';
import getIsAdmin from '@/app/_actions/getIsAdmin';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  if (!getIsAdmin()) {
    redirect('/');
  }

  return children;
}

export default AuthLayout;
