import { motion } from 'framer-motion';

export function TargetDefinitionModal({ isOpen, onClose, content, loading }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="target-definition-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="target-definition-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="target-definition-title"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="target-definition-modal-header">
          <h2 id="target-definition-title">Target Definition</h2>
          <button
            type="button"
            className="target-definition-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            {'\u2715'}
          </button>
        </div>

        <div className="target-definition-modal-body">
          {loading ? (
            <div className="definition-loading">
              <div className="loading-snail">{'\u{1F40C}'}</div>
              <p>snail is reading...</p>
            </div>
          ) : (
            <div
              className="definition-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
