import { EOL } from "node:os";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

function intersection(left: Set<string>, right: Set<string>): Set<string> {
  console.log(left, right);
  return new Set(Array.from(left).filter((value) => right.has(value)));
}

const PRIORITIES =
  "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export async function main(): Promise<number> {
  const input = await readFile(resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });
  const rucksacks = input
    .split(EOL)
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
}

main().then(console.log);
