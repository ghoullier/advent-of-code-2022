import { EOL } from "node:os";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function main(): Promise<number> {
  const input = await readFile(resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });
  const lines = input.split(EOL);
  const elves = lines.reduce(
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
}

main().then(console.log);
