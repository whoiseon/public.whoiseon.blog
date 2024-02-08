import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date: string): string {
  const d = new Date(date);
  const now = Date.now();
  const diff = now - d.getTime();

  if (diff < 1000 * 60 * 5) return '방금 전';

  if (diff < 1000 * 60 * 60 * 24) {
    const result = formatDistanceToNow(d, { addSuffix: true, locale: ko });
    // 약 2시간 전 -> 2시간 전
    return result.replace('약 ', '');
  }

  if (diff < 1000 * 60 * 60 * 36) {
    return '어제';
  }

  if (diff < 1000 * 60 * 60 * 24 * 7) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  return format(d, 'yyyy년 M월 d일');
}

export function detectIOS() {
  const checkAgent =
    /iphone|ipod|ipad/i.test(navigator.userAgent) && !(window as any).MSStream;

  const checkPlatform =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !(window as any).MSStream;

  return checkAgent || checkPlatform;
}

export function detectJSDOM() {
  if (typeof navigator === 'undefined') return false;
  return navigator.userAgent.includes('jsdom');
}

export function escapeForUrl(text: string): string {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      '',
    )
    .trim()
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
}

export function removeImageMarkdown(text: string): string {
  return text.replace(/!\[.*?]\(.*?\)/g, '');
}

export function safe<T>(callback: () => T) {
  try {
    return callback();
  } catch (e) {
    return null;
  }
}

export function getScrollTop() {
  if (!document.body) return 0;
  return document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
}

export function getScrollBottom() {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
}
