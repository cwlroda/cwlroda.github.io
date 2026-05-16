import { useState } from 'react';
import { motion } from 'framer-motion';
import { normalizeTitle } from '../hooks/useWikipedia.js';
import { getHopEmoji, hopScore } from '../utils/scoring.js';
import { getGameDateStr } from '../utils/seed.js';

export function PathModal({ isOpen, onClose, hops, difficulty, startTitle, targetTitle, totalScore, maxHops, currentHopIndex, exploreMode, onHopClick, won }) {
  if (!isOpen) return null;

  const hopsLeft = maxHops - hops.length;
  const normalizedTarget = normalizeTitle(targetTitle);
  const isWon = won === true;

  const [trailCopied, setTrailCopied] = useState(false);

  const generateTrailText = () => {
    const dateStr = getGameDateStr();
    const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    const parts = [`\u{1F3E0} ${startTitle}`];
    for (let i = 0; i < hops.length; i++) {
      const hop = hops[i];
      const isLast = i === hops.length - 1;
      const emoji = isLast && isWon ? '\u{1F40C}' : getHopEmoji(hop.similarity, difficulty);
      parts.push(`${emoji} ${hop.title}`);
    }

    return [
      `\u{1F40C} snail's trail \u2014 ${dateStr}`,
      `${diffLabel}: ${startTitle} \u2192 ${targetTitle}`,
      parts.join(' \u2192 '),
      `Score: ${totalScore}`,
    ].join('\n');
  };

  const handleCopyTrail = async () => {
    const text = generateTrailText();
    try {
      await navigator.clipboard.writeText(text);
      setTrailCopied(true);
      setTimeout(() => setTrailCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setTrailCopied(true);
      setTimeout(() => setTrailCopied(false), 2000);
    }
  };

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
        className="path-modal"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="path-modal-close" onClick={onClose}>{'\u2715'}</button>

        <div className="path-modal-header">
          <div className="path-modal-title">Your Trail</div>
          <div className="path-modal-subtitle">{startTitle} {'\u2192'} {targetTitle}</div>
        </div>

        <div className="path-modal-footer">
          <div>
            <div className="path-modal-stat-value" style={{ color: 'var(--accent-amber)' }}>{totalScore}</div>
            <div className="path-modal-stat-label">Score</div>
          </div>
          {currentHopIndex !== null && (
            <div>
              <div className="path-modal-stat-value" style={{ color: 'var(--text-primary)' }}>{hopsLeft}</div>
              <div className="path-modal-stat-label">Hops Left</div>
            </div>
          )}
          <button type="button" className="path-modal-copy-btn" onClick={handleCopyTrail}>
            {trailCopied ? '\u2713 Copied' : 'Copy Trail'}
          </button>
        </div>

        <div className="path-modal-trail">
          <div
            className={`path-modal-start${onHopClick ? ' path-modal-hop--clickable' : ''}`}
            onClick={() => {
              if (onHopClick) {
                onHopClick(startTitle);
                if (exploreMode) {
                  onClose();
                }
              }
            }}
          >
            {'\u{1F3E0}'} {startTitle}
          </div>

          {hops.map((hop, i) => {
            const isLastHop = i === hops.length - 1;
            const isTarget = isLastHop && isWon;
            const emoji = isTarget ? '\u{1F40C}' : getHopEmoji(hop.similarity, difficulty);
            const score = hopScore(hop.similarity, difficulty);
            const isCurrent = currentHopIndex !== null && i === currentHopIndex;

            return (
              <div key={`${hop.title}-${i}`}>
                <div className={`path-modal-connector${i === 0 ? ' path-modal-connector--start' : ''}`} />
                <div
                  className={`path-modal-hop${isCurrent ? ' path-modal-hop--current' : ''}${onHopClick ? ' path-modal-hop--clickable' : ''}`}
                  onClick={() => {
                    if (onHopClick) {
                      onHopClick(hop.title);
                      if (exploreMode) {
                        onClose();
                      }
                    }
                  }}
                >
                  <span className="path-modal-hop-emoji">{emoji}</span>
                  <div className="path-modal-hop-info">
                    <div className="path-modal-hop-title">{hop.title}</div>
                    <div className={`path-modal-hop-detail${isCurrent ? ' path-modal-hop-detail--current' : ''}`}>
                      Hop {i + 1} {'\u00B7'} Similarity: {hop.similarity.toFixed(2)}
                      {isCurrent && ` ${'\u2014'} You are here`}
                    </div>
                  </div>
                  <div className="path-modal-hop-score">+{score}</div>
                </div>
              </div>
            );
          })}

          {currentHopIndex !== null && !isWon && (
            <>
              <div className="path-modal-connector path-modal-connector--dashed" />
              <div className="path-modal-target">
                {'\u{1F40C}'} {targetTitle}
              </div>
            </>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
}
