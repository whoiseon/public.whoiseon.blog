import { useCallback, useEffect, useRef } from 'react';
import { getScrollBottom, getScrollTop } from '@/lib/utils';

interface Params {
  cursor?: number | null;
  onLoadMore: (cursor: number) => any;
}

export function useScrollPagination({ cursor, onLoadMore }: Params) {
  const last = useRef<string | number | null>(null);

  const preventBottomStick = useCallback(() => {
    if (getScrollBottom() === 0) {
      window.scrollTo(0, getScrollTop() - 1);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!cursor || !onLoadMore) return;
    if (cursor === last.current) return;
    last.current = cursor;
    await onLoadMore(cursor);
    preventBottomStick();
  }, [cursor, onLoadMore, preventBottomStick]);

  const onScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < window.screen.height - 500) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
