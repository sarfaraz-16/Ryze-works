import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'intro-frames');
const files = fs.readdirSync(dir);
const pngs = files.filter(f => f.endsWith('.png'));

console.log('PNG files found to remove:', pngs.length);
for (const f of pngs) {
  fs.unlinkSync(path.join(dir, f));
}

const remainingWebp = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
console.log('Remaining WebP files verified:', remainingWebp.length);
