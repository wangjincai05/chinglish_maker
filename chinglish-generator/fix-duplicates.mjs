import fs from 'fs';

const content = fs.readFileSync('./src/utils/translationRules.ts', 'utf8');

const lines = content.split('\n');
const wordMapStart = lines.findIndex(line => line.includes('const wordMap: Record<string, string> = {'));
const wordMapEnd = lines.findIndex((line, i) => i > wordMapStart && line.trim() === '};');

console.log(`Found wordMap from line ${wordMapStart + 1} to ${wordMapEnd + 1}`);

const beforeWordMap = lines.slice(0, wordMapStart + 1).join('\n');
const afterWordMap = lines.slice(wordMapEnd).join('\n');

const wordMapContent = lines.slice(wordMapStart + 1, wordMapEnd).join('\n');

const entries = wordMapContent.match(/\s*['"]([^'"]+)['"]:\s*['"]([^'"]+)['"],?/g) || [];
const uniqueEntries = new Map();

entries.forEach(entry => {
  const match = entry.match(/\s*['"]([^'"]+)['"]:\s*['"]([^'"]+)['"],?/);
  if (match) {
    const key = match[1];
    const value = match[2];
    if (!uniqueEntries.has(key)) {
      uniqueEntries.set(key, value);
    } else {
      console.log(`Removed duplicate key: "${key}" (keeping first occurrence)`);
    }
  }
});

const cleanedWordMap = Array.from(uniqueEntries.entries())
  .map(([key, value]) => `  '${key}': '${value}',`)
  .join('\n');

const result = `${beforeWordMap}\n${cleanedWordMap}\n${afterWordMap}`;

fs.writeFileSync('./src/utils/translationRules.ts', result);
console.log('Fixed duplicates successfully!');
