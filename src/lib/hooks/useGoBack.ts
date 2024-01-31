import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useGoBack() {
  const router = useRouter();
  return useCallback(() => {
    router.back();
  }, [router]);
}
