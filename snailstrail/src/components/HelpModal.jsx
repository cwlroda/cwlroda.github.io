import { motion } from 'framer-motion';

export function HelpModal({ isOpen, onClose, onReplayTutorial }) {
  if (!isOpen) return null;

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
        className="help-modal"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="path-modal-close" onClick={onClose}>{'\u2715'}</button>

        <div className="help-modal-header">
          <div className="help-modal-icon">{'\u{1F40C}'}</div>
          <h2 className="help-modal-title">How to Play</h2>
        </div>

        <div className="help-modal-body">
          <section className="help-section">
            {onReplayTutorial && (
              <button type="button" className="btn btn--secondary" style={{ marginTop: '0.5rem', fontSize: '0.85rem', padding: '0.4em 1em', width: '100%' }} onClick={onReplayTutorial}>
                Replay Tutorial
              </button>
            )}
          </section>

          <section className="help-section">
            <h3>The Goal</h3>
            <p>Navigate from a <strong>starting</strong> Wikipedia article to a <strong>target</strong> article by clicking links within each page. You get <strong>10/15/20 hops</strong> depending on difficulty.</p>
          </section>

          <section className="help-section">
            <h3>Proximity Bar</h3>
            <p>The bar at the top shows how semantically close your current article is to the target. The snail moves right as you get warmer.</p>
          </section>

          <section className="help-section">
            <h3>Scoring</h3>
            <div className="help-detail">
              <span className="help-detail-label">Per hop</span>
              <span>Up to 60/80/100 pts (Easy/Medium/Hard) based on similarity to target</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">Hub penalty</span>
              <span>
                Super-connected articles (e.g. &quot;United States&quot;) score only 40%. In the article, hub links show{' '}
                <span
                  className="help-hub-indicator"
                  title="Well-trodden path — reduced score"
                >
                  {'\u{1F40C}'}{'\u26A0\uFE0F'}
                </span>
                {' '}after the link text.
              </span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">Win bonus</span>
              <span>Each unused hop earns increasing bonus: 28, 37, 46, 55... pts</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">Show more</span>
              <span>Free on Easy. Medium/Hard: escalating cost per section on same page (resets each hop)</span>
            </div>
          </section>

          <section className="help-section">
            <h3>Hop Ratings</h3>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F525}'} Great</span>
              <span>{'\u2265'}0.65</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{2600}\u{FE0F}'} Good</span>
              <span>{'\u2265'}0.40</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F4A8}'} OK</span>
              <span>{'\u2265'}0.20</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{2744}\u{FE0F}'} Weak</span>
              <span>{'\u2265'}0.07</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F9CA}'} Cold</span>
              <span>{'<'}0.07</span>
            </div>
          </section>

          <section className="help-section">
            <h3>Backtrack</h3>
            <p>
              Click a link to any article you already visited this run (marked with {'\u21A9'} in the text) and your trail snaps back to that point — score and hop count rewind to match. Sniff and Scout uses are not refunded.
            </p>
            <p>
              Tapping an earlier step in the sidebar only opens that page for reading (links are highlighted but not clickable). Use &quot;Back to current page&quot; to return — your path and score stay where they were.
            </p>
          </section>

          <section className="help-section">
            <h3>Hints</h3>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F443}'} Sniff</span>
              <span>Ranks visible links by similarity to the target. Costs 6{'\u201320'} pts.</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F50D}'} Scout</span>
              <span>Looks two hops ahead for shortcuts. Costs 15{'\u201350'} pts.</span>
            </div>
            <p className="help-hint-note">Harder difficulties give fewer hints and charge more.</p>
          </section>

          <section className="help-section">
            <h3>Difficulty</h3>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F331}'} Easy</span>
              <span>Nearby articles, 10 hops</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F33F}'} Medium</span>
              <span>Moderate distance, 15 hops &mdash; win Easy to unlock</span>
            </div>
            <div className="help-detail">
              <span className="help-detail-label">{'\u{1F332}'} Hard</span>
              <span>Far apart, 20 hops &mdash; win Medium to unlock</span>
            </div>
          </section>

          <section className="help-section">
            <h3>Daily Puzzle</h3>
            <p>Everyone gets the same puzzle each day per difficulty. Come back tomorrow for a fresh trail!</p>
          </section>

        </div>
      </motion.div>
    </motion.div>
  );
}
