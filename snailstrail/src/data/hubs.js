/**
 * Tiered hub articles by difficulty.
 * Hub articles are super-connected Wikipedia pages that make navigation trivially easy.
 * Using them incurs a score penalty (0.4x multiplier) to encourage creative routing.
 *
 * Each difficulty includes all hubs from easier difficulties plus more.
 */

const EASY_HUBS = [
  'United States',
  'United Kingdom',
  'World War II',
  'English language',
  'Germany',
  'France',
  'China',
  'India',
  'Europe',
  'Russia',
];

const MEDIUM_HUBS = [
  ...EASY_HUBS,
  'London',
  'New York City',
  'Catholic Church',
  'Ancient Greece',
  'Ancient Rome',
  'Japan',
  'Africa',
  'South America',
  'Christianity',
  'Islam',
  'Buddhism',
  'Pacific Ocean',
  'Atlantic Ocean',
  'British Empire',
  'Soviet Union',
  'European Union',
  'Middle Ages',
  'Renaissance',
  'Latin',
  'French language',
];

const HARD_HUBS = [
  ...MEDIUM_HUBS,
  'University',
  'Olympic Games',
  'Nobel Prize',
  'NASA',
  'United Nations',
  'Colonialism',
  'Industrial Revolution',
  'Mediterranean Sea',
  'World War I',
  'Hinduism',
  'Monarchy',
  'Democracy',
  'Republic',
  'Army',
  'Navy',
  'Parliament',
  'International law',
  'Agriculture',
  'Science',
];

const hubSets = {
  easy: new Set(EASY_HUBS),
  medium: new Set(MEDIUM_HUBS),
  hard: new Set(HARD_HUBS),
};

/**
 * Returns the Set of hub article titles for the given difficulty.
 */
export function getHubsForDifficulty(difficulty) {
  return hubSets[difficulty] || hubSets.easy;
}

/**
 * Returns true if the given title is a hub article for the given difficulty.
 */
export function isHub(title, difficulty) {
  return getHubsForDifficulty(difficulty).has(title);
}
