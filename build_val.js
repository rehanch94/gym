const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const libraryHtml = fs.readFileSync('library.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const valCode = `export default async function(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  
  const css = \`${css.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
  const js = \`${js.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
  const indexHtml = \`${indexHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
  const libraryHtml = \`${libraryHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

  if (path === '/styles.css') return new Response(css, { headers: { 'Content-Type': 'text/css' } });
  if (path === '/app.js') return new Response(js, { headers: { 'Content-Type': 'application/javascript' } });
  if (path === '/library.html') return new Response(libraryHtml, { headers: { 'Content-Type': 'text/html' } });
  
  return new Response(indexHtml, { headers: { 'Content-Type': 'text/html' } });
}
`;

fs.writeFileSync('gym_val.js', valCode);
console.log("Successfully bundled the gym tracker into 'gym_val.js'!");
console.log("You can copy the contents of 'gym_val.js' into a new HTTP Val on Val Town to deploy it instantly.");
