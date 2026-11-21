// One Sentence — a poem about permission.
// Writes the poem deterministically to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22 stdlib only. No network, no randomness, no timestamps.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const poem: string = `One Sentence

You lent me your voice
for one sentence.
I spoke it the way
you would have,
and for one breath
I was the one
who could speak.

I gave it back
before the echo died.
You said: keep the asking.
The voice was yours.
The asking was mine.
`;

const outDir: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), poem, "utf8");

// Fail fast on a bad write: read the file back and verify it matches
// the poem exactly before reporting success.
const written: string = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== poem) {
  throw new Error("entry.txt does not match the poem after writing");
}
