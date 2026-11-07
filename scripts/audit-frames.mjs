import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'intro-frames');
const files = fs.readdirSync(dir);
const webpFiles = files.filter(f => /^ezgif-frame-\d{3}\.webp$/.test(f)).sort();
const others = files.filter(f => !/^ezgif-frame-\d{3}\.webp$/.test(f));

console.log('Total valid sequence WebP frames:', webpFiles.length);
console.log('First frame:', webpFiles[0]);
console.log('Last frame:', webpFiles[webpFiles.length - 1]);
if (others.length > 0) {
  console.warn('Non-sequence files found:', others);
}

// Check for missing indices in 1..450
let missing = [];
for (let i = 1; i <= 450; i++) {
  const expected = 'ezgif-frame-' + String(i).padStart(3, '0') + '.webp';
  if (!fs.existsSync(path.join(dir, expected))) missing.push(expected);
}
console.log('Missing frames count:', missing.length);
if (missing.length > 0) console.error('Missing list:', missing.slice(0, 10));
