import { headers } from 'next/headers';
import process from 'process';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  const header = headers();
  const adminAddressList = (process.env.ADMIN_ADDRESS || '::1;127.0.0.1').split(
    ';',
  );

  const connectAddress = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
    ',',
  )[0];

  if (!adminAddressList.includes(connectAddress)) {
    redirect('/');
  }

  return children;
}

export default AuthLayout;
