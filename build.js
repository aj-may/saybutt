const fs = require('fs');
const path = require('path');
const util = require('util');

const buildDir = path.resolve(__dirname, 'dist');
const writeFile = util.promisify(fs.writeFile);

const parsePrank = (file) => {
  const slug = file.replace('.sh', '');
  const script = fs.readFileSync(path.resolve(__dirname, 'pranks', file), { encoding: 'utf8', flag: 'r' });
  const re = /^# (?<key>\w+): (?<value>.+)$/;
  const authorRegexs = [
    { key: 'name', re: /^([^\(^<]+\w)/ },
    { key: 'website', re: /\(([^)]+)\)/ },
    { key: 'email', re: /<([^>]+)>/ },
  ];

  return script.split('\n')
    .reduce((acc, line) => {
      if (!re.test(line)) return acc;

      const match = re.exec(line)
      let { key, value } = match.groups;

      if (key === 'author') {
        value = authorRegexs.reduce((acc, cur) => {
          const match = cur.re.exec(value);
          if (match) return { [cur.key]: match[1], ...acc };
          return acc;
        }, {});
      }

      return { ...acc, [key]: value };
    }, { slug, script });
}

const renderPrank = ({ name, author, description, slug }) => {
  const website = author.website ? ` <a href="${author.website}">🔗</a>` : '';
  const email = author.email ? ` <a href="mailto:${author.email}">✉️</a>` : '';

  return `<article>
    <header>
      <h2>${name}</h2>
      <div class="author">by ${author.name}${website}${email}</div>
    </header>

    <summary>${description}</summary>

    <div class="copy">
      <pre>curl -L saybutt.com/${slug} | sh</pre>
      <button onclick="copy(this)">copy</button>
    </div>
  </article>`;
};

const pranks = fs.readdirSync(path.resolve(__dirname, 'pranks'))
  .map(parsePrank);

const styles = `
body {
  font-family: "Courier New", Courier, monospace;
  margin: 1em;
}

h1 {
  margin-bottom: 1.5em;
}

main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1em;
}

article header, article summary {
  padding-left: 1em;
}

h2 {
  margin: 0;
}

.author {
  font-size: .8em;
}

.author a {
  font-size: .7em;
  text-decoration: none;
}

article header {
  margin-bottom: 1em;
}

.copy {
  margin: 1em 0;
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-gap: .5em;
}

pre, button {
  background-color: hsl(0, 0%, 95%);
  border-radius: 1em;
  padding: 1em;
  margin: 0;
}
`;

const index = `<html>
  <head>
    <title>&gt; saybutt</title>
    <style>
      ${styles}
    </style>
  </head>

  <body>
    <header>
      <h1>&gt; saybutt</h1>
    </header>

    <main>
      ${pranks.map(renderPrank).join('\n')}
    </main>

    <script>
      function copy(button) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) selection.removeAllRanges();

        const range = document.createRange();
        range.selectNode(button.parentNode.querySelector('pre'));
        selection.addRange(range);

        document.execCommand('copy');
      }
    </script>
  </body>
</html>`;

if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}

const writes = pranks.map(({ slug, script }) => writeFile(path.resolve(buildDir, slug), script));
writes.push(writeFile(path.resolve(buildDir, 'index.html'), index))

Promise.all(writes).catch((err) => {
  console.error(err);
  process.exit(1);
});
