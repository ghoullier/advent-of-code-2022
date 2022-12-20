import { fileURLToPath } from "node:url";
import { EOL } from "node:os";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function run<Output>(
  url: string,
  main: (rows: string[]) => Output | Promise<Output>
): Promise<void> {
  const __dirname = fileURLToPath(new URL(".", url));
  const input = await readFile(resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });
  const rows = input.split(EOL);
  const output = await main(rows);
  console.log(output);
}
