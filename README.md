# 🌳 Canopy

An **Obsidian-style sidebar** for [SilverBullet](https://silverbullet.md) v2.

Canopy adds a persistent, collapsible **folder tree** to the left of your space —
with per-page icons, a clean dark look, and right-click actions to create, rename
and delete pages and folders. It turns SilverBullet's editor into something that
feels a lot more like Obsidian's file explorer.

![Canopy sidebar](screenshot.png)

## Features

- 🗂️ **Folder tree** with collapsible folders (state is remembered per browser)
- 🧭 **Outline / table of contents** on the right — auto-detects `H1`–`H3`
  headings in the current note, indented by level; click to jump
- 📁 **Folder / 📄 note icons** so the hierarchy reads at a glance
- ⚫ **Clean dark UI** that blends into a near-black theme
- ➕ **Create pages and folders** right inside the folder you're in
- ✏️ **Rename** pages and whole folders (moves all sub-pages)
- 🗑️ **Delete** with confirmation (folders warn how many pages they contain)
- ⚡ **Instant sync** — changes hit the server immediately (`sync.performSpaceSync`)
- 📍 Current page highlighting

## Install

In your `CONFIG` page, add Canopy to your plugs list and reload:

```lua
config.set {
  plugs = {
    "github:sud0pls/canopy/canopy.plug.js"
  }
}
```

Then run the **`Plugs: Update`** command (or drop `canopy.plug.js` into your
space's `_plug/` folder manually) and reload the client.

The sidebar is shown by default. Toggle it with **`Canopy: Toggle Sidebar`**
(`Ctrl-Alt-s` / `Cmd-Alt-s`), or add a top-bar button:

```lua
actionButton.define {
  icon = "sidebar",
  description = "Toggle Canopy",
  run = function() editor.invokeCommand("Canopy: Toggle Sidebar") end
}
```

## Commands

| Command | Shortcut | What it does |
|---|---|---|
| `Canopy: Toggle Sidebar` | `Ctrl-Alt-s` | Show / hide the sidebar |
| `Canopy: Toggle Outline` | — | Show / hide the outline panel |
| `Canopy: New Page` | — | New page in the current folder |
| `Canopy: New Folder` | — | New folder in the current folder |

You can also **right-click** any item in the tree for *New page here*,
*Rename* and *Delete*.

## Build

Canopy is a standard SilverBullet plug (TypeScript, compiled with the
`@silverbulletmd/silverbullet` npm toolchain):

```bash
npm install
npx plug-compile canopy.plug.yaml   # → canopy.plug.js
```

## License

MIT — see [LICENSE](LICENSE).
