import { run } from "../shared/run";

run(import.meta.url, (rows) => {
  const elves = rows.reduce(
    (acc, calory) => {
      const currentCalories = acc.calories.get(acc.currentIndex) ?? 0;
      if (calory === "") {
        if (acc.mostValue <= currentCalories) {
          acc.mostValue = currentCalories;
          acc.mostIndex = acc.currentIndex;
        }
        ++acc.currentIndex;
      } else {
        acc.calories.set(
          acc.currentIndex,
          currentCalories + parseInt(calory, 10)
        );
      }
      return acc;
    },
    { currentIndex: 0, calories: new Map(), mostValue: 0, mostIndex: 0 }
  );

  return elves.mostValue;
});
