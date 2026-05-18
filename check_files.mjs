import fs from 'fs';
import path from 'path';

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    try {
      const stat = fs.statSync(full);
      if (stat.isDirectory() && !f.startsWith('.') && f !== 'node_modules' && f !== '.next') {
        walk(full);
      } else if (stat.isFile()) {
        fs.readFileSync(full);
        console.log('OK:', full);
      }
    } catch (e) {
      console.error('FAIL:', full, e.message);
    }
  }
}

walk('src');
console.log('Done checking files.');
