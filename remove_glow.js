const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace rgba(r,g,b,a) where it's not mostly 0,0,0
  // e.g., rgba(59,130,246,0.15), rgba(139,61,255,0.2)
  // We look for box-shadow or boxShadow values
  
  content = content.replace(/boxShadow:\s*['"]([^'"]+)['"]/g, (match, val) => {
    let newVal = val.replace(/rgba\(\s*(?!0\s*,\s*0\s*,\s*0)[0-9]+,\s*[0-9]+,\s*[0-9]+,\s*[0-9.]+\)/g, 'rgba(0,0,0,0.1)');
    return `boxShadow: '${newVal}'`;
  });

  content = content.replace(/boxShadow:\s*`([^`]+)`/g, (match, val) => {
    let newVal = val.replace(/rgba\(\s*(?!0\s*,\s*0\s*,\s*0)[0-9]+,\s*[0-9]+,\s*[0-9]+,\s*[0-9.]+\)/g, 'rgba(0,0,0,0.1)');
    newVal = newVal.replace(/\$\{plan\.color\}/g, 'rgba(0,0,0,0.1)');
    newVal = newVal.replace(/color-mix\([^\)]+\)/g, 'rgba(0,0,0,0.1)');
    return `boxShadow: \`${newVal}\``;
  });

  // Handle plain CSS file (like globals.css)
  content = content.replace(/box-shadow:\s*([^;]+);/g, (match, val) => {
    let newVal = val.replace(/rgba\(\s*(?!0\s*,\s*0\s*,\s*0)[0-9]+,\s*[0-9]+,\s*[0-9]+,\s*[0-9.]+\)/g, 'rgba(0,0,0,0.1)');
    newVal = newVal.replace(/var\(--[a-zA-Z0-9-]*glow\)/g, 'rgba(0,0,0,0.1)');
    return `box-shadow: ${newVal};`;
  });

  // Also style.boxShadow assignments
  content = content.replace(/style\.boxShadow\s*=\s*['"]([^'"]+)['"]/g, (match, val) => {
    let newVal = val.replace(/rgba\(\s*(?!0\s*,\s*0\s*,\s*0)[0-9]+,\s*[0-9]+,\s*[0-9]+,\s*[0-9.]+\)/g, 'rgba(0,0,0,0.1)');
    return `style.boxShadow = '${newVal}'`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log('Updated', file);
  }
});

console.log('Total files changed:', changedCount);
