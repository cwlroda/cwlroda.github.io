import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tutorial spotlight overlay — highlights a target element and shows
 * a callout tooltip with instructions.
 *
 * The backdrop is purely visual (pointer-events: none) so all clicks
 * pass through to the underlying UI. Only the callout is interactive.
 * The tutorial action handlers in App.jsx filter for the correct action.
 */
export function TutorialOverlay({ step, onSkip, onComplete, isLastStep }) {
  const [targetRect, setTargetRect] = useState(null);
  const rafRef = useRef(null);

  // Track target element position
  useEffect(() => {
    if (!step) return;

    const updateRect = () => {
      let el;
      el = document.querySelector(`[data-tutorial="${step.target}"]`);
      if (!el) {
        el = document.querySelector(`.${step.target}`);
      }
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      rafRef.current = requestAnimationFrame(updateRect);
    };

    const timer = setTimeout(() => {
      updateRect();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [step]);


  if (!step || !targetRect) return null;

  const padding = 8;
  const spotTop = targetRect.top - padding;
  const spotLeft = targetRect.left - padding;
  const spotWidth = targetRect.width + padding * 2;
  const spotHeight = targetRect.height + padding * 2;

  // Position callout below or above the spotlight
  const viewportHeight = window.innerHeight;
  const calloutBelow = spotTop + spotHeight + 16 < viewportHeight - 120;
  const calloutStyle = calloutBelow
    ? { top: spotTop + spotHeight + 12, left: Math.max(16, spotLeft), maxWidth: Math.min(320, window.innerWidth - 32) }
    : { bottom: viewportHeight - spotTop + 12, left: Math.max(16, spotLeft), maxWidth: Math.min(320, window.innerWidth - 32) };

  return (
    <div className="tutorial-overlay">
      {/* Dim backdrop with spotlight cutout — visual only, clicks pass through */}
      <div
        className="tutorial-backdrop"
        style={{
          boxShadow: `0 0 0 9999px rgba(58, 40, 16, 0.55)`,
          top: spotTop,
          left: spotLeft,
          width: spotWidth,
          height: spotHeight,
          borderRadius: 8,
        }}
      />

      {/* Spotlight border */}
      <div
        className="tutorial-spotlight"
        style={{
          top: spotTop,
          left: spotLeft,
          width: spotWidth,
          height: spotHeight,
        }}
      />

      {/* Callout — only interactive element */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          className="tutorial-callout"
          style={calloutStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <div className="tutorial-callout-title">{step.title}</div>
          <div className="tutorial-callout-text">{step.text}</div>
          <div className="tutorial-callout-actions">
            {!isLastStep && (
              <button type="button" className="tutorial-skip-btn" onClick={onSkip}>
                Skip Tutorial
              </button>
            )}
            {step.expectedAction === 'auto' && (
              <button type="button" className="tutorial-next-btn" onClick={onComplete}>
                {isLastStep ? 'Finish Tutorial' : 'Next'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
