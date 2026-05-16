/**
 * Scripted tutorial content — no Wikipedia API calls.
 * Each article has minimal HTML with fake wiki-style links.
 * The "correct" next link is always present.
 */

export const TUTORIAL_TARGET = 'Pacific Ocean';

export const TUTORIAL_PATH = [
  'Animals',
  'Mammals',
  'Whales',
  'Oceans',
  'Pacific Ocean',
];

export const TUTORIAL_SIMILARITIES = [0.42, 0.48, 0.55, 0.65, 1.0];

export const TUTORIAL_ARTICLES = {
  Animals: {
    title: 'Animals',
    html: `
      <p><b>Animals</b> are multicellular eukaryotic organisms that form the biological kingdom Animalia. They consume organic material, breathe oxygen, and are able to move.</p>
      <p>Animals are divided into many groups. <a href="/wiki/Mammals">Mammals</a> are warm-blooded animals that feed their young with milk. <a href="/wiki/Birds">Birds</a> are feathered creatures that can often fly. <a href="/wiki/Reptiles">Reptiles</a> are cold-blooded vertebrates.</p>
      <p><a href="/wiki/Insects">Insects</a> make up the largest group of animals on Earth. <a href="/wiki/Fish">Fish</a> live in water and breathe through gills. <a href="/wiki/Amphibians">Amphibians</a> can live both on land and in water.</p>
    `,
    links: ['Mammals', 'Birds', 'Reptiles', 'Insects', 'Fish', 'Amphibians'],
  },
  Mammals: {
    title: 'Mammals',
    html: `
      <p><b>Mammals</b> are a group of vertebrate animals constituting the class Mammalia, characterized by the presence of mammary glands and hair or fur.</p>
      <p>Marine mammals include <a href="/wiki/Whales">Whales</a>, <a href="/wiki/Dolphins">Dolphins</a>, and <a href="/wiki/Seals">Seals</a>. Land mammals include <a href="/wiki/Elephants">Elephants</a>, <a href="/wiki/Lions">Lions</a>, and <a href="/wiki/Bears">Bears</a>.</p>
      <p>Mammals evolved around 200 million years ago. They are found on every continent, including <a href="/wiki/Antarctica">Antarctica</a>. The largest land mammal is the <a href="/wiki/African_elephant">African elephant</a>, while the blue whale is the largest mammal — and the largest animal ever to have lived.</p>
    `,
    links: ['Whales', 'Dolphins', 'Seals', 'Elephants', 'Lions', 'Bears', 'Antarctica'],
  },
  Whales: {
    title: 'Whales',
    html: `
      <p><b>Whales</b> are a widely distributed group of fully aquatic placental marine mammals found in all of the world's <a href="/wiki/Oceans">Oceans</a>. The largest species is the <a href="/wiki/Blue_whale">Blue whale</a>, while the <a href="/wiki/Humpback_whale">Humpback whale</a> is known for its complex songs. <a href="/wiki/Sperm_whale">Sperm whales</a> can dive to extreme depths to hunt <a href="/wiki/Giant_squid">Giant squid</a>. Whales migrate across vast stretches of the <a href="/wiki/Pacific_Ocean">Pacific Ocean</a> and <a href="/wiki/Atlantic_Ocean">Atlantic Ocean</a> each year. They play a crucial role in the marine <a href="/wiki/Ecosystem">Ecosystem</a> and are studied in the field of <a href="/wiki/Marine_biology">Marine biology</a>. Whales are protected under <a href="/wiki/Conservation">Conservation</a> laws worldwide.</p>
    `,
    links: ['Oceans', 'Blue whale', 'Humpback whale', 'Sperm whale', 'Giant squid', 'Pacific Ocean', 'Atlantic Ocean', 'Ecosystem', 'Marine biology', 'Conservation'],
  },
  Oceans: {
    title: 'Oceans',
    html: `
      <p><b>Oceans</b> cover more than 70% of Earth's surface and contain 97% of Earth's water. The five major oceans are the <a href="/wiki/Pacific_Ocean">Pacific Ocean</a>, <a href="/wiki/Atlantic_Ocean">Atlantic Ocean</a>, <a href="/wiki/Indian_Ocean">Indian Ocean</a>, <a href="/wiki/Southern_Ocean">Southern Ocean</a>, and <a href="/wiki/Arctic_Ocean">Arctic Ocean</a>. The oceans regulate the Earth's <a href="/wiki/Climate">Climate</a> and weather patterns. They are home to countless species of <a href="/wiki/Marine_life">Marine life</a>. Ocean <a href="/wiki/Ocean_current">currents</a> distribute heat around the globe, influencing <a href="/wiki/Weather">Weather</a> systems and <a href="/wiki/Coral_reef">Coral reefs</a>. The study of oceans is known as <a href="/wiki/Oceanography">Oceanography</a>.</p>
    `,
    links: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Arctic Ocean', 'Climate', 'Marine life', 'Ocean current', 'Weather', 'Coral reef', 'Oceanography'],
  },
  'Pacific Ocean': {
    title: 'Pacific Ocean',
    html: `
      <p><b>The Pacific Ocean</b> is the largest and deepest of Earth's five oceanic divisions. It extends from the <a href="/wiki/Arctic">Arctic</a> in the north to the <a href="/wiki/Southern_Ocean">Southern Ocean</a> in the south.</p>
      <p>The Pacific Ocean covers an area of about 165.25 million square kilometers, which is larger than all of Earth's land area combined.</p>
    `,
    links: ['Arctic', 'Southern Ocean'],
  },
};

