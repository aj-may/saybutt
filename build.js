const yaml = require('js-yaml');
const fs = require('fs');

const pranks = yaml.safeLoad(fs.readFileSync('pranks.yml', 'utf8'));

const logError = err => err && console.error(err);

pranks.forEach(prank =>
  fs.writeFile(`public/${prank.name}`, prank.script, 'utf8', logError));

fs.writeFile(`src/pranks.json`, JSON.stringify(pranks, null, 2), 'utf8', logError);
