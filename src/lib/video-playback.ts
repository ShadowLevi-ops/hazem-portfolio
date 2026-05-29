let activePreviewVideo: HTMLVideoElement | null = null;

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
  if (activePreviewVideo && activePreviewVideo !== video) {
    activePreviewVideo.pause();
  }

  activePreviewVideo = video;
  return attemptVideoPlay(video);
}

export function pausePreviewVideo(video: HTMLVideoElement) {
  video.pause();
  if (activePreviewVideo === video) {
    activePreviewVideo = null;
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
    const visiblePreview = document.querySelector<HTMLVideoElement>(
      'video[data-portfolio-preview="true"]:not([paused])'
    );
    const target =
      visiblePreview ??
      document.querySelector<HTMLVideoElement>(
        'video[data-portfolio-preview="true"]'
      );

    if (target) {
      void playPreviewVideo(target);
    }
  };

  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('click', unlock, { once: true });
}

export function getPreviewVideoSrc(mediaUrl: string, previewMediaUrl?: string) {
  if (previewMediaUrl) return previewMediaUrl;
  return mediaUrl.replace('/videos/', '/videos/previews/');
}
