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
