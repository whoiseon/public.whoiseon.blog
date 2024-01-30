import { headers } from 'next/headers';

async function Sign() {
  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  return <div>{ip}</div>;
}

export default Sign;
