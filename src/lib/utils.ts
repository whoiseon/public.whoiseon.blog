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
