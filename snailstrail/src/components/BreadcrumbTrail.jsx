import { motion, AnimatePresence } from 'framer-motion';
import { normalizeTitle } from '../hooks/useWikipedia.js';
import { getHopEmoji, hopScore } from '../utils/scoring.js';

/**
 * Hop history with spring-animated new entries.
 * Clicking a past step opens a read-only view of that article (does not move the trail).
 * While previewing, the latest hop can be clicked to leave preview and return to the current page.
 * In exploreMode (post-game), every step including start and the final hop is clickable.
 */
export function BreadcrumbTrail({ hops, difficulty, startTitle, onViewPathNode, previewTitle, onExitPreview, exploreMode = false }) {
  const isLastHop = (i) => i === hops.length - 1;
  const previewOpen = previewTitle != null;
  const isPreviewing = (title) =>
    previewOpen && normalizeTitle(previewTitle) === normalizeTitle(title);

  const startClickable = onViewPathNode && (exploreMode || hops.length > 0);

  return (
    <div className="breadcrumb-trail">
      <div className="breadcrumb-start">
        <span
          className={`breadcrumb-stone breadcrumb-stone--start ${startClickable ? 'breadcrumb-stone--clickable' : ''} ${isPreviewing(startTitle) ? 'breadcrumb-stone--previewing' : ''}`}
          onClick={() => startClickable && onViewPathNode(startTitle)}
          title={startClickable ? 'View this step' : undefined}
        >
          {'\u{1F3E0}'} {startTitle}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {hops.map((hop, i) => {
          const emoji = getHopEmoji(hop.similarity, difficulty);
          const score = hopScore(hop.similarity, difficulty);
          const viewEarlier = onViewPathNode && !isLastHop(i);
          const returnToCurrent = isLastHop(i) && previewOpen && onExitPreview && !exploreMode;
          const clickable = exploreMode
            ? !!onViewPathNode
            : (viewEarlier || returnToCurrent);

          return (
            <motion.div
              key={`${hop.title}-${i}`}
              className="breadcrumb-hop"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="breadcrumb-connector" />
              <span
                className={`breadcrumb-stone ${clickable ? 'breadcrumb-stone--clickable' : ''} ${isPreviewing(hop.title) ? 'breadcrumb-stone--previewing' : ''}`}
                onClick={() => {
                  if (exploreMode && onViewPathNode) {
                    onViewPathNode(hop.title);
                    return;
                  }
                  if (returnToCurrent) onExitPreview();
                  else if (viewEarlier) onViewPathNode(hop.title);
                }}
                title={
                  exploreMode
                    ? 'View this step'
                    : returnToCurrent
                      ? 'Back to current page'
                      : viewEarlier
                        ? 'View this step'
                        : undefined
                }
              >
                <span className="breadcrumb-emoji">{emoji}</span>
                <span className="breadcrumb-title">{hop.title}</span>
                <span className="breadcrumb-score">+{score}</span>
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
