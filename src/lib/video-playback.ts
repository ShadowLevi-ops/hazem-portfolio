export function prepareVideoElement(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
}

export async function attemptVideoPlay(video: HTMLVideoElement) {
  prepareVideoElement(video);

  try {
    await video.play();
    return true;
  } catch {
    return false;
  }
}

export function shouldPreferStaticMedia() {
  if (typeof window === 'undefined') return false;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return true;

  const effectiveType = connection?.effectiveType || '';
  return effectiveType.includes('2g');
}

export function isCoarsePointerDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

let touchUnlockAttached = false;

export function attachTouchVideoUnlock() {
  if (typeof window === 'undefined' || touchUnlockAttached) return;

  touchUnlockAttached = true;

  const unlock = () => {
    document.querySelectorAll('video').forEach(video => {
      void attemptVideoPlay(video);
    });
  };

  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('click', unlock, { once: true });
}