export const TUTORIAL_STEPS = [
  {
    id: 'click-link',
    target: 'article-content',
    title: 'Click a Link',
    text: 'Click a link to hop to the next article. Links in blue lead to other Wikipedia pages. Try clicking "Mammals"!',
    expectedAction: 'hop',
    expectedTitle: 'Mammals',
  },
  {
    id: 'proximity-bar',
    target: 'proximity-bar',
    title: 'Proximity Bar',
    text: 'The bar shows how close you are to the target. The snail moves right as you get warmer!',
    expectedAction: 'auto',
    autoAdvanceMs: 3000,
  },
  {
    id: 'show-more',
    target: 'article-show-more',
    title: 'Show More',
    text: 'Tap "Show more" to reveal more of the article. This costs points, and the cost increases each time on the same page.',
    expectedAction: 'show-more',
  },
  {
    id: 'show-more-result',
    target: 'article-content',
    title: 'New Section Revealed',
    text: 'A new paragraph appeared! Now click "Whales" to continue your trail.',
    expectedAction: 'hop',
    expectedTitle: 'Whales',
  },
  {
    id: 'sniff',
    target: 'hint-btn--sniff',
    title: 'Sniff',
    text: 'Sniff ranks visible links by how close they are to the target. Costs points but helps when you\'re stuck! Try it now.',
    expectedAction: 'sniff',
  },
  {
    id: 'sniff-result',
    target: 'article-content',
    title: 'Links Highlighted',
    text: 'The warmest links are now highlighted in green. Click "Oceans" to get closer!',
    expectedAction: 'hop',
    expectedTitle: 'Oceans',
  },
  {
    id: 'scout',
    target: 'hint-btn--scout',
    title: 'Scout',
    text: 'Scout looks two hops ahead for shortcuts. More expensive but more powerful! Try it now.',
    expectedAction: 'scout',
  },
  {
    id: 'scout-result',
    target: 'article-content',
    title: 'Shortcut Found',
    text: 'The best two-hop shortcut is highlighted in purple. Click "Pacific Ocean" to reach the target!',
    expectedAction: 'hop',
    expectedTitle: 'Pacific Ocean',
  },
];
