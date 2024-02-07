import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useGoBack(url?: string) {
  const router = useRouter();
  return useCallback(() => {
    if (url) router.push(url);
    router.back();
  }, [router]);
}
