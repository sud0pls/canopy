import {
  clientStore,
  editor,
  space,
  sync,
  system,
} from "@silverbulletmd/silverbullet/syscalls";

async function flushSync() {
  try {
    if (await sync.isEnabled()) await sync.performSpaceSync();
  } catch (_err) {
    // online mode / sync unavailable: writes already hit the server
  }
}

// Nice default icons for common section names (used if no frontmatter icon).
const FALLBACK_ICONS: Record<string, string> = {
  "Red Team HQ": "\u{1F3AF}",
  "Knowledge Base": "\u{1F4DA}",
  "Certifications": "\u{1F3C5}",
  "Labs & CTF": "\u{1F6A9}",
  "Programming": "\u{1F4BB}",
  "Toolbox": "\u{1F9F0}",
  "Study Resources": "\u{1F4D6}",
  "English": "\u{1F310}",
  "Command Arsenal": "⌨️",
};

const ENABLED_KEY = "canopy.enabled";
const COLLAPSED_KEY = "canopy.collapsed";
const POSITION = "lhs";
const SIZE = 0.3;

const TOC_ENABLED_KEY = "canopy.toc.enabled";
const TOC_POSITION = "rhs";
const TOC_SIZE = 0.22;

type TocEntry = { level: number; text: string };

/** Extracts H1–H3 headings from markdown, skipping frontmatter and code fences. */
function parseHeadings(md: string): TocEntry[] {
  const lines = md.split("\n");
  const out: TocEntry[] = [];
  let inFence = false;
  let inFrontmatter = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0 && line.trim() === "---") {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter) {
      if (line.trim() === "---") inFrontmatter = false;
      continue;
    }
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,3})\s+(.*\S)\s*$/.exec(line);
    if (m) out.push({ level: m[1].length, text: m[2].trim() });
  }
  return out;
}

// Pages we never want to show in the sidebar (system / meta stuff).
const HIDE_REGEX = /^(Library($|\/)|CONFIG$|SETTINGS$|index$)/;

type SvNode = {
  name: string; // full path
  title: string; // last segment
  icon?: string; // emoji
  isPage: boolean; // true if an actual page exists at this path
  isCurrent: boolean;
  children: SvNode[];
};

