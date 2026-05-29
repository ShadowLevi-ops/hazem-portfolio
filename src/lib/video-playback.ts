export function prepareVideoElement(video: HTMLVideoElement) {
  video.muted = true;
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

export async function playPreviewVideo(video: HTMLVideoElement) {
  return attemptVideoPlay(video);
}

export function pausePreviewVideo(video: HTMLVideoElement) {
  video.pause();
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

function isPreviewInViewport(video: HTMLVideoElement) {
  const rect = video.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

let touchUnlockAttached = false;

export function attachTouchVideoUnlock() {
  if (typeof window === 'undefined' || touchUnlockAttached) return;

  touchUnlockAttached = true;

  const unlock = () => {
    document
      .querySelectorAll<HTMLVideoElement>(
        'video[data-portfolio-preview="true"]'
      )
      .forEach(video => {
        if (isPreviewInViewport(video)) {
          void attemptVideoPlay(video);
        }
      });
  };

  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('click', unlock, { once: true });
}

export function getPreviewVideoSrc(mediaUrl: string, previewMediaUrl?: string) {
  if (previewMediaUrl) return previewMediaUrl;
  return mediaUrl.replace('/videos/', '/videos/previews/');
}
