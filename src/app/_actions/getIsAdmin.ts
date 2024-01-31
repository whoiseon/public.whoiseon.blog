'use server';

import { headers } from 'next/headers';
import process from 'process';
import getUserIp from '@/app/_actions/getUserIp';

function getIsAdmin() {
  const header = headers();
  const adminAddressList = (process.env.ADMIN_ADDRESS || '::1;127.0.0.1').split(
    ';',
  );

  const connectAddress = getUserIp(true);

  return {
    isAdmin: adminAddressList.includes(connectAddress),
    address: connectAddress,
  };
}

export default getIsAdmin;
