import { motion } from 'framer-motion';
import { getGameDate } from '../utils/seed.js';

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const DIFF_ICONS = { easy: '\u{1F331}', medium: '\u{1F33F}', hard: '\u{1F332}' };
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getLast7Days() {
  const today = getGameDate();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    days.push({
      key,
      dayName: DAY_NAMES[d.getUTCDay()],
      dayNum: d.getUTCDate(),
      isToday: i === 0,
    });
  }
  return days;
}

function computeStreak(history) {
  const today = getGameDate();
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    const day = history[key];
    if (day && Object.values(day).some((r) => r.won)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

function computeTotalWins(history) {
  let wins = 0;
  for (const day of Object.values(history)) {
    for (const r of Object.values(day)) {
      if (r.won) wins++;
    }
  }
  return wins;
}

function computeBestScore(history) {
  let best = 0;
  for (const day of Object.values(history)) {
    for (const r of Object.values(day)) {
      if (r.score > best) best = r.score;
    }
  }
  return best;
}

export function HistoryModal({ isOpen, onClose, history }) {
  if (!isOpen) return null;

  const days = getLast7Days();
  const streak = computeStreak(history);
  const totalWins = computeTotalWins(history);
  const bestScore = computeBestScore(history);

  return (
    <motion.div
      className="path-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="history-modal"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="path-modal-close" onClick={onClose}>{'\u2715'}</button>

        <div className="history-modal-header">
          <div className="history-modal-icon">{'\u{1F525}'}</div>
          <h2 className="history-modal-title">Streaks & History</h2>
        </div>

        <div className="history-stats">
          <div className="history-stat">
            <div className="history-stat-value">{streak}</div>
            <div className="history-stat-label">Day streak</div>
          </div>
          <div className="history-stat">
            <div className="history-stat-value">{totalWins}</div>
            <div className="history-stat-label">Total wins</div>
          </div>
          <div className="history-stat">
            <div className="history-stat-value">{bestScore || '\u2014'}</div>
            <div className="history-stat-label">Best score</div>
          </div>
        </div>

        <div className="history-grid">
          <div className="history-grid-header">
            <div className="history-grid-corner"></div>
            {days.map((day) => (
              <div key={day.key} className={`history-grid-day ${day.isToday ? 'history-grid-day--today' : ''}`}>
                <span className="history-grid-dayname">{day.dayName}</span>
                <span className="history-grid-daynum">{day.dayNum}</span>
              </div>
            ))}
          </div>
          {DIFFICULTIES.map((diff) => (
            <div key={diff} className="history-grid-row">
              <div className="history-grid-label">{DIFF_ICONS[diff]}</div>
              {days.map((day) => {
                const result = history[day.key]?.[diff];
                let cellClass = 'history-cell';
                let content = '';
                if (result) {
                  if (result.won) {
                    cellClass += ' history-cell--won';
                    content = '\u2713';
                  } else {
                    cellClass += ' history-cell--lost';
                    content = '\u00B7';
                  }
                } else {
                  cellClass += ' history-cell--empty';
                }
                if (day.isToday) cellClass += ' history-cell--today';

                return (
                  <div key={day.key} className={cellClass} title={result ? `${result.score} pts` : ''}>
                    {content}
                    {result && <span className="history-cell-score">{result.score}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {streak >= 3 && (
          <div className="history-streak-msg">
            {streak >= 7 ? '\u{1F40C}\u{1F451} Perfect week!' : `\u{1F40C}\u{1F525} ${streak}-day streak! Keep it going!`}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
