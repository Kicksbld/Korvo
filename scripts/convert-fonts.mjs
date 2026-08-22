// Convertit tous les .ttf de public/fonts/seasons en .woff2, puis supprime les .ttf
import { readFile, writeFile, readdir, unlink } from "node:fs/promises";
import { join } from "node:path";
import ttf2woff2 from "ttf2woff2";

const dir = "public/fonts/seasons";
const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".ttf"));

for (const f of files) {
  const ttfPath = join(dir, f);
  const woff2Path = join(dir, f.replace(/\.ttf$/i, ".woff2"));
  const input = await readFile(ttfPath);
  await writeFile(woff2Path, ttf2woff2(input));
  await unlink(ttfPath);
  console.log(`✓ ${f} → ${woff2Path.split("/").pop()}`);
}
console.log(`\n${files.length} fichiers convertis, TTF supprimés.`);
