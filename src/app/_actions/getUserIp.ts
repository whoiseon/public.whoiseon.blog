import { headers } from 'next/headers';

function getUserIp(isAdminCheck?: boolean): string {
  const header = headers();

  if (isAdminCheck) {
    return (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  }

  return header.get('x-forwarded-for') ?? 'unknown';
}

export default getUserIp;
