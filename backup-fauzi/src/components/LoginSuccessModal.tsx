import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';

type Props = {
  name: string;
  onClose?: () => void;
};

// Deterministic inline-style modal: appears, stays 2s, then smoothly moves up and fades out.
export default function LoginSuccessModal({ name, onClose }: Props) {
  // Shorter durations to avoid interrupting the user experience
  const visibleDelay = 1200; // show duration in ms (was 2000)
  const exitDuration = 300; // exit animation duration in ms (was 500)
  const [isClient, setIsClient] = useState(false);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = React.useRef<number | null>(null);
  const cleanupTimerRef = React.useRef<number | null>(null);

  // Mount client-only
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    // Start visible on next frame so CSS transition will run
    const raf = requestAnimationFrame(() => setVisible(true));

    // After visibleDelay, start exit by setting visible=false; then unmount after exitDuration
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      // schedule cleanup after exitDuration + small buffer
      cleanupTimerRef.current = window.setTimeout(() => {
        try { localStorage.removeItem('justLoggedIn'); } catch {}
        if (onClose) onClose();
      }, exitDuration + 40);
    }, visibleDelay);

    return () => {
      cancelAnimationFrame(raf);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
    };
  }, [onClose]);

  // manual dismiss handler (X button)
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // cancel auto hide timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    // start exit animation
    setVisible(false);
    // schedule cleanup similar to auto-hide
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
    }
    cleanupTimerRef.current = window.setTimeout(() => {
      try { localStorage.removeItem('justLoggedIn'); } catch {}
      if (onClose) onClose();
    }, exitDuration + 40);
  };

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: '2rem',
    left: '50%',
    zIndex: 9999,
    width: 'min(96%,640px)',
    transform: 'translateX(-50%)',
    pointerEvents: 'auto'
  };

  const transitionStyle: React.CSSProperties = {
    transition: `opacity ${exitDuration}ms ease, transform ${exitDuration}ms ease`,
    willChange: 'opacity, transform'
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0) translateX(-50%)'
  };

  const hiddenStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(-48px) translateX(-50%)'
  };

  const content = (
    <div style={{ ...baseStyle, ...transitionStyle, ...(visible ? visibleStyle : hiddenStyle) }}>
      <div className="relative mx-auto w-full max-w-2xl p-4 pointer-events-none">
        <div className="relative rounded-2xl bg-white shadow-lg border p-6 pointer-events-auto">
          {/* Close button */}
          <button onClick={handleCloseClick} aria-label="Close" className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="text-green-700" size={36} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Berhasil login!</h3>
              <p className="text-sm text-gray-600 mt-1">Halo <span className="font-medium">{name}</span>, kamu berhasil masuk.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;
  return createPortal(content, document.body);
}

