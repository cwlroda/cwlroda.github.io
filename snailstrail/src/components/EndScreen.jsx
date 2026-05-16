import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import confetti from 'canvas-confetti';
import { generateShareText, hopSavedBonus } from '../utils/scoring.js';

const container = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
};

function AnimatedScore({ value }) {
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [value, motionVal]);

  return <span className="score-value">{display}</span>;
}

export function EndScreen({
  won, hops, score, maxHops, difficulty, startTitle, targetTitle,
  onBackToMenu, onRetry, onPlayNext, nextDifficulty, isAdmiring,
  sniffsUsed = 0, scoutsUsed = 0, onShowPath, onShowHelp, onShowHistory,
  onExplorePuzzle, isTutorial = false, onCompleteTutorial,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (won && !isAdmiring) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c8883a', '#7a9e5a', '#fce8c8', '#b87a28', '#f0e4d0'],
        });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [won, isAdmiring]);

  const shareText = generateShareText(difficulty, hops, score, won, startTitle, targetTitle, sniffsUsed, scoutsUsed);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextLabel = nextDifficulty
    ? `Play ${nextDifficulty.charAt(0).toUpperCase() + nextDifficulty.slice(1)}`
    : null;

  if (isTutorial) {
    return (
      <motion.div className="end-screen" variants={container} initial="initial" animate="animate">
        <motion.div variants={item} className="end-screen-header">
          <motion.div
            className="end-screen-icon"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.8 }}
          >
            {'\u{1F40C}\u{2728}'}
          </motion.div>
          <h2 className="end-screen-message">Tutorial Complete!</h2>
        </motion.div>

        <motion.div variants={item} className="end-screen-score">
          <span className="score-label">Score</span>
          <AnimatedScore value={score} />
        </motion.div>

        <motion.div variants={item} className="end-screen-stats">
          <div className="stat">
            <span className="stat-label">Hops</span>
            <span className="stat-value">{hops.length}</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="end-screen-tutorial-summary">
          <p>You're ready to help the snail find its trail!</p>
          <p className="end-screen-tutorial-hint">Replay the tutorial anytime from the Help page.</p>
        </motion.div>

        <motion.div variants={item}>
          <motion.button className="btn btn--primary" onClick={onCompleteTutorial} whileTap={{ scale: 0.97 }}>
            Start Playing
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="end-screen" variants={container} initial="initial" animate="animate">
      <motion.div variants={item} className="end-screen-header">
        <motion.div
          className="end-screen-icon"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          aria-label="Back to menu"
          onClick={onBackToMenu}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onBackToMenu?.(); }}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.8 }}
        >
          {won ? '\u{1F40C}\u{2728}' : '\u{1F40C}\u{1F4A8}'}
        </motion.div>
        <h2 className="end-screen-message">
          {won ? 'Trail complete!' : 'The trail went cold!'}
        </h2>
        <div className="end-screen-toolbar">
          {onShowHelp && <button className="help-btn" onClick={onShowHelp} aria-label="How to play">?<span className="btn-text">Help</span></button>}
          {onShowHistory && <button className="help-btn" onClick={onShowHistory} aria-label="Streaks & history">{'\u{1F525}'}<span className="btn-text">Streaks</span></button>}
        </div>
      </motion.div>

      <motion.div variants={item} className="end-screen-score">
        <span className="score-label">Score</span>
        <AnimatedScore value={score} />
      </motion.div>

      <motion.div variants={item} className="end-screen-stats">
        <div className="stat">
          <span className="stat-label">Hops</span>
          <span className="stat-value">{hops.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Difficulty</span>
          <span className="stat-value">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
        </div>
        {won && maxHops - hops.length > 0 && (
          <div className="stat stat--bonus">
            <span className="stat-label">Hops Saved Bonus</span>
            <span className="stat-value">+{hopSavedBonus(maxHops - hops.length)}</span>
          </div>
        )}
        {(sniffsUsed > 0 || scoutsUsed > 0) && (
          <div className="stat">
            <span className="stat-label">Hints</span>
            <span className="stat-value">
              {[
                sniffsUsed > 0 && `${sniffsUsed} sniff${sniffsUsed > 1 ? 's' : ''}`,
                scoutsUsed > 0 && `${scoutsUsed} scout${scoutsUsed > 1 ? 's' : ''}`,
              ].filter(Boolean).join(', ')}
            </span>
          </div>
        )}
        <div className="stat">
          <span className="stat-label">Path</span>
          <span className="stat-value">{startTitle} {'\u2192'} {targetTitle}</span>
        </div>
      </motion.div>

      <motion.div variants={item} className="end-screen-trail" onClick={onShowPath}>
        <div className="end-screen-trail-summary">
          <div className="end-screen-trail-info">
            <div className="end-screen-trail-path">{startTitle} {'\u2192'} {targetTitle}</div>
            <div className="end-screen-trail-hint">{hops.length} hops {'\u00B7'} Tap to see full path</div>
          </div>
          <div className="end-screen-trail-icon">{'\u{1F5FA}\uFE0F'}</div>
        </div>
      </motion.div>

      <motion.div variants={item} className="end-screen-actions">
        <motion.button className="btn btn--share" onClick={handleCopy} whileTap={{ scale: 0.97 }}>
          {copied ? 'Copied!' : 'Share Results'}
        </motion.button>
        {onExplorePuzzle && (
          <motion.button className="btn btn--explore" onClick={onExplorePuzzle} whileTap={{ scale: 0.97 }}>
            Explore puzzle
          </motion.button>
        )}
        {onPlayNext && (
          <motion.button className="btn btn--primary" onClick={onPlayNext} whileTap={{ scale: 0.97 }}>
            {nextLabel}
          </motion.button>
        )}
        {onRetry && (
          <motion.button className="btn btn--secondary" onClick={onRetry} whileTap={{ scale: 0.97 }}>
            Play Again
          </motion.button>
        )}
        {onBackToMenu && !onPlayNext && !onRetry && (
          <motion.button className="btn btn--secondary" onClick={onBackToMenu} whileTap={{ scale: 0.97 }}>
            Back to Menu
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
