import { motion } from 'framer-motion';
import { SCORING_SIM_MIN, SCORING_SIM_MAX } from '../utils/scoring.js';

/**
 * Snail-themed proximity bar with spring-animated snail position.
 * Bar fill, warmth label, and percentage all use similarity normalized
 * to [0, 1] within the global scoring range.
 */
export function ProximityBar({ similarity, difficulty, targetTitle, currentHops, maxHops, onShowDefinition, definitionDisabled, totalScore }) {
  const norm = Math.max(0, Math.min(1, (similarity - SCORING_SIM_MIN) / (SCORING_SIM_MAX - SCORING_SIM_MIN)));
  const pct = norm * 100;
  const hue = Math.round(240 - pct * 2.4);

  const label =
    norm >= 0.65 ? 'Scorching!'
    : norm >= 0.40 ? 'Very warm'
    : norm >= 0.20 ? 'Warm'
    : norm >= 0.07 ? 'Cool'
    : 'Cold';

  return (
    <div className="proximity-bar" data-tutorial="proximity-bar">
      <div className="proximity-destination">
        <span className="proximity-destination-flag">{'\u{1F4CD}'}</span>
        <span className="proximity-title-group">
          <span className="proximity-destination-title">{targetTitle}</span>
          {onShowDefinition && (
            <button
              type="button"
              className="target-definition-btn"
              onClick={onShowDefinition}
              aria-label="Learn about target"
              title="See target definition"
              disabled={definitionDisabled}
            >
              ?
            </button>
          )}
        </span>
        {totalScore !== undefined && (
          <motion.span
            key={totalScore}
            className="proximity-score"
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          >
            {totalScore}
          </motion.span>
        )}
        {currentHops !== undefined && maxHops !== undefined && (
          <span className="proximity-hop-count">{currentHops}/{maxHops}</span>
        )}
      </div>
      <div className="proximity-header">
        <span className="proximity-label" style={{ color: `hsl(${hue}, 70%, 40%)` }}>
          {label}
        </span>
        <span className="proximity-pct" style={{ color: `hsl(${hue}, 70%, 40%)` }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div className="proximity-track">
        <motion.div
          className="proximity-trail"
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
          style={{
            background: `linear-gradient(90deg, hsl(240, 50%, 70%), hsl(${hue}, 70%, 55%))`,
          }}
        />
        <motion.div
          className="proximity-snail"
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 18, mass: 0.8 }}
        >
          {'\u{1F40C}'}
        </motion.div>
      </div>
    </div>
  );
}
