/* Prerender: after `react-scripts build`, render the App to static HTML on the
   server and inject it into build/index.html. Visitors get the same site; search
   engines, link previews and no-JS readers get real content in the HTML. */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const root = path.resolve(__dirname, '..');
const outFile = path.join(root, 'build', 'index.html');
const tmp = path.join(root, 'build', '.prerender.cjs');

(async () => {
  await esbuild.build({
    entryPoints: [path.join(root, 'src', 'App.js')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: tmp,
    loader: { '.js': 'jsx' },
    jsx: 'automatic',
    external: ['react', 'react-dom'],
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning',
  });

  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const App = require(tmp).default;

  const html = renderToString(React.createElement(App));
  fs.unlinkSync(tmp);

  let page = fs.readFileSync(outFile, 'utf8');
  if (!page.includes('<div id="root"></div>')) throw new Error('root div not found in build/index.html');
  page = page.replace('<div id="root"></div>', '<div id="root">' + html + '</div>');
  fs.writeFileSync(outFile, page);

  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log('Prerendered index.html: ' + words + ' words of visible content.');
})().catch(e => { console.error(e); process.exit(1); });
