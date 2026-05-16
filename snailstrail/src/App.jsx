import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmbedder } from './hooks/useEmbedder.js';
import { useWikipedia, normalizeTitle } from './hooks/useWikipedia.js';
import { useDailyPuzzle } from './hooks/useDailyPuzzle.js';
import { ArticleSection } from './components/ArticleSection.jsx';
import { ProximityBar } from './components/ProximityBar.jsx';
import { BreadcrumbTrail } from './components/BreadcrumbTrail.jsx';
import { EndScreen } from './components/EndScreen.jsx';
import { PathModal } from './components/PathModal.jsx';
import { HelpModal } from './components/HelpModal.jsx';
import { TargetDefinitionModal } from './components/TargetDefinitionModal.jsx';
import { TUTORIAL_ARTICLES, TUTORIAL_PATH, TUTORIAL_TARGET, TUTORIAL_SIMILARITIES, TUTORIAL_STEPS } from './data/tutorial-articles.js';
import { TutorialOverlay } from './components/TutorialOverlay.jsx';
import { hopScore, hubMultiplier, hopSavedBonus, SHOW_MORE_PENALTIES, SNIFF_BUDGETS, SNIFF_PENALTIES, SCOUT_BUDGETS, SCOUT_PENALTIES } from './utils/scoring.js';
import { getGameDateStr } from './utils/seed.js';
import { extractFirstParagraphWithLinks } from './utils/extractParagraph.js';
import { HistoryModal } from './components/HistoryModal.jsx';
import vitalCategories from './data/vital-categories.json';

const MAX_HOPS = { easy: 10, medium: 15, hard: 20 };
const SECTIONS = { easy: 3, medium: 2, hard: 4 };
const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
};

function getNextDifficulty(current) {
  const idx = DIFFICULTY_ORDER.indexOf(current);
  return idx < DIFFICULTY_ORDER.length - 1 ? DIFFICULTY_ORDER[idx + 1] : null;
}

function incompleteDifficultyFooter(result) {
  if (result) return `Incomplete, best score ${result.score}`;
  return 'Incomplete';
}

function completedDifficultyFooter(result) {
  if (result?.score != null) return `Completed — Best ${result.score}`;
  return 'Completed';
}

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('snailstrail_progress') || '{}');
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem('snailstrail_progress', JSON.stringify(progress));
  } catch {
    // Ignore
  }
}

function getDailyResults() {
  try {
    const data = JSON.parse(localStorage.getItem('snailstrail_daily') || '{}');
    if (data.date === getGameDateStr()) {
      return data.results || {};
    }
    return {};
  } catch {
    return {};
  }
}

/** Prefer win over loss; for same outcome keep the higher score (best incomplete attempt). */
function mergeDailyDifficultyResult(existing, incoming) {
  if (!existing) return incoming;
  if (incoming.won !== existing.won) {
    return incoming.won ? incoming : existing;
  }
  return incoming.score > existing.score ? incoming : existing;
}

function saveDailyResult(difficulty, result) {
  const dateKey = getGameDateStr();
  let data;
  try {
    data = JSON.parse(localStorage.getItem('snailstrail_daily') || '{}');
  } catch {
    data = {};
  }
  if (data.date !== dateKey) {
    data = { date: dateKey, results: {} };
  }
  if (!data.results) data.results = {};
  const existing = data.results[difficulty];
  data.results[difficulty] = mergeDailyDifficultyResult(existing, result);
  try {
    localStorage.setItem('snailstrail_daily', JSON.stringify(data));
  } catch {}

  // Also persist to 7-day history
  saveToHistory(dateKey, data.results);

  return data.results;
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('snailstrail_history') || '{}');
  } catch {
    return {};
  }
}

function saveToHistory(dateKey, results) {
  const history = getHistory();
  history[dateKey] = {};
  for (const diff of DIFFICULTY_ORDER) {
    if (results[diff]) {
      history[dateKey][diff] = {
        won: results[diff].won,
        score: results[diff].score,
        hops: results[diff].hops?.length ?? 0,
      };
    }
  }
  // Prune to last 30 days (keep extra buffer beyond the 7 displayed)
  const dates = Object.keys(history).sort();
  while (dates.length > 30) {
    delete history[dates.shift()];
  }
  try {
    localStorage.setItem('snailstrail_history', JSON.stringify(history));
  } catch {}
}

const SESSION_VERSION = 1;

function isValidInProgressSession(s) {
  if (!s || s.version !== SESSION_VERSION) return false;
  if (s.date !== getGameDateStr()) return false;
  if (!s.puzzle?.start || !s.puzzle?.target || !s.currentArticleTitle || !s.difficulty) {
    return false;
  }
  if (typeof s.totalScore !== 'number' || !Array.isArray(s.hops)) return false;
  const maxHops = MAX_HOPS[s.difficulty];
  if (s.hops.length >= maxHops) return false;
  return true;
}

function menuFooterForDifficulty(diff, dailyResult, storedSession) {
  if (storedSession?.difficulty === diff) {
    const current = storedSession.totalScore;
    const priorBest = dailyResult?.score ?? 0;
    const best = Math.max(priorBest, current);
    if (dailyResult != null) {
      return `In progress — Current ${current} | Best ${best}`;
    }
    return `In progress — Current ${current}`;
  }
  return incompleteDifficultyFooter(dailyResult);
}

