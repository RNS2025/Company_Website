/**
 * Background video orchestrator — plays the background video natively.
 */
export function initScrollVideo() {
  const videoEl = document.getElementById('video-fallback');
  if (videoEl) {
    // Ensure video is playing
    videoEl.play().catch(() => {
      // Autoplay was prevented by browser, which is handled gracefully
    });
  }
  return () => {
    if (videoEl) {
      videoEl.pause();
    }
  };
}
