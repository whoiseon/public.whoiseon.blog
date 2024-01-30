'use server';

import { headers } from 'next/headers';
import process from 'process';

function getIsAdmin() {
  const header = headers();
  const adminAddressList = (process.env.ADMIN_ADDRESS || '::1;127.0.0.1').split(
    ';',
  );

  const connectAddress = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
    ',',
  )[0];

  return adminAddressList.includes(connectAddress);
}

export default getIsAdmin;