function getInProgressSession() {
  try {
    const raw = localStorage.getItem('snailstrail_session');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== SESSION_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

function saveInProgressSession(payload) {
  try {
    localStorage.setItem(
      'snailstrail_session',
      JSON.stringify({ version: SESSION_VERSION, ...payload })
    );
  } catch {
    // Ignore quota / private mode
  }
}

function clearInProgressSession() {
  try {
    localStorage.removeItem('snailstrail_session');
  } catch {
    // Ignore
  }
}

/** Look up categories for an article — precomputed vital or from fetched article object. */
function getCategoriesForTitle(title, articleObj) {
  if (vitalCategories[title]) return vitalCategories[title];
  if (articleObj?.categories) return articleObj.categories;
  return [];
}

export default function App() {
  // Game state: 'loading' | 'menu' | 'generating' | 'playing' | 'ended'
  const [gameState, setGameState] = useState('loading');
  const [difficulty, setDifficulty] = useState(null);
  const [puzzle, setPuzzle] = useState(null);        // { start, target }
  const [currentArticle, setCurrentArticle] = useState(null); // { title, html, links }
  const [hops, setHops] = useState([]);              // [{ title, similarity }]
  const [currentSimilarity, setCurrentSimilarity] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [won, setWon] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const [progress, setProgress] = useState(getProgress);
  const [dailyResults, setDailyResults] = useState(getDailyResults);
  const [admiring, setAdmiring] = useState(false);
  const [sniffsUsed, setSniffsUsed] = useState(0);
  const [scoutsUsed, setScoutsUsed] = useState(0);
  const [hintedLinks, setHintedLinks] = useState([]);  // [{ title, type: 'sniffed'|'scouted'|'direct' }]
  const [hintLoading, setHintLoading] = useState(false);
  const [sniffUsedThisHop, setSniffUsedThisHop] = useState(false);
  const [scoutUsedThisHop, setScoutUsedThisHop] = useState(false);
  const [showMoreCountThisPage, setShowMoreCountThisPage] = useState(0);
  const [showPathModal, setShowPathModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  /** Sidebar path tap: show this article read-only; does not move the trail */
  const [pathPreviewArticle, setPathPreviewArticle] = useState(null);
  const [pathPreviewLoading, setPathPreviewLoading] = useState(false);
  /** Post-game: gameplay layout with read-only article; all breadcrumbs open path steps */
  const [puzzleExploreMode, setPuzzleExploreMode] = useState(false);
  const [exploreIndex, setExploreIndex] = useState(-1);
  const [showTargetDefinition, setShowTargetDefinition] = useState(false);
  const [targetDefinitionContent, setTargetDefinitionContent] = useState(null);
  const [targetDefinitionLoading, setTargetDefinitionLoading] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialActive, setTutorialActive] = useState(false);

  const { modelReady, loadProgress, embedArticle, getCompositeSimilarity } = useEmbedder();
  const { fetchArticleContent, resolveCanonicalTitle } = useWikipedia();
  const { getDailyPuzzle } = useDailyPuzzle({ getCompositeSimilarity, resolveCanonicalTitle });

  // Scoring version migration — clear stale puzzle caches when scoring system changes
  useEffect(() => {
    const SCORING_VERSION = 3;
    const storedVersion = parseInt(localStorage.getItem('snailstrail_version') || '0', 10);
    if (storedVersion < SCORING_VERSION) {
      // Clear puzzle caches (stale similarity values)
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('snailstrail_puzzle_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      // Also clear in-progress session (uses old similarity)
      localStorage.removeItem('snailstrail_session');
      // Mark migrated
      localStorage.setItem('snailstrail_version', String(SCORING_VERSION));
      console.log(`[Migration] Cleared ${keysToRemove.length} stale puzzle caches for scoring v${SCORING_VERSION}`);
    }
  }, []);

  const gameMainRef = useRef(null);

  // Prevent Android back button from exiting the website.
  // Push a sentinel history entry and intercept popstate to perform contextual
  // in-app back navigation (close modals, exit previews, return to menu).
  const gameStateRef = useRef(gameState);
  const showHelpRef = useRef(showHelp);
  const showPathModalRef = useRef(showPathModal);
  const showHistoryRef = useRef(showHistory);
  const showTargetDefinitionRef = useRef(showTargetDefinition);
  const pathPreviewArticleRef = useRef(pathPreviewArticle);
  const puzzleExploreModeRef = useRef(puzzleExploreMode);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { showHelpRef.current = showHelp; }, [showHelp]);
  useEffect(() => { showPathModalRef.current = showPathModal; }, [showPathModal]);
  useEffect(() => { showHistoryRef.current = showHistory; }, [showHistory]);
  useEffect(() => { showTargetDefinitionRef.current = showTargetDefinition; }, [showTargetDefinition]);
  useEffect(() => { pathPreviewArticleRef.current = pathPreviewArticle; }, [pathPreviewArticle]);
  useEffect(() => { puzzleExploreModeRef.current = puzzleExploreMode; }, [puzzleExploreMode]);

  const handleBackToMenu = useCallback(() => {
    setGameState('menu');
    setPuzzle(null);
    setCurrentArticle(null);
    setHops([]);
    setTotalScore(0);
    setWon(false);
    setCurrentSimilarity(0);
    setAdmiring(false);
    setSniffsUsed(0);
    setScoutsUsed(0);
    setHintedLinks([]);
    setHintLoading(false);
    setSniffUsedThisHop(false);
    setScoutUsedThisHop(false);
    setShowMoreCountThisPage(0);
    setShowPathModal(false);
    setShowHelp(false);
    setPathPreviewArticle(null);
    setPathPreviewLoading(false);
    setPuzzleExploreMode(false);
    setExploreIndex(-1);
  }, []);

  const completeTutorial = useCallback(() => {
    localStorage.setItem('snailstrail_tutorial_seen', '1');
    setTutorialActive(false);
    setTutorialStep(0);
    handleBackToMenu();
  }, [handleBackToMenu]);

  const handleSkipTutorial = useCallback(() => {
    completeTutorial();
  }, [completeTutorial]);

  const handleTutorialAction = useCallback((actionType, detail) => {
    if (!tutorialActive) return;
    const step = TUTORIAL_STEPS[tutorialStep];
    if (!step) return;

    const actionMatches =
      step.expectedAction === actionType ||
      step.expectedAction === 'auto';

    if (!actionMatches) return;

    if (actionType === 'hop' && step.expectedTitle && detail !== step.expectedTitle) return;

    if (actionType === 'hop') {
      if (step.expectedTitle && detail !== step.expectedTitle) return;

      const hopIndex = TUTORIAL_PATH.indexOf(detail);
      if (hopIndex >= 0 && hopIndex < TUTORIAL_PATH.length) {
        const article = TUTORIAL_ARTICLES[detail];
        if (article) {
          const sim = TUTORIAL_SIMILARITIES[hopIndex];
          setCurrentArticle(article);
          setCurrentSimilarity(sim);

          // Compute real score
          const isTarget = detail === TUTORIAL_TARGET;
          const raw = hopScore(sim, difficulty);
          const mult = isTarget ? 1.0 : hubMultiplier(detail, difficulty);
          const hopPoints = Math.round(raw * mult);
          const newTotalScore = totalScore + hopPoints;

          const newHop = { title: detail, similarity: sim, scoreAfterHop: newTotalScore };
          setHops((prev) => [...prev, newHop]);

          // Clear hints on hop
          setHintedLinks([]);
          setSniffUsedThisHop(false);
          setScoutUsedThisHop(false);
          setShowMoreCountThisPage(0);

          if (isTarget) {
            // Win — add hop saved bonus and show end screen
            const remaining = MAX_HOPS[difficulty] - (hops.length + 1);
            const finalScore = newTotalScore + hopSavedBonus(remaining);
            setTotalScore(finalScore);
            setWon(true);
            setGameState('ended');
            return; // End screen handles tutorial completion
          }

          setTotalScore(newTotalScore);
        }
      }
    }

    const nextStep = tutorialStep + 1;
    if (nextStep < TUTORIAL_STEPS.length) {
      setTutorialStep(nextStep);
    }
  }, [tutorialActive, tutorialStep, difficulty, totalScore, hops]);

  const handleReplayTutorial = useCallback(() => {
    setShowHelp(false);
    setDifficulty('easy');
    setPuzzle({ start: TUTORIAL_PATH[0], target: TUTORIAL_TARGET });
    setCurrentArticle(TUTORIAL_ARTICLES[TUTORIAL_PATH[0]]);
    setCurrentSimilarity(TUTORIAL_SIMILARITIES[0]);
    setHops([]);
    setTotalScore(0);
    setTutorialActive(true);
    setTutorialStep(0);
    setGameState('playing');
  }, []);

  useEffect(() => {
    const sentinel = { snailsTrail: true };
    window.history.pushState(sentinel, '');

    const handlePopState = () => {
      // Re-push so the next back press is also caught
      window.history.pushState(sentinel, '');

      // Close modals first (highest priority)
      if (showHelpRef.current) { setShowHelp(false); return; }
      if (showPathModalRef.current) { setShowPathModal(false); return; }
      if (showHistoryRef.current) { setShowHistory(false); return; }
      if (showTargetDefinitionRef.current) { setShowTargetDefinition(false); return; }

      // Exit path preview
      if (pathPreviewArticleRef.current) { setPathPreviewArticle(null); return; }

      // Exit explore mode back to results
      if (puzzleExploreModeRef.current) {
        setPuzzleExploreMode(false);
        setPathPreviewArticle(null);
        setGameState('ended');
        return;
      }

      // From playing or ended, go back to menu
      if (gameStateRef.current === 'playing' || gameStateRef.current === 'ended') {
        handleBackToMenu();
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleBackToMenu]);

  // After the model loads, go to the menu (in-progress runs are shown there and on continue)
  useEffect(() => {
    if (modelReady && gameState === 'loading') {
      const tutorialSeen = localStorage.getItem('snailstrail_tutorial_seen');
      if (!tutorialSeen) {
        setDifficulty('easy');
        setPuzzle({ start: TUTORIAL_PATH[0], target: TUTORIAL_TARGET });
        setCurrentArticle(TUTORIAL_ARTICLES[TUTORIAL_PATH[0]]);
        setCurrentSimilarity(TUTORIAL_SIMILARITIES[0]);
        setHops([]);
        setTotalScore(0);
        setTutorialActive(true);
        setTutorialStep(0);
        setGameState('playing');
      } else {
        setGameState('menu');
      }
    }
  }, [modelReady, gameState]);

  // Persist mid-run state after each hop (and when score / hints change)
  useEffect(() => {
    if (
      gameState !== 'playing' ||
      puzzleExploreMode ||
      !puzzle?.start ||
      !puzzle?.target ||
      !difficulty ||
      !currentArticle?.title
    ) {
      return;
    }
    saveInProgressSession({
      date: getGameDateStr(),
      difficulty,
      puzzle: { start: puzzle.start, target: puzzle.target },
      hops,
      totalScore,
      currentSimilarity,
      currentArticleTitle: currentArticle.title,
      sniffsUsed,
      scoutsUsed,
    });
  }, [
    gameState,
    puzzleExploreMode,
    difficulty,
    puzzle,
    hops,
    totalScore,
    currentSimilarity,
    currentArticle?.title,
    sniffsUsed,
    scoutsUsed,
  ]);

  // Start a new game at a given difficulty
  const startGame = useCallback(async (diff) => {
    clearInProgressSession();
    setDifficulty(diff);
    setGameState('generating');
    setHops([]);
    setTotalScore(0);
    setWon(false);
    setCurrentSimilarity(0);
    setSniffsUsed(0);
    setScoutsUsed(0);
    setHintedLinks([]);
    setHintLoading(false);
    setSniffUsedThisHop(false);
    setScoutUsedThisHop(false);
    setShowMoreCountThisPage(0);
    setShowPathModal(false);
    setPathPreviewArticle(null);
    setPathPreviewLoading(false);
    setPuzzleExploreMode(false);
    setExploreIndex(-1);

    try {
      const pair = await getDailyPuzzle(diff);
      setPuzzle(pair);

      // Fetch the starting article
      setArticleLoading(true);
      const article = await fetchArticleContent(pair.start, SECTIONS[diff]);
      setCurrentArticle(article);

      // Get initial similarity
      const startCats = getCategoriesForTitle(article.title, article);
      const targetCats = getCategoriesForTitle(pair.target, null);
      const simResult = await getCompositeSimilarity(pair.start, pair.target, startCats, targetCats);
      const sim = simResult.compositeSim;
      setCurrentSimilarity(sim);

      setArticleLoading(false);
      setGameState('playing');
    } catch (err) {
      console.error('Failed to start game:', err);
      setGameState('menu');
    }
  }, [getDailyPuzzle, fetchArticleContent, getCompositeSimilarity]);

  const continueSession = useCallback(async () => {
    const session = getInProgressSession();
    if (!isValidInProgressSession(session)) return;

    setGameState('generating');
    try {
      const pair = await getDailyPuzzle(session.difficulty);
      if (
        pair.start !== session.puzzle.start ||
        pair.target !== session.puzzle.target
      ) {
        clearInProgressSession();
        setGameState('menu');
        return;
      }

      setDifficulty(session.difficulty);
      setPuzzle(session.puzzle);
      setHops(session.hops);
      setTotalScore(session.totalScore);
      setSniffsUsed(session.sniffsUsed ?? 0);
      setScoutsUsed(session.scoutsUsed ?? 0);
      setHintedLinks([]);
      setHintLoading(false);
      setSniffUsedThisHop(false);
      setScoutUsedThisHop(false);
      setShowMoreCountThisPage(0);
      setShowPathModal(false);
      setShowHelp(false);
      setPathPreviewArticle(null);
      setPathPreviewLoading(false);
      setPuzzleExploreMode(false);
      setExploreIndex(-1);
      setWon(false);
      setAdmiring(false);

      setArticleLoading(true);
      const article = await fetchArticleContent(session.currentArticleTitle, SECTIONS[session.difficulty]);
      setCurrentArticle(article);
      // Pre-embed with rich text so COMPOSITE_SIMILARITY uses description, not title-only
      await embedArticle(article.title, article.description || '', article.firstSentence || '');
      const targetTitle = normalizeTitle(session.puzzle.target);
      const artCats = getCategoriesForTitle(article.title, article);
      const tgtCats = getCategoriesForTitle(targetTitle, null);
      const simResult = await getCompositeSimilarity(article.title, targetTitle, artCats, tgtCats);
      const sim = simResult.compositeSim;
      setCurrentSimilarity(sim);
      setArticleLoading(false);
      setGameState('playing');
    } catch (err) {
      console.error('Failed to continue session:', err);
      clearInProgressSession();
      setGameState('menu');
    }
  }, [getDailyPuzzle, fetchArticleContent, embedArticle, getCompositeSimilarity]);

  const handleDifficultyOrContinue = useCallback(
    (diff) => {
      const s = getInProgressSession();
      if (isValidInProgressSession(s) && s.difficulty === diff) {
        continueSession();
        return;
      }
      startGame(diff);
    },
    [continueSession, startGame]
  );

  const handleViewPathNode = useCallback(async (title) => {
    if (gameState !== 'playing' || !puzzle) return;

    const normalized = normalizeTitle(title);
    if (pathPreviewArticle && normalizeTitle(pathPreviewArticle.title) === normalized) {
      setPathPreviewArticle(null);
      return;
    }

    if (currentArticle && normalizeTitle(currentArticle.title) === normalized) {
      setPathPreviewArticle(null);
      return;
    }

    setPathPreviewLoading(true);
    try {
      const article = await fetchArticleContent(normalized, SECTIONS[difficulty]);
      setPathPreviewArticle(article);
      gameMainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Path preview failed:', err);
    } finally {
      setPathPreviewLoading(false);
    }
  }, [gameState, puzzle, pathPreviewArticle, currentArticle, fetchArticleContent]);

  // Handle a hop (clicking a link)
  const handleHop = useCallback(async (title) => {
    if (gameState !== 'playing' || articleLoading || puzzleExploreMode) return;
    if (tutorialActive) {
      handleTutorialAction('hop', normalizeTitle(title));
      return;
    }

    setPathPreviewArticle(null);

    const normalizedTarget = normalizeTitle(puzzle.target);
    const normalizedClickedTitle = normalizeTitle(title);

    // Early win: if clicking the target page, win immediately without fetching
    if (normalizedClickedTitle === normalizedTarget) {
      setArticleLoading(true);
      try {
        // Landing on the target: sim is 1.0, score is DIFFICULTY_MAX (no hub penalty).
        const sim = 1.0;
        const hopPoints = hopScore(sim, difficulty);
        const newTotalScore = totalScore + hopPoints;
        const newHop = { title: normalizedClickedTitle, similarity: sim, scoreAfterHop: newTotalScore };
        const newHops = [...hops, newHop];
        const remaining = MAX_HOPS[difficulty] - newHops.length;
        const score = newTotalScore + hopSavedBonus(remaining);
        setTotalScore(score);
        setHops(newHops);
        setWon(true);
        setGameState('ended');

        // Save progress
        const p = getProgress();
        p[difficulty] = Math.max(p[difficulty] || 0, score);
        saveProgress(p);
        setProgress(p);

        // Save daily result
        const newDaily = saveDailyResult(difficulty, {
          won: true, score, hops: newHops,
          startTitle: puzzle.start, targetTitle: puzzle.target,
        });
        setDailyResults(newDaily);
        clearInProgressSession();
      } catch (err) {
        console.error('Target hop failed:', err);
      } finally {
        setArticleLoading(false);
      }
      return;
    }

    setArticleLoading(true);
    setHintedLinks([]);
    setSniffUsedThisHop(false);
    setScoutUsedThisHop(false);
    setShowMoreCountThisPage(0);

    try {
      // Fetch the article content (resolves redirects automatically)
      const article = await fetchArticleContent(normalizedClickedTitle, SECTIONS[difficulty]);
      const resolvedTitle = article.title;

      // Pre-embed with rich text so subsequent COMPOSITE_SIMILARITY uses description
      await embedArticle(resolvedTitle, article.description || '', article.firstSentence || '');

      // If the redirect resolved to the page we're already on, just update
      // the displayed content without counting a hop
      if (currentArticle && resolvedTitle === currentArticle.title) {
        setCurrentArticle(article);
        setArticleLoading(false);
        return;
      }

      // Backtrack perk: if the player navigates to a previously visited page,
      // reset the path to that point and restore the score from that moment.
      // Sniffs and scouts stay consumed (budgets are not refunded).
      const normalizedStart = puzzle.start ? normalizeTitle(puzzle.start) : null;
      const backtrackToStart = normalizedStart && resolvedTitle === normalizedStart;
      const backtrackHopIndex = hops.findIndex(
        (h) => normalizeTitle(h.title) === resolvedTitle
      );

      if (backtrackToStart || backtrackHopIndex !== -1) {
        setCurrentArticle(article);

        if (backtrackToStart) {
          setHops([]);
          setTotalScore(0);
          const artCats = getCategoriesForTitle(resolvedTitle, article);
          const tgtCats = getCategoriesForTitle(normalizedTarget, null);
          const simResult = await getCompositeSimilarity(resolvedTitle, normalizedTarget, artCats, tgtCats);
          const sim = simResult.compositeSim;
          setCurrentSimilarity(sim);
        } else {
          const truncatedHops = hops.slice(0, backtrackHopIndex + 1);
          const atHop = truncatedHops[backtrackHopIndex];
          setHops(truncatedHops);
          setTotalScore(
            atHop.scoreAfterHop != null
              ? atHop.scoreAfterHop
              : truncatedHops.reduce((sum, h) => {
                  const raw = hopScore(h.similarity, difficulty);
                  const mult = hubMultiplier(normalizeTitle(h.title), difficulty);
                  return sum + Math.round(raw * mult);
                }, 0)
          );
          setCurrentSimilarity(atHop.similarity);
        }

        gameMainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        setArticleLoading(false);
        return;
      }

      // Normal hop
      setCurrentArticle(article);

      // Get similarity to target using the resolved title.
      // If this hop lands on the target itself, sim is 1.0 by definition —
      // don't rely on the composite formula (category misses give 0.70 not 1.0).
      const artCats = getCategoriesForTitle(resolvedTitle, article);
      const tgtCats = getCategoriesForTitle(normalizedTarget, null);
      const simResult = await getCompositeSimilarity(resolvedTitle, normalizedTarget, artCats, tgtCats);
      const sim = resolvedTitle === normalizedTarget ? 1.0 : simResult.compositeSim;
      setCurrentSimilarity(sim);

      // Calculate running score. Target hop always scores DIFFICULTY_MAX (no hub penalty).
      const raw = hopScore(sim, difficulty);
      const mult = resolvedTitle === normalizedTarget ? 1.0 : hubMultiplier(resolvedTitle, difficulty);
      const hopPoints = Math.round(raw * mult);
      const newTotalScore = totalScore + hopPoints;
      setTotalScore(newTotalScore);

      // Record this hop under the resolved title, with score snapshot for backtracking
      const newHop = { title: resolvedTitle, similarity: sim, scoreAfterHop: newTotalScore };
      const newHops = [...hops, newHop];
      setHops(newHops);

      // Check win condition (exact title match)
      if (resolvedTitle === normalizedTarget) {
        const remaining = MAX_HOPS[difficulty] - newHops.length;
        const score = newTotalScore + hopSavedBonus(remaining);
        setTotalScore(score);
        setWon(true);
        setGameState('ended');

        // Save progress
        const p = getProgress();
        p[difficulty] = Math.max(p[difficulty] || 0, score);
        saveProgress(p);
        setProgress(p);

        // Save daily result
        const newDaily = saveDailyResult(difficulty, {
          won: true, score, hops: newHops,
          startTitle: puzzle.start, targetTitle: puzzle.target,
        });
        setDailyResults(newDaily);
        clearInProgressSession();
      }
      // Check loss condition (max hops reached)
      else if (newHops.length >= MAX_HOPS[difficulty]) {
        const score = newTotalScore; // Running score already reflects all hint penalties
        setTotalScore(score);
        setGameState('ended');

        // Save progress
        const p = getProgress();
        p[difficulty] = Math.max(p[difficulty] || 0, score);
        saveProgress(p);
        setProgress(p);

        // Save daily result
        const newDaily = saveDailyResult(difficulty, {
          won: false, score, hops: newHops,
          startTitle: puzzle.start, targetTitle: puzzle.target,
        });
        setDailyResults(newDaily);
        clearInProgressSession();
      }

      // Scroll to top of article
      gameMainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Hop failed:', err);
    } finally {
      setArticleLoading(false);
    }
  }, [gameState, articleLoading, puzzleExploreMode, tutorialActive, handleTutorialAction, puzzle, hops, difficulty, totalScore, currentArticle, fetchArticleContent, embedArticle, getCompositeSimilarity]);

  const handleRetry = useCallback(() => {
    if (difficulty) {
      setAdmiring(false);
      startGame(difficulty);
    }
  }, [difficulty, startGame]);

  const handlePlayNext = useCallback(() => {
    const next = getNextDifficulty(difficulty);
    if (next) {
      setAdmiring(false);
      startGame(next);
    } else {
      handleBackToMenu();
    }
  }, [difficulty, startGame, handleBackToMenu]);

  const handleExplorePuzzle = useCallback(async () => {
    if (!puzzle?.target) return;
    setPathPreviewArticle(null);
    setPuzzleExploreMode(true);
    setExploreIndex(won ? hops.length : (hops.length > 0 ? hops.length - 1 : 0));
    setGameState('playing');
    setArticleLoading(true);
    try {
      const normalizedTarget = normalizeTitle(puzzle.target);
      const defaultPageTitle = won
        ? puzzle.target
        : (hops.length > 0
            ? hops[hops.length - 1].title
            : (currentArticle?.title ?? puzzle.start));
      const article = await fetchArticleContent(normalizeTitle(defaultPageTitle), SECTIONS[difficulty]);
      setCurrentArticle(article);
      await embedArticle(article.title, article.description || '', article.firstSentence || '');
      const artCats = getCategoriesForTitle(article.title, article);
      const tgtCats = getCategoriesForTitle(normalizedTarget, null);
      const simResult = await getCompositeSimilarity(article.title, normalizedTarget, artCats, tgtCats);
      const sim = article.title === normalizedTarget ? 1.0 : simResult.compositeSim;
      setCurrentSimilarity(sim);
    } catch (err) {
      console.error('Explore puzzle load failed:', err);
      setPuzzleExploreMode(false);
      setGameState('ended');
    } finally {
      setArticleLoading(false);
    }
  }, [puzzle, won, currentArticle?.title, hops, fetchArticleContent, embedArticle, getCompositeSimilarity]);

  const handleExploreNav = useCallback(async (newIndex) => {
    if (!puzzleExploreMode || !puzzle?.start) return;
    const path = [puzzle.start, ...hops.map(h => h.title)];
    if (newIndex < 0 || newIndex >= path.length) return;

    setExploreIndex(newIndex);
    setArticleLoading(true);
    setPathPreviewArticle(null);
    try {
      const title = path[newIndex];
      const article = await fetchArticleContent(normalizeTitle(title), SECTIONS[difficulty]);
      setCurrentArticle(article);
      // Pre-embed with rich text so composite similarity uses description,
      // matching the embedding that was used during gameplay.
      await embedArticle(article.title, article.description || '', article.firstSentence || '');
      const normalizedTarget = normalizeTitle(puzzle.target);
      const artCats = getCategoriesForTitle(article.title, article);
      const tgtCats = getCategoriesForTitle(normalizedTarget, null);
      const simResult = await getCompositeSimilarity(article.title, normalizedTarget, artCats, tgtCats);
      const sim = article.title === normalizedTarget ? 1.0 : simResult.compositeSim;
      setCurrentSimilarity(sim);
      gameMainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Explore nav failed:', err);
    } finally {
      setArticleLoading(false);
    }
  }, [puzzleExploreMode, puzzle, hops, difficulty, fetchArticleContent, embedArticle, getCompositeSimilarity]);

  const handleShowTargetDefinition = useCallback(async () => {
    setShowTargetDefinition(true);
    setTargetDefinitionLoading(true);
    setTargetDefinitionContent(null);

    try {
      const article = await fetchArticleContent(normalizeTitle(puzzle.target), 1);
      const firstParagraph = extractFirstParagraphWithLinks(article.html);
      setTargetDefinitionContent(firstParagraph);
    } catch (err) {
      console.error('Failed to fetch target definition:', err);
      setTargetDefinitionContent('Could not load definition');
    } finally {
      setTargetDefinitionLoading(false);
    }
  }, [puzzle, fetchArticleContent]);

  const handleExitExploreToResults = useCallback(() => {
    setPuzzleExploreMode(false);
    setPathPreviewArticle(null);
    setExploreIndex(-1);
    setGameState('ended');
  }, []);

  const handleRewind = useCallback(async () => {
    if (articleLoading || !currentArticle || hops.length === 0) return;

    const prevHops = hops.slice(0, -1);
    setArticleLoading(true);
    setHintedLinks([]);
    setSniffUsedThisHop(false);
    setScoutUsedThisHop(false);
    setShowMoreCountThisPage(0);

    try {
      if (prevHops.length > 0) {
        const prevHop = prevHops[prevHops.length - 1];
        const article = await fetchArticleContent(prevHop.title, SECTIONS[difficulty]);
        setCurrentArticle(article);
        setHops(prevHops);
        setTotalScore(prevHop.scoreAfterHop ?? 0);
        setCurrentSimilarity(prevHop.similarity);
      } else {
        // Rewind all the way back to start
        const article = await fetchArticleContent(normalizeTitle(puzzle.start), SECTIONS[difficulty]);
        const normalizedTarget = normalizeTitle(puzzle.target);
        const artCats = getCategoriesForTitle(article.title, article);
        const tgtCats = getCategoriesForTitle(normalizedTarget, null);
        const simResult = await getCompositeSimilarity(article.title, normalizedTarget, artCats, tgtCats);
        setCurrentArticle(article);
        setHops([]);
        setTotalScore(0);
        setCurrentSimilarity(simResult.compositeSim);
      }
      gameMainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Rewind failed:', err);
    } finally {
      setArticleLoading(false);
    }
  }, [articleLoading, currentArticle, hops, difficulty, puzzle, fetchArticleContent, getCompositeSimilarity]);

  const handleShowMore = useCallback(() => {
    if (!difficulty) return;
    if (tutorialActive) {
      handleTutorialAction('show-more');
      // Don't return — let the real show-more run so user sees the effect
    }
    const basePenalty = SHOW_MORE_PENALTIES[difficulty] ?? 0;
    if (basePenalty > 0) {
      const penalty = basePenalty * (showMoreCountThisPage + 1);
      setTotalScore((prev) => prev - penalty);
    }
    setShowMoreCountThisPage((prev) => prev + 1);
  }, [difficulty, tutorialActive, handleTutorialAction, showMoreCountThisPage]);

  // Sniff: rank current page links by direct similarity to target
  const handleSniff = useCallback(async () => {
    if (!difficulty || sniffsUsed >= SNIFF_BUDGETS[difficulty]) return;
    if (tutorialActive) {
      // Simulate sniff: highlight top 5 links + deduct real penalty
      const fakeTop = (currentArticle?.links || []).slice(0, 5);
      setHintedLinks(fakeTop.map(title => ({ title, type: 'sniffed' })));
      setSniffsUsed((prev) => prev + 1);
      setSniffUsedThisHop(true);
      setTotalScore((prev) => prev - SNIFF_PENALTIES[difficulty]);
      handleTutorialAction('sniff');
      return;
    }
    if (gameState !== 'playing' || puzzleExploreMode || hintLoading || !currentArticle) return;

    setHintLoading(true);
    const links = currentArticle.links;
    const target = normalizeTitle(puzzle.target);

    try {
      const targetCats = getCategoriesForTitle(target, null);
      const scored = await Promise.all(
        links.map((link) => {
          const linkCats = getCategoriesForTitle(link, null);
          return getCompositeSimilarity(link, target, linkCats, targetCats)
            .then((r) => ({ title: link, sim: r.compositeSim }));
        })
      );
      scored.sort((a, b) => b.sim - a.sim);
      const top5 = scored.slice(0, 5);

      // Merge with existing hints — keep scout/direct, add new sniffs
      setHintedLinks((prev) => {
        const existing = new Map(prev.map((h) => [h.title, h]));
        for (const l of top5) {
          if (!existing.has(l.title) || existing.get(l.title).type === 'sniffed') {
            existing.set(l.title, { title: l.title, type: 'sniffed' });
          }
        }
        return [...existing.values()];
      });
      setSniffsUsed((prev) => prev + 1);
      setSniffUsedThisHop(true);
      setTotalScore((prev) => prev - SNIFF_PENALTIES[difficulty]);
    } catch (err) {
      console.error('Sniff failed:', err);
    } finally {
      setHintLoading(false);
    }
  }, [difficulty, sniffsUsed, tutorialActive, handleTutorialAction, gameState, puzzleExploreMode, hintLoading, currentArticle, puzzle, getCompositeSimilarity]);

  // Scout: two-hop lookahead — fetch sub-articles and score by composite similarity
  const handleScout = useCallback(async () => {
    if (!difficulty || scoutsUsed >= SCOUT_BUDGETS[difficulty]) return;
    if (tutorialActive) {
      // Simulate scout: highlight first link as scouted + deduct real penalty
      const fakeTop = (currentArticle?.links || []).slice(0, 1);
      setHintedLinks((prev) => {
        const existing = new Map(prev.map((h) => [h.title, h]));
        for (const title of fakeTop) {
          existing.set(title, { title, type: 'scouted' });
        }
        return [...existing.values()];
      });
      setScoutsUsed((prev) => prev + 1);
      setScoutUsedThisHop(true);
      setTotalScore((prev) => prev - SCOUT_PENALTIES[difficulty]);
      handleTutorialAction('scout');
      return;
    }
    if (gameState !== 'playing' || puzzleExploreMode || hintLoading || !currentArticle) return;

    setHintLoading(true);
    const links = currentArticle.links;
    const normalizedTarget = normalizeTitle(puzzle.target);

    try {
      const results = await Promise.all(
        links.map(async (link) => {
          try {
            const subArticle = await fetchArticleContent(link, SECTIONS[difficulty]);
            await embedArticle(subArticle.title, subArticle.description || '', subArticle.firstSentence || '');
            const linkCats = getCategoriesForTitle(link, subArticle);
            const targetCats = getCategoriesForTitle(normalizedTarget, null);
            const directResult = await getCompositeSimilarity(link, normalizedTarget, linkCats, targetCats);
            const directSim = directResult.compositeSim;

            // Check if target is directly reachable from this link's article
            const targetInLinks = subArticle.links.some(
              (l) => normalizeTitle(l) === normalizedTarget
            );

            if (targetInLinks) {
              return { title: link, score: 100 + 0.3 * directSim, direct: true };
            }

            // Sample first 10 sub-links for second-order similarity
            const subSample = subArticle.links.slice(0, 10);
            let bestSubSim = 0;
            if (subSample.length > 0) {
              const subSims = await Promise.all(
                subSample.map((sl) => {
                  const slCats = getCategoriesForTitle(sl, null);
                  return getCompositeSimilarity(sl, normalizedTarget, slCats, targetCats)
                    .then((r) => r.compositeSim);
                })
              );
              bestSubSim = Math.max(...subSims);
            }

            return {
              title: link,
              score: 0.3 * directSim + 0.7 * bestSubSim,
              direct: false,
            };
          } catch {
            return { title: link, score: 0, direct: false };
          }
        })
      );

      results.sort((a, b) => b.score - a.score);
      const top = results.slice(0, 1);

      // Merge with existing hints — scout/direct overrides sniff
      setHintedLinks((prev) => {
        const existing = new Map(prev.map((h) => [h.title, h]));
        for (const r of top) {
          existing.set(r.title, { title: r.title, type: r.direct ? 'direct' : 'scouted' });
        }
        return [...existing.values()];
      });
      setScoutsUsed((prev) => prev + 1);
      setScoutUsedThisHop(true);
      setTotalScore((prev) => prev - SCOUT_PENALTIES[difficulty]);
    } catch (err) {
      console.error('Scout failed:', err);
    } finally {
      setHintLoading(false);
    }
  }, [difficulty, scoutsUsed, tutorialActive, handleTutorialAction, gameState, puzzleExploreMode, hintLoading, currentArticle, puzzle, embedArticle, getCompositeSimilarity, fetchArticleContent]);

  const handleAdmire = useCallback((diff) => {
    const result = getDailyResults()[diff];
    if (!result) return;
    setDifficulty(diff);
    setHops(result.hops);
    setTotalScore(result.score);
    setWon(result.won);
    setPuzzle({ start: result.startTitle, target: result.targetTitle });
    setAdmiring(true);
    setPuzzleExploreMode(false);
    setGameState('ended');
  }, []);

  // Set of titles the player has already visited (for visual marking in articles)
  const visitedTitles = useMemo(() => {
    const set = new Set();
    if (puzzle?.start) set.add(normalizeTitle(puzzle.start));
    for (const hop of hops) set.add(normalizeTitle(hop.title));
    // Exclude the current article — clicking it is a no-op (handled by redirect check)
    if (currentArticle?.title) set.delete(normalizeTitle(currentArticle.title));
    return set;
  }, [puzzle, hops, currentArticle]);

  const explorePath = useMemo(() => {
    if (!puzzleExploreMode || !puzzle?.start) return [];
    return [puzzle.start, ...hops.map(h => h.title)];
  }, [puzzleExploreMode, puzzle, hops]);

  // ===== RENDER =====

  const nextShowMorePenalty = (SHOW_MORE_PENALTIES[difficulty] ?? 0) * (showMoreCountThisPage + 1);

  const pct = loadProgress?.progress != null
    ? Math.round(loadProgress.progress)
    : null;

  const dateStr = getGameDateStr();
  const nextDiff = getNextDifficulty(difficulty);

  const easyResult = dailyResults.easy;
  const mediumResult = dailyResults.medium;
  const hardResult = dailyResults.hard;
  const easyWon = easyResult?.won;
  const mediumUnlocked = !!easyWon;
  const mediumWon = mediumResult?.won;
  const hardUnlocked = !!mediumWon;

  const storedSessionForMenu = useMemo(() => {
    const s = getInProgressSession();
    return isValidInProgressSession(s) ? s : null;
  }, [gameState, dailyResults]);

  const displayArticle = pathPreviewArticle || currentArticle;
  const pathPreviewActive = !!pathPreviewArticle;
  const articleReadOnly = pathPreviewActive || puzzleExploreMode;
  const articleAreaLoading = articleLoading || pathPreviewLoading;
  const isDeadEnd =
    gameState === 'playing' &&
    !articleLoading &&
    !pathPreviewActive &&
    !puzzleExploreMode &&
    currentArticle?.links?.length === 0 &&
    hops.length > 0;

  return (
    <>
      <AnimatePresence mode="wait">
        {gameState === 'loading' && (
          <motion.div key="loading" {...pageTransition} className="loading-screen">
            <motion.div
              className="loading-snail"
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              {'\u{1F40C}'}
            </motion.div>
            <p>
              {pct != null
                ? `Snail is loading its brain... ${pct}%`
                : 'Snail is loading its brain...'}
            </p>
            {pct != null && (
              <div className="loading-progress">
                <motion.div
                  className="loading-progress-fill"
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                />
              </div>
            )}
          </motion.div>
        )}

        {gameState === 'menu' && (
          <motion.div key="menu" {...pageTransition} className="menu-screen">
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              <motion.div variants={fadeUp}>
                <h1 className="menu-title">{'\u{1F40C}'} snail's trail</h1>
                <p className="menu-subtitle">Help a snail connect its thoughts</p>
                <div className="menu-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
                  <button className="help-btn" onClick={() => setShowHelp(true)} aria-label="How to play">?</button>
                  <button className="help-btn" onClick={() => setShowHistory(true)} aria-label="Streaks & history">{'\u{1F525}'}</button>
                </div>
              </motion.div>
            </motion.div>
            <motion.p className="menu-date" variants={fadeUp} initial="initial" animate="animate">{dateStr}</motion.p>
            <motion.div className="menu-difficulties" variants={staggerContainer} initial="initial" animate="animate">
              {easyWon ? (
                <motion.button variants={fadeUp} className="btn btn--difficulty btn--completed" onClick={() => handleAdmire('easy')} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <div className="difficulty-label">{'\u{1F331}'} Easy</div>
                  <div className="difficulty-lock">{completedDifficultyFooter(easyResult)}</div>
                </motion.button>
              ) : (
                <motion.button
                  variants={fadeUp}
                  className={`btn btn--difficulty${storedSessionForMenu?.difficulty === 'easy' ? ' btn--difficulty-in-progress' : ''}`}
                  onClick={() => handleDifficultyOrContinue('easy')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="difficulty-label">{'\u{1F331}'} Easy</div>
                  <div className="difficulty-lock">{menuFooterForDifficulty('easy', easyResult, storedSessionForMenu)}</div>
                </motion.button>
              )}
              {mediumWon ? (
                <motion.button variants={fadeUp} className="btn btn--difficulty btn--completed" onClick={() => handleAdmire('medium')} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <div className="difficulty-label">{'\u{1F33F}'} Medium</div>
                  <div className="difficulty-lock">{completedDifficultyFooter(mediumResult)}</div>
                </motion.button>
              ) : (
                <motion.button
                  variants={fadeUp}
                  className={`btn btn--difficulty${!mediumUnlocked ? ' btn--difficulty-locked' : ''}${storedSessionForMenu?.difficulty === 'medium' ? ' btn--difficulty-in-progress' : ''}`}
                  onClick={() => handleDifficultyOrContinue('medium')}
                  disabled={!mediumUnlocked}
                  whileHover={mediumUnlocked ? { scale: 1.02, y: -2 } : {}}
                  whileTap={mediumUnlocked ? { scale: 0.98 } : {}}
                >
                  <div className="difficulty-label">{'\u{1F33F}'} Medium</div>
                  {mediumUnlocked ? (
                    <div className="difficulty-lock">{menuFooterForDifficulty('medium', mediumResult, storedSessionForMenu)}</div>
                  ) : (
                    <div className="difficulty-lock">Complete Easy to unlock</div>
                  )}
                </motion.button>
              )}
              {hardResult?.won ? (
                <motion.button variants={fadeUp} className="btn btn--difficulty btn--completed" onClick={() => handleAdmire('hard')} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <div className="difficulty-label">{'\u{1F332}'} Hard</div>
                  <div className="difficulty-lock">{completedDifficultyFooter(hardResult)}</div>
                </motion.button>
              ) : (
                <motion.button
                  variants={fadeUp}
                  className={`btn btn--difficulty${!hardUnlocked ? ' btn--difficulty-locked' : ''}${storedSessionForMenu?.difficulty === 'hard' ? ' btn--difficulty-in-progress' : ''}`}
                  onClick={() => handleDifficultyOrContinue('hard')}
                  disabled={!hardUnlocked}
                  whileHover={hardUnlocked ? { scale: 1.02, y: -2 } : {}}
                  whileTap={hardUnlocked ? { scale: 0.98 } : {}}
                >
                  <div className="difficulty-label">{'\u{1F332}'} Hard</div>
                  {hardUnlocked ? (
                    <div className="difficulty-lock">{menuFooterForDifficulty('hard', hardResult, storedSessionForMenu)}</div>
                  ) : (
                    <div className="difficulty-lock">Complete Medium to unlock</div>
                  )}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}

        {gameState === 'generating' && (
          <motion.div key="generating" {...pageTransition} className="loading-screen">
            <motion.div className="loading-snail" animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
              {'\u{1F40C}'}
            </motion.div>
            <p>Finding today's trail...</p>
          </motion.div>
        )}

        {gameState === 'ended' && (
          <motion.div key="ended" {...pageTransition}>
            <EndScreen
              won={won} hops={hops} score={totalScore} maxHops={MAX_HOPS[difficulty]}
              difficulty={difficulty} startTitle={puzzle.start} targetTitle={puzzle.target}
              onBackToMenu={tutorialActive ? null : handleBackToMenu} onRetry={won || tutorialActive ? null : handleRetry}
              onPlayNext={!tutorialActive && won && nextDiff && !dailyResults[nextDiff]?.won ? handlePlayNext : null} nextDifficulty={nextDiff}
              isAdmiring={admiring} sniffsUsed={sniffsUsed} scoutsUsed={scoutsUsed}
              onShowPath={tutorialActive ? null : () => setShowPathModal(true)}
              onShowHelp={tutorialActive ? null : () => setShowHelp(true)}
              onShowHistory={tutorialActive ? null : () => setShowHistory(true)}
              onExplorePuzzle={tutorialActive ? null : handleExplorePuzzle}
              isTutorial={tutorialActive}
              onCompleteTutorial={completeTutorial}
            />
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" {...pageTransition} className="game-layout">
            <motion.div className="game-header" initial={{ y: -60 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
              <div className="game-header-left">
                <button type="button" className="game-logo-btn" onClick={handleBackToMenu} aria-label="Back to menu">
                  {'\u{1F40C}'}
                </button>
                <span className={`difficulty-badge difficulty-badge--${difficulty}`}>
                  {difficulty === 'easy' && '\u{1F331}'}
                  {difficulty === 'medium' && '\u{1F33F}'}
                  {difficulty === 'hard' && '\u{1F332}'}
                </span>
                {puzzleExploreMode && (
                  <span className="explore-mode-badge" title="Article links are read-only">Explore</span>
                )}
              </div>
              <div className="game-header-right">
                {puzzleExploreMode && (
                  <button type="button" className="explore-back-btn" onClick={handleExitExploreToResults} aria-label="Back to results">
                    {'\u{2190}'}
                  </button>
                )}
                {!puzzleExploreMode && (
                  <div className="hint-buttons">
                    <motion.button className="hint-btn hint-btn--sniff" data-tutorial="hint-btn--sniff" onClick={handleSniff} disabled={!difficulty || pathPreviewActive || sniffsUsed >= SNIFF_BUDGETS[difficulty] || sniffUsedThisHop || scoutUsedThisHop || hintLoading || articleLoading} title={`Sniff out the warmest links (-${difficulty ? SNIFF_PENALTIES[difficulty] : 0} pts)`} whileTap={{ scale: 0.95 }}>
                      {'\u{1F443}'}<span className="btn-text">Sniff</span><span className="hint-btn-badge">{difficulty ? SNIFF_BUDGETS[difficulty] - sniffsUsed : 0}</span>
                    </motion.button>
                    <motion.button className="hint-btn hint-btn--scout" data-tutorial="hint-btn--scout" onClick={handleScout} disabled={!difficulty || pathPreviewActive || scoutsUsed >= SCOUT_BUDGETS[difficulty] || scoutUsedThisHop || hintLoading || articleLoading} title={`Scout ahead two hops for shortcuts (-${difficulty ? SCOUT_PENALTIES[difficulty] : 0} pts)`} whileTap={{ scale: 0.95 }}>
                      {hintLoading ? '\u{23F3}' : '\u{1F50D}'}<span className="btn-text">Scout</span><span className="hint-btn-badge">{difficulty ? SCOUT_BUDGETS[difficulty] - scoutsUsed : 0}</span>
                    </motion.button>
                  </div>
                )}
                <button className="path-btn" onClick={() => setShowPathModal(true)}>
                  {'\u{1F5FA}\uFE0F'}<span className="btn-text">Path</span> <span className="path-btn-badge">{hops.length}</span>
                </button>
                <span className="hop-counter">{!puzzleExploreMode && <span className="btn-text">Hop </span>}{hops.length}/{MAX_HOPS[difficulty]}</span>
                <button className="help-btn" onClick={() => setShowHelp(true)} aria-label="How to play">?<span className="btn-text">Help</span></button>
                <button className="help-btn" onClick={() => setShowHistory(true)} aria-label="Streaks & history">{'\u{1F525}'}<span className="btn-text">Streaks</span></button>
              </div>
            </motion.div>

            <div className="game-body">
              <div className="game-main" ref={gameMainRef}>
                <ProximityBar similarity={currentSimilarity} difficulty={difficulty} targetTitle={puzzle.target} currentHops={hops.length} maxHops={MAX_HOPS[difficulty]} onShowDefinition={handleShowTargetDefinition} definitionDisabled={!puzzle?.target || articleLoading || targetDefinitionLoading} totalScore={totalScore} />
                {pathPreviewActive && (
                  <div className="path-preview-banner">
                    <button type="button" className="path-preview-banner-btn" onClick={() => setPathPreviewArticle(null)}>
                      {puzzleExploreMode ? 'Back to destination' : 'Back on track'}
                    </button>
                  </div>
                )}
                {isDeadEnd && (
                  <div className="dead-end-banner">
                    <span className="dead-end-banner-label">{'\u26A0\uFE0F'} Dead end — no links here</span>
                    <button type="button" className="dead-end-banner-btn" onClick={handleRewind} disabled={articleLoading}>
                      {'\u21A9'} Rewind
                    </button>
                  </div>
                )}
                <div className="article-title-bar">
                  {puzzleExploreMode && (
                    <button
                      type="button"
                      className="explore-nav-btn"
                      disabled={exploreIndex <= 0 || articleLoading}
                      onClick={() => handleExploreNav(exploreIndex - 1)}
                      aria-label="Previous hop"
                    >
                      {'\u2190'}
                    </button>
                  )}
                  <span className="article-title-text">{articleAreaLoading ? '\u2026' : (displayArticle?.title || '\u2026')}</span>
                  {puzzleExploreMode && (
                    <button
                      type="button"
                      className="explore-nav-btn"
                      disabled={exploreIndex >= explorePath.length - 1 || articleLoading}
                      onClick={() => handleExploreNav(exploreIndex + 1)}
                      aria-label="Next hop"
                    >
                      {'\u2192'}
                    </button>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={`${pathPreviewActive ? 'p' : 'c'}-${displayArticle?.title || 'loading'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <ArticleSection html={displayArticle?.html || ''} links={displayArticle?.links || []} onHop={handleHop} onExpand={handleShowMore} difficulty={difficulty} loading={articleAreaLoading} hintedLinks={articleReadOnly ? [] : hintedLinks} visitedTitles={visitedTitles} readOnly={articleReadOnly} showMorePenalty={nextShowMorePenalty} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="game-sidebar">
                <h3>Destination</h3>
                <div className="sidebar-destination">
                  <span className="sidebar-destination-flag">{'\u{1F4CD}'}</span>
                  <span className="sidebar-destination-title">{puzzle.target}</span>
                </div>
                <h3>Score</h3>
                <motion.div key={totalScore} className="score-display" initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>{totalScore}</motion.div>
                <h3>Path</h3>
                <BreadcrumbTrail hops={hops} difficulty={difficulty} startTitle={puzzle.start} onViewPathNode={handleViewPathNode} previewTitle={pathPreviewArticle?.title ?? null} onExitPreview={() => setPathPreviewArticle(null)} exploreMode={puzzleExploreMode} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPathModal && puzzle && (
          <PathModal isOpen={showPathModal} onClose={() => setShowPathModal(false)} hops={hops} difficulty={difficulty} startTitle={puzzle.start} targetTitle={puzzle.target} totalScore={totalScore} maxHops={MAX_HOPS[difficulty]} currentHopIndex={gameState === 'playing' ? hops.length - 1 : null} exploreMode={puzzleExploreMode} onHopClick={handleViewPathNode} won={won} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} onReplayTutorial={handleReplayTutorial} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHistory && (
          <HistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} history={getHistory()} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTargetDefinition && (
          <TargetDefinitionModal
            isOpen={showTargetDefinition}
            onClose={() => setShowTargetDefinition(false)}
            content={targetDefinitionContent}
            loading={targetDefinitionLoading}
          />
        )}
      </AnimatePresence>

      {tutorialActive && gameState === 'playing' && (
        <TutorialOverlay
          step={TUTORIAL_STEPS[tutorialStep]}
          onSkip={handleSkipTutorial}
          onComplete={() => handleTutorialAction('auto')}
          isLastStep={tutorialStep === TUTORIAL_STEPS.length - 1}
        />
      )}
    </>
  );
}
