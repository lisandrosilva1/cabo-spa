/**
 * Render the treatment menu into the HTML, from the page's own price list.
 * -------------------------------------------------------------------------
 * The whole substance of this page — twenty treatments and what each one costs —
 * lived only inside `SPA_MENU`, a JavaScript object. `buildAccordion()` writes it
 * into `#spaAccordion` on load, so a browser shows it; but the HTML the server
 * sends contains nothing except an empty `<div>` and the words "Tap a category".
 *
 * That matters for one reader in particular. Googlebot renders JavaScript, late and
 * with less weight. The crawlers behind the answer engines mostly do not render it
 * at all — and the spa page's traffic drop through September was the loss of its
 * ChatGPT sessions. A page whose prices only exist after a script runs is a page
 * those readers see as empty.
 *
 * The fix is NOT a second hand-written list: that is two copies of twenty prices,
 * and they drift. `SPA_MENU` stays the only source. This renders the static half
 * from it, between the MENU:START / MENU:END markers, inside `#spaAccordion` —
 * which `buildAccordion()` clears and rebuilds when JavaScript runs, so the
 * interactive version is unchanged and nothing is duplicated at runtime.
 *
 *   node tools/menu-visible.mjs
 *
 * Change a price in `SPA_MENU`, re-run, commit both halves. It refuses to write if
 * any treatment or price would still be missing from the HTML afterwards.
 */
import fs from 'node:fs';
import path from 'node:path';

const FILE = path.resolve('index.html');
let html = fs.readFileSync(FILE, 'utf8');

/* ---------- read SPA_MENU, the single source ---------- */

const menuSrc = html.match(/const SPA_MENU\s*=\s*(\{[\s\S]*?\n\s*\});/);
if (!menuSrc) {
  console.error('No encuentro `const SPA_MENU = {...};` en index.html.');
  process.exit(1);
}

/**
 * `SPA_MENU` is a JavaScript literal with unquoted keys, so it is not JSON.
 * Quote the bare keys and parse it as data — never `eval`, because this runs over
 * a file that a generator also writes.
 */
const asJson = menuSrc[1]
  .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":')
  .replace(/,(\s*[}\]])/g, '$1');

let menu;
try {
  menu = JSON.parse(asJson);
} catch (err) {
  console.error('SPA_MENU no se puede leer como datos:', err.message);
  process.exit(1);
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ---------- build the static half ---------- */

const rows = [];
let count = 0;
for (const [cat, items] of Object.entries(menu)) {
  const body = items
    .map((item) => {
      count++;
      // A treatment with a 90-minute price is offered at both lengths; one without
      // is a fixed session, and its own name already says how long it runs.
      const dur = item.p90
        ? `<span class="spa-static-dur">60m $${item.p60} · 90m $${item.p90}</span>`
        : `<span class="spa-static-dur">$${item.p60}</span>`;
      return (
        `        <div class="spa-item-row">` +
        `<span class="spa-item-name">${esc(item.name)}</span>${dur}</div>`
      );
    })
    .join('\n');
  rows.push(
    `      <div class="spa-cat-header"><span class="spa-cat-title">${esc(cat)}</span></div>\n` +
      `      <div class="spa-cat-body spa-cat-body--static">\n${body}\n      </div>`,
  );
}

const block =
  `<!-- MENU:START generado por tools/menu-visible.mjs desde SPA_MENU — no editar a mano -->\n` +
  rows.join('\n') +
  `\n      <!-- MENU:END -->`;

/* ---------- write it inside #spaAccordion ---------- */

/**
 * Re-running must REPLACE the block, not add another one. The markers are what
 * makes that safe: the container holds nested `</div>`s, so matching from the
 * opening tag to a closing one swallows part of the previous block and leaves the
 * rest behind — which is exactly what happened the first time this was written,
 * and it silently tripled the menu. So: if the markers are there, replace between
 * them; if not, this is the first run and the container is still empty.
 */
const marked = /<!-- MENU:START[\s\S]*?MENU:END -->/;
if (marked.test(html)) {
  html = html.replace(marked, block);
} else {
  const empty = '<div class="spa-accordion" id="spaAccordion"></div>';
  if (!html.includes(empty)) {
    console.error(
      'No encuentro el contenedor #spaAccordion vacío ni los marcadores MENU:START/END.',
    );
    process.exit(1);
  }
  html = html.replace(
    empty,
    `<div class="spa-accordion" id="spaAccordion">\n      ${block}\n    </div>`,
  );
}

/* The static rows have to defeat `.spa-cat-body{display:none}`, which exists for
 * the interactive accordion. One rule, added once, next to the others. */
if (!html.includes('.spa-cat-body--static')) {
  const anchor = '  .spa-cat-body.open{ display:block; }';
  if (!html.includes(anchor)) {
    console.error('No encuentro dónde añadir el estilo de .spa-cat-body--static.');
    process.exit(1);
  }
  html = html.replace(
    anchor,
    anchor +
      '\n  /* Las filas estáticas (tools/menu-visible.mjs) se ven sin JavaScript;' +
      '\n     buildAccordion() las sustituye por el acordeón cuando el script corre. */' +
      '\n  .spa-cat-body--static{ display:block; }' +
      '\n  .spa-static-dur{ font-family:\'Playfair Display\'; font-size:14px; color:var(--gold-soft); text-align:right; flex-shrink:0; }',
  );
}

/* ---------- refuse to write a result that is still incomplete ---------- */

const missing = [];
for (const [, items] of Object.entries(menu)) {
  for (const item of items) {
    if (!html.includes(esc(item.name))) missing.push(item.name);
    if (!html.includes(`$${item.p60}`)) missing.push(`$${item.p60}`);
    if (item.p90 && !html.includes(`$${item.p90}`)) missing.push(`$${item.p90}`);
  }
}
if (missing.length) {
  console.error('No escribo: faltarían en el HTML →', [...new Set(missing)].join(', '));
  process.exit(1);
}

fs.writeFileSync(FILE, html);
console.log(
  `Menú visible escrito: ${count} tratamientos en ${Object.keys(menu).length} categorías.`,
);
