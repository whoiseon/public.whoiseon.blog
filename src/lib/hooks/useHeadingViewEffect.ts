import useHeading from '@/lib/store/useHeading';
import { usePathname } from 'next/navigation';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

export function useHeadingViewEffect(id: string) {
  const { setHeadingId } = useHeading();
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    let observer: IntersectionObserver;

    setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHeadingId(id);
          }
        },
        {
          rootMargin: '0px 0px -80% 0px',
        },
      );

      const heading = document.getElementById(id);

      if (heading) {
        observer.observe(heading);
      }
    }, 0);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);
}
