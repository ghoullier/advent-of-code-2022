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
};

const LOOSE = 0;
const DRAW = 3;
const WIN = 6;

const POINTS_PER_FIGHT = {
  "A X": [POINTS_PER_MOVE["A"] + DRAW, POINTS_PER_MOVE["X"] + DRAW],
  "A Y": [POINTS_PER_MOVE["A"] + LOOSE, POINTS_PER_MOVE["Y"] + WIN],
  "A Z": [POINTS_PER_MOVE["A"] + WIN, POINTS_PER_MOVE["Z"] + LOOSE],

  "B X": [POINTS_PER_MOVE["B"] + WIN, POINTS_PER_MOVE["X"] + LOOSE],
  "B Y": [POINTS_PER_MOVE["B"] + DRAW, POINTS_PER_MOVE["Y"] + DRAW],
  "B Z": [POINTS_PER_MOVE["B"] + LOOSE, POINTS_PER_MOVE["Z"] + WIN],

  "C X": [POINTS_PER_MOVE["C"] + LOOSE, POINTS_PER_MOVE["X"] + WIN],
  "C Y": [POINTS_PER_MOVE["C"] + WIN, POINTS_PER_MOVE["Y"] + LOOSE],
  "C Z": [POINTS_PER_MOVE["C"] + DRAW, POINTS_PER_MOVE["Z"] + DRAW],
};

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
