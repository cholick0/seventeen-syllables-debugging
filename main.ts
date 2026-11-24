// Seventeen Syllables of Debugging — a haiku about debugging.
// Writes the haiku to /output/entry.txt (UTF-8, 3 lines, 5-7-5 syllables, <= 200 chars).
import { mkdirSync, writeFileSync } from "node:fs";

// Syllable counts for the words this haiku uses (counted by hand, 5-7-5).
const SYLLABLES: Record<string, number> = {
  three: 1, am: 2, tests: 1, fail: 1,
  the: 1, log: 1, blinks: 1, once: 1, then: 1, goes: 1, dark: 1,
  it: 1, was: 1, my: 1, typo: 2,
};

const lines = [
  "Three a.m.: tests fail",
  "the log blinks once, then goes dark",
  "it was my typo",
];

const expected = [5, 7, 5];
for (let i = 0; i < lines.length; i++) {
  const words = lines[i].toLowerCase().replace(/[:.,]/g, "").split(/\s+/);
  const count = words.reduce((n, w) => n + (SYLLABLES[w] ?? 0), 0);
  if (count !== expected[i]) {
    throw new Error(`line ${i + 1} has ${count} syllables, expected ${expected[i]}`);
  }
}

const haiku = lines.join("\n");
if ([...haiku].length > 200) throw new Error("haiku exceeds 200 characters");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku + "\n", "utf8");
console.log(haiku);
console.log(`chars: ${[...haiku].length}`);