type PageMeta = {
  name: string;
  tags?: string[];
  icon?: string;
  // deco support
  pageDecoration?: { icon?: string; prefix?: string };
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

async function isEnabled(): Promise<boolean> {
  const v = await clientStore.get(ENABLED_KEY);
  // Default to visible (Obsidian-style always-on sidebar) until explicitly hidden.
  return v === undefined || v === null ? true : !!v;
}
async function setEnabled(v: boolean): Promise<void> {
  await clientStore.set(ENABLED_KEY, v);
}
async function getCollapsed(): Promise<string[]> {
  return (await clientStore.get(COLLAPSED_KEY)) as string[] ?? [];
}

// ---------------------------------------------------------------------------
// Tree building
// ---------------------------------------------------------------------------

function iconFor(node: SvNode): string {
  if (node.icon) return node.icon;
  if (FALLBACK_ICONS[node.name]) return FALLBACK_ICONS[node.name];
  if (!node.isPage || node.children.length > 0) return "\u{1F4C1}"; // 📁 folder
  return "\u{1F4C4}"; // 📄 page
}

/** Strips surrounding quotes (straight or smart/curly) from an icon value. */
function cleanIcon(v: string): string {
  return v.replace(/^["'“”‘’]+/, "").replace(/["'“”‘’]+$/, "").trim();
}

/** Reads the `icon:` value from a page's frontmatter block, if present. */
function parseFrontmatterIcon(md: string): string | undefined {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(md);
  if (!m) return undefined;
  const im = /^[ \t]*icon[ \t]*:[ \t]*(.+?)[ \t]*$/m.exec(m[1]);
  if (!im) return undefined;
  const v = cleanIcon(im[1]);
  return v || undefined;
}

async function buildTree(): Promise<{ nodes: SvNode[]; currentPage: string }> {
  const currentPage = await editor.getCurrentPage();
  const pages = (await space.listPages()) as PageMeta[];

  // Map from full page name -> icon (for folder-notes and pages)
  const iconMap = new Map<string, string>();
  for (const p of pages) {
    const ic = p.icon ?? p.pageDecoration?.prefix ?? p.pageDecoration?.icon;
    if (typeof ic === "string" && cleanIcon(ic)) {
      iconMap.set(p.name, cleanIcon(ic));
    }
  }

  // Real-time override: read the icon of the page being edited straight from
  // the live editor text, so frontmatter changes show in the tree immediately
  // (before the index catches up).
  try {
    const liveIcon = parseFrontmatterIcon(await editor.getText());
    if (liveIcon) iconMap.set(currentPage, liveIcon);
    else iconMap.delete(currentPage);
  } catch {
    // not in an editor context; ignore
  }

  const root: SvNode = {
    name: "",
    title: "",
    isPage: false,
    isCurrent: false,
    children: [],
  };

  const visible = pages
    .filter((p) => !HIDE_REGEX.test(p.name))
    .filter((p) => !(p.tags ?? []).includes("meta"))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const page of visible) {
    const parts = page.name.split("/");
    let parent = root;
    parts.forEach((title, i) => {
      const isLeaf = i === parts.length - 1;
      const fullName = parts.slice(0, i + 1).join("/");
      let node = parent.children.find((c) => c.title === title);
      if (!node) {
        node = {
          name: fullName,
          title,
          isPage: false,
          isCurrent: currentPage === fullName,
          children: [],
        };
        parent.children.push(node);
      }
      if (isLeaf) {
        node.isPage = true;
        node.isCurrent = currentPage === page.name;
      }
      parent = node;
    });
  }

  // Assign icons (now that structure is known)
  const assign = (n: SvNode) => {
    if (iconMap.has(n.name)) n.icon = iconMap.get(n.name);
    n.children.forEach(assign);
  };
  root.children.forEach(assign);

  // Folders before pages, then alphabetical
  const sortNodes = (nodes: SvNode[]) => {
    nodes.sort((a, b) => {
      const af = a.children.length > 0 ? 0 : 1;
      const bf = b.children.length > 0 ? 0 : 1;
      if (af !== bf) return af - bf;
      return a.title.localeCompare(b.title);
    });
    nodes.forEach((n) => sortNodes(n.children));
  };
  sortNodes(root.children);

  return { nodes: root.children, currentPage };
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderNode(node: SvNode, depth: number, collapsed: Set<string>): string {
  const hasChildren = node.children.length > 0;
  const isCollapsed = collapsed.has(node.name);
  const icon = iconFor(node);
  const pad = 8 + depth * 14;
  const toggle = hasChildren
    ? `<span class="sv-toggle" data-toggle="${esc(node.name)}">${isCollapsed ? "▸" : "▾"}</span>`
    : `<span class="sv-toggle sv-toggle-empty"></span>`;
  const navAttr = node.isPage ? ` data-nav="${esc(node.name)}"` : "";
  const cls = `sv-row${node.isCurrent ? " sv-current" : ""}${node.isPage ? "" : " sv-folder-only"}`;
  const row =
    `<div class="${cls}" style="padding-left:${pad}px"${navAttr} data-path="${esc(node.name)}">` +
    `${toggle}<span class="sv-icon">${icon}</span><span class="sv-title">${esc(node.title)}</span></div>`;
  let childrenHtml = "";
  if (hasChildren) {
    childrenHtml = `<div class="sv-children${isCollapsed ? " sv-collapsed" : ""}">` +
      node.children.map((c) => renderNode(c, depth + 1, collapsed)).join("") +
      `</div>`;
  }
  return `<div class="sv-node">${row}${childrenHtml}</div>`;
}

const PANEL_CSS = `
  html, body { background: #0a0a0d !important; margin: 0; }
  .sv-root, .sv-root * {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
  }
  .sv-root {
    color: var(--root-color, #c8d3f5);
    background: #0a0a0d;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    user-select: none;
  }
  .sv-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; font-weight: 700; letter-spacing: .3px;
    border-bottom: 1px solid var(--ui-surface-border-color, #2a2e3f);
    color: var(--root-color, #e6ecff);
  }
  .sv-brand { display:flex; align-items:center; gap:7px; font-size:14px; }
  .sv-brand .dot { color: var(--ui-accent-color, #7aa2f7); }
  .sv-actions { display:flex; gap:4px; }
  .sv-btn {
    background: transparent; border: none; color: var(--ui-surface-subtle-color, #8a93a6);
    cursor: pointer; font-size: 16px; line-height: 1; padding: 3px 6px; border-radius: 6px;
  }
  .sv-btn:hover { background: var(--subtle-background-color, rgba(255,255,255,.07)); color: var(--root-color,#fff); }
  .sv-tree { overflow-y: auto; padding: 6px 4px 20px; flex: 1; }
  .sv-row {
    display: flex; align-items: center; gap: 6px; padding: 4px 8px 4px 8px;
    border-radius: 7px; cursor: pointer; white-space: nowrap; overflow: hidden;
    line-height: 1.3; margin: 1px 4px;
  }
  .sv-row:hover { background: var(--subtle-background-color, rgba(255,255,255,.07)); }
  .sv-current { background: var(--subtle-background-color, rgba(122,162,247,.18)); }
  .sv-current .sv-title { color: var(--ui-accent-color, #7aa2f7); font-weight:600; }
  .sv-toggle { width: 14px; display:inline-flex; justify-content:center; color: var(--ui-surface-subtle-color,#8a93a6); font-size: 10px; flex: 0 0 auto; }
  .sv-toggle-empty { visibility: hidden; }
  .sv-icon { flex: 0 0 auto; font-size: 15px; width: 18px; text-align:center; }
  .sv-title { overflow: hidden; text-overflow: ellipsis; }
  .sv-children.sv-collapsed { display: none; }
  .sv-empty { padding: 16px 14px; color: var(--ui-surface-subtle-color,#8a93a6); font-size: 13px; }
  .sv-menu {
    position: fixed; z-index: 9999; min-width: 180px;
    background: #1a1b26; border: 1px solid #2a2e3f; border-radius: 9px;
    box-shadow: 0 8px 28px rgba(0,0,0,.55); padding: 5px; display: none;
  }
  .sv-menu-item {
    display: flex; align-items: center; gap: 9px; padding: 8px 11px;
    border-radius: 6px; cursor: pointer; font-size: 13.5px; color: var(--root-color,#c8d3f5);
  }
  .sv-menu-item:hover { background: rgba(255,255,255,.07); }
  .sv-menu-item.danger { color: #f87171; }
  .sv-menu-sep { height: 1px; background: #2a2e3f; margin: 4px 6px; }
`;

const PANEL_JS = `
var svTarget = null;
function svParent(name){ return name.indexOf('/') >= 0 ? name.slice(0, name.lastIndexOf('/')) : ''; }
function svHideMenu(){ var m=document.getElementById('sv-menu'); if(m) m.style.display='none'; }
function svInit() {
  var root = document.querySelector('.sv-root');
  if (!root) return;
  root.addEventListener('click', function(e) {
    svHideMenu();
    var tg = e.target.closest('.sv-toggle');
    if (tg && tg.dataset.toggle !== undefined) {
      e.stopPropagation();
      var node = tg.closest('.sv-node');
      var kids = node && node.querySelector(':scope > .sv-children');
      if (kids) {
        var nowCollapsed = kids.classList.toggle('sv-collapsed');
        tg.textContent = nowCollapsed ? '\\u25B8' : '\\u25BE';
        svPersistCollapsed();
      }
      return;
    }
    var row = e.target.closest('.sv-row');
    if (row && row.dataset.nav !== undefined) {
      syscall('editor.navigate', row.dataset.nav, false, false);
    }
  });
  // right-click context menu
  root.addEventListener('contextmenu', function(e){
    var row = e.target.closest('.sv-row');
    if (!row) return;
    e.preventDefault();
    var node = row.closest('.sv-node');
    var hasChildren = !!(node && node.querySelector(':scope > .sv-children'));
    svTarget = { name: row.dataset.path, hasChildren: hasChildren };
    var m = document.getElementById('sv-menu');
    m.style.display = 'block';
    var mw = m.offsetWidth || 190, mh = m.offsetHeight || 120;
    var x = Math.min(e.clientX, window.innerWidth - mw - 6);
    var y = Math.min(e.clientY, window.innerHeight - mh - 6);
    m.style.left = x + 'px'; m.style.top = y + 'px';
  });
  var menu = document.getElementById('sv-menu');
  if (menu) menu.addEventListener('click', function(e){
    e.stopPropagation();
    var it = e.target.closest('.sv-menu-item');
    if(!it || !svTarget) return;
    var act = it.dataset.act, name = svTarget.name;
    svHideMenu();
    if (act === 'delete') syscall('system.invokeFunction', 'canopy.deleteItem', name);
    else if (act === 'rename') syscall('system.invokeFunction', 'canopy.renameItem', name);
    else if (act === 'newpage') {
      var folder = svTarget.hasChildren ? name : svParent(name);
      syscall('system.invokeFunction', 'canopy.newPageIn', folder);
    }
  });
  document.addEventListener('click', svHideMenu);
  document.addEventListener('scroll', svHideMenu, true);
  var np = document.getElementById('sv-new-page');
  if (np) np.addEventListener('click', function(){ syscall('system.invokeFunction', 'canopy.newPage'); });
  var nf = document.getElementById('sv-new-folder');
  if (nf) nf.addEventListener('click', function(){ syscall('system.invokeFunction', 'canopy.newFolder'); });
  var rf = document.getElementById('sv-refresh');
  if (rf) rf.addEventListener('click', function(){ syscall('system.invokeFunction', 'canopy.show'); });
}
function svPersistCollapsed() {
  var collapsed = [];
  document.querySelectorAll('.sv-children.sv-collapsed').forEach(function(ch){
    var node = ch.closest('.sv-node');
    var row = node && node.querySelector(':scope > .sv-row');
    if (row && row.dataset.path) collapsed.push(row.dataset.path);
  });
  syscall('clientStore.set', 'canopy.collapsed', collapsed);
}
svInit();
`;

// ---------------------------------------------------------------------------
// Public functions
// ---------------------------------------------------------------------------

export async function show() {
  const { nodes } = await buildTree();
  const collapsed = new Set(await getCollapsed());

  const body = nodes.length
    ? nodes.map((n) => renderNode(n, 0, collapsed)).join("")
    : `<div class="sv-empty">No hay páginas todavía.<br>Pulsa ＋ para crear una.</div>`;

  const html = `
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${PANEL_CSS}</style>
    <div class="sv-root">
      <div class="sv-header">
        <div class="sv-brand"><span class="dot">●</span> Canopy</div>
        <div class="sv-actions">
          <button class="sv-btn" id="sv-new-folder" title="Nueva carpeta">\u{1F4C1}</button>
          <button class="sv-btn" id="sv-new-page" title="Nueva página">＋</button>
          <button class="sv-btn" id="sv-refresh" title="Refrescar">↻</button>
        </div>
      </div>
      <div class="sv-tree">${body}</div>
      <div class="sv-menu" id="sv-menu">
        <div class="sv-menu-item" data-act="newpage">＋  Nueva página aquí</div>
        <div class="sv-menu-item" data-act="rename">✏️  Renombrar</div>
        <div class="sv-menu-sep"></div>
        <div class="sv-menu-item danger" data-act="delete">\u{1F5D1}️  Borrar</div>
      </div>
    </div>`;

  await editor.showPanel(POSITION, SIZE, html, PANEL_JS);
  await setEnabled(true);
}

export async function hide() {
  await editor.hidePanel(POSITION);
  await setEnabled(false);
}

export async function toggle() {
  if (await isEnabled()) {
    await hide();
  } else {
    await show();
  }
}

export async function showIfEnabled() {
  try {
    if (await isEnabled()) await show();
  } catch (err) {
    console.error("Canopy showIfEnabled failed", err);
  }
}

/**
 * Works out which folder new items should be created in, based on the page
 * currently open in the editor.
 */
async function currentFolder(): Promise<string> {
  const cur = await editor.getCurrentPage();
  if (cur.includes("/")) return cur.slice(0, cur.lastIndexOf("/"));
  try {
    const pages = (await space.listPages()) as PageMeta[];
    if (pages.some((p) => p.name.startsWith(cur + "/"))) return cur;
  } catch {
    // ignore
  }
  return "";
}

export async function newPage() {
  const name = await editor.prompt("Nombre de la nueva página:");
  if (!name) return;
  const folder = await currentFolder();
  const target = folder ? `${folder}/${name}` : name;
  await space.writePage(target, `# ${name}\n\n`);
  await flushSync();
  await editor.navigate(target);
  await show();
}

export async function newFolder() {
  const name = await editor.prompt("Nombre de la nueva carpeta:");
  if (!name) return;
  const parent = await currentFolder();
  const base = parent ? `${parent}/${name}` : name;
  // Create a folder-note (holds the icon) plus a first page inside it.
  await space.writePage(base, `---\nicon: "\u{1F4C1}"\n---\n\n# ${name}\n\n`);
  await space.writePage(`${base}/Untitled`, `# Untitled\n\n`);
  await flushSync();
  await editor.navigate(base);
  await show();
}

export async function newPageIn(folder: string) {
  const name = await editor.prompt("Nombre de la nueva página:");
  if (!name) return;
  const target = folder ? `${folder}/${name}` : name;
  await space.writePage(target, `# ${name}\n\n`);
  await flushSync();
  await editor.navigate(target);
  await show();
}

export async function deleteItem(name: string) {
  if (!name) return;
  const pages = (await space.listPages()) as PageMeta[];
  const targets = pages
    .filter((p) => p.name === name || p.name.startsWith(name + "/"))
    .map((p) => p.name);
  if (targets.length === 0) return;
  const msg = targets.length > 1
    ? `¿Borrar la carpeta "${name}" y sus ${targets.length} páginas? Esto no se puede deshacer.`
    : `¿Borrar "${name}"? Esto no se puede deshacer.`;
  const ok = await editor.confirm(msg, { destructive: true });
  if (!ok) return;
  for (const t of targets) {
    try {
      await space.deletePage(t);
    } catch (err) {
      console.error("Canopy deleteItem", t, err);
    }
  }
  await flushSync();
  await show();
}

export async function renameItem(name: string) {
  if (!name) return;
  const last = name.includes("/") ? name.slice(name.lastIndexOf("/") + 1) : name;
  const prefix = name.includes("/") ? name.slice(0, name.lastIndexOf("/") + 1) : "";
  const input = await editor.prompt("Nuevo nombre:", last);
  if (!input || input === last) return;
  const newName = prefix + input;

  const pages = (await space.listPages()) as PageMeta[];
  const targets = pages.filter(
    (p) => p.name === name || p.name.startsWith(name + "/"),
  );
  for (const p of targets) {
    const newPath = p.name === name
      ? newName
      : newName + p.name.slice(name.length);
    try {
      const content = await space.readPage(p.name);
      await space.writePage(newPath, content);
      await space.deletePage(p.name);
    } catch (err) {
      console.error("Canopy renameItem", p.name, err);
    }
  }
  await flushSync();
  await editor.navigate(newName);
  await show();
}

// ---------------------------------------------------------------------------
// Table of contents / outline (right-hand panel)
// ---------------------------------------------------------------------------

async function isTocEnabled(): Promise<boolean> {
  const v = await clientStore.get(TOC_ENABLED_KEY);
  return v === undefined || v === null ? true : !!v;
}

const TOC_CSS = `
  html, body { background: #0a0a0d !important; margin: 0; }
  .toc-root, .toc-root * {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
  }
  .toc-root {
    color: var(--root-color, #c8d3f5); background: #0a0a0d;
    height: 100%; display: flex; flex-direction: column; font-size: 13.5px;
  }
  .toc-header {
    padding: 10px 12px; font-weight: 700; letter-spacing: .3px;
    border-bottom: 1px solid var(--ui-surface-border-color, #2a2e3f);
    display: flex; align-items: center; gap: 7px; color: var(--root-color,#e6ecff);
  }
  .toc-header .dot { color: var(--ui-accent-color,#7aa2f7); }
  .toc-list { overflow-y: auto; padding: 8px 6px 20px; flex: 1; }
  .toc-item {
    padding: 5px 10px; border-radius: 6px; cursor: pointer;
    color: var(--ui-surface-subtle-color,#9aa3b4); white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; line-height: 1.35; border-left: 2px solid transparent;
  }
  .toc-item:hover { background: var(--subtle-background-color, rgba(255,255,255,.07)); color: var(--root-color,#fff); }
  .toc-l1 { font-weight: 600; color: var(--root-color,#c8d3f5); padding-left: 10px; }
  .toc-l2 { padding-left: 24px; }
  .toc-l3 { padding-left: 38px; font-size: 12.5px; }
  .toc-empty { padding: 16px 14px; color: var(--ui-surface-subtle-color,#8a93a6); font-size: 13px; }
`;

const TOC_JS = `
(function(){
  var root = document.querySelector('.toc-root');
  if (!root) return;
  root.addEventListener('click', function(e){
    var it = e.target.closest('.toc-item');
    if (it && it.dataset.ref) syscall('editor.navigate', it.dataset.ref, false, false);
  });
})();
`;

export async function showToc() {
  const page = await editor.getCurrentPage();
  let text = "";
  try {
    text = await editor.getText();
  } catch {
    try {
      text = await space.readPage(page);
    } catch {
      text = "";
    }
  }
  const headings = parseHeadings(text);
  const body = headings.length
    ? headings.map((h) =>
      `<div class="toc-item toc-l${h.level}" data-ref="${esc(page + "#" + h.text)}" title="${esc(h.text)}">${esc(h.text)}</div>`
    ).join("")
    : `<div class="toc-empty">Sin encabezados en esta nota.</div>`;

  const html = `
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${TOC_CSS}</style>
    <div class="toc-root">
      <div class="toc-header"><span class="dot">☰</span> Contenido</div>
      <div class="toc-list">${body}</div>
    </div>`;

  await editor.showPanel(TOC_POSITION, TOC_SIZE, html, TOC_JS);
  await clientStore.set(TOC_ENABLED_KEY, true);
}

export async function hideToc() {
  await editor.hidePanel(TOC_POSITION);
  await clientStore.set(TOC_ENABLED_KEY, false);
}

export async function toggleToc() {
  if (await isTocEnabled()) {
    await hideToc();
  } else {
    await showToc();
  }
}

export async function showTocIfEnabled() {
  try {
    if (await isTocEnabled()) await showToc();
  } catch (err) {
    console.error("Canopy showTocIfEnabled failed", err);
  }
}
