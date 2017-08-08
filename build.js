const yaml = require('js-yaml');
const fs = require('fs-extra');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

function augmentPrank(p) {
  return Object.assign(p, {
    url: `https://saybutt.com/api/pranks/${p.name}.json`,
    curl: `curl -L saybutt.com/${p.name} | sh`,
  });
}

function writeAPIRootEndpoint() {
  const res = JSON.stringify({ pranks: 'https://saybutt.com/api/pranks/index.json' }, null, 2);

  return writeFile('dist/api/index.json', res, 'utf8');
}

function writeAPIListEndpoint(pranks) {
  const res = JSON.stringify(
    pranks.map(augmentPrank),
    null, 2);

  return writeFile('dist/api/pranks/index.json', res, 'utf8');
}

function writeAPIDetailEndpoint(p) {
  return writeFile(`dist/api/pranks/${p.name}.json`, JSON.stringify(augmentPrank(p), null, 2), 'utf8');
}

function buildAPI(pranks) {
  fs.ensureDirSync('dist/api/pranks');
  return pranks.map(writeAPIDetailEndpoint)
    .concat([
      writeAPIListEndpoint(pranks),
      writeAPIRootEndpoint(),
    ]);
}

function writePrank(prank) {
  return writeFile(`dist/${prank.name}`, prank.script, 'utf8');
}

function buildPranks(pranks) {
  return pranks.map(writePrank);
}

async function main() {
  const pranks = yaml.safeLoad(fs.readFileSync('pranks.yml', 'utf8'));

  await Promise.all([
    buildAPI(pranks),
    buildPranks(pranks),
  ]);
}

main();
