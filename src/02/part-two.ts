import { run } from "../shared/run";

const POINTS_PER_MOVE = {
  // Rock
  A: 1,
  X: 1,
  // Paper
  B: 2,
  Y: 2,
  // Scissors
  C: 3,
  Z: 3,
} as const;

const LOOSE = 0;
const DRAW = 3;
const WIN = 6;

const POINTS_PER_FIGHT = {
  "A X": [POINTS_PER_MOVE["A"] + WIN, POINTS_PER_MOVE["C"] + LOOSE],
  "A Y": [POINTS_PER_MOVE["A"] + DRAW, POINTS_PER_MOVE["A"] + DRAW],
  "A Z": [POINTS_PER_MOVE["A"] + LOOSE, POINTS_PER_MOVE["B"] + WIN],

  "B X": [POINTS_PER_MOVE["B"] + WIN, POINTS_PER_MOVE["A"] + LOOSE],
  "B Y": [POINTS_PER_MOVE["B"] + DRAW, POINTS_PER_MOVE["B"] + DRAW],
  "B Z": [POINTS_PER_MOVE["B"] + LOOSE, POINTS_PER_MOVE["C"] + WIN],

  "C X": [POINTS_PER_MOVE["C"] + WIN, POINTS_PER_MOVE["B"] + LOOSE],
  "C Y": [POINTS_PER_MOVE["C"] + DRAW, POINTS_PER_MOVE["C"] + DRAW],
  "C Z": [POINTS_PER_MOVE["C"] + LOOSE, POINTS_PER_MOVE["A"] + WIN],
} as const;

type Fight = keyof typeof POINTS_PER_FIGHT;

run(import.meta.url, (rows) => {
  const games = rows
    .filter((game): game is Fight => game in POINTS_PER_FIGHT);

  const scores = games.map((game) => POINTS_PER_FIGHT[game]);

  const total = scores.reduce(
    ([totalAdverser, totalMe], [scoreAdverser, scoreMe]) => [
      totalAdverser + scoreAdverser,
      totalMe + scoreMe,
    ],
    [0, 0]
  );

  return total[1];
})
