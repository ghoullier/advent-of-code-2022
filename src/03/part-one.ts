import { run } from "../shared/run";

function intersection(left: Set<string>, right: Set<string>): Set<string> {
  return new Set(Array.from(left).filter((value) => right.has(value)));
}

const PRIORITIES =
  "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

run(import.meta.url, (rows) => {
  const rucksacks = rows
    .map((rucksack) =>
      intersection(
        new Set(rucksack.slice(0, rucksack.length / 2).split("")),
        new Set(rucksack.slice(rucksack.length / 2, rucksack.length).split(""))
      )
    );
  const priorities = rucksacks.flatMap((set) =>
    [...set.values()].map((value) => PRIORITIES.findIndex((_) => _ === value))
  );

  const sum = priorities.reduce(($, priority) => $ + priority, 0);

  return sum;
})
