var Z=Object.defineProperty;var w=(e,r)=>{for(var o in r)Z(e,o,{get:r[o],enumerable:!0})};function ee(e){let r=atob(e),o=r.length,n=new Uint8Array(o);for(let s=0;s<o;s++)n[s]=r.charCodeAt(s);return n}function M(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let r="",o=e.byteLength;for(let n=0;n<o;n++)r+=String.fromCharCode(e[n]);return btoa(r)}var Co=new Uint8Array(16),te=class{constructor(e="",r=1e3){this.prefix=e,this.maxCaptureSize=r,this.prefix=e,this.originalConsole={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},this.patchConsole()}prefix;maxCaptureSize;originalConsole;logBuffer=[];patchConsole(){let e=r=>(...o)=>{let n=this.prefix?[this.prefix,...o]:o;this.originalConsole[r](...n),this.captureLog(r,o)};console.log=e("log"),console.info=e("info"),console.warn=e("warn"),console.error=e("error"),console.debug=e("debug")}captureLog(e,r){let o={level:e,timestamp:Date.now(),message:r.map(n=>{if(typeof n=="string")return n;try{return JSON.stringify(n)}catch{return String(n)}}).join(" ")};this.logBuffer.push(o),this.logBuffer.length>this.maxCaptureSize&&this.logBuffer.shift()}async postToServer(e,r){if(this.logBuffer.length>0){let n=[...this.logBuffer];this.logBuffer=[];try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.map(i=>({...i,source:r})))})).ok)throw new Error("Failed to post logs to server")}catch(s){console.warn("Could not post logs to server",s.message),this.logBuffer.unshift(...n)}}}},A;function re(e=""){return A=new te(e),A}var v=e=>{throw new Error("Not initialized yet")},L=typeof window>"u"&&typeof globalThis.WebSocketPair>"u",T=new Map,S=0;L&&(globalThis.syscall=async(e,...r)=>await new Promise((o,n)=>{S++,T.set(S,{resolve:o,reject:n}),v({type:"sys",id:S,name:e,args:r})}));function R(e,r,o){L&&(v=o,self.addEventListener("message",n=>{(async()=>{let s=n.data;switch(s.type){case"inv":{let i=e[s.name];if(!i)throw new Error(`Function not loaded: ${s.name}`);try{let a=await Promise.resolve(i(...s.args||[]));v({type:"invr",id:s.id,result:a})}catch(a){console.error("An exception was thrown as a result of invoking function",s.name,"error:",a.message),v({type:"invr",id:s.id,error:a.message})}}break;case"sysr":{let i=s.id,a=T.get(i);if(!a)throw Error("Invalid request id");T.delete(i),s.error?a.reject(new Error(s.error)):a.resolve(s.result)}break}})().catch(console.error)}),v({type:"manifest",manifest:r}),re(`[${r.name} plug]`))}async function oe(e,r){if(typeof e!="string"){let o=new Uint8Array(await e.arrayBuffer()),n=o.length>0?M(o):void 0;r={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:n},e=e.url}return syscall("sandboxFetch.fetch",e,r)}globalThis.nativeFetch=globalThis.fetch;function ne(){globalThis.fetch=async(e,r)=>{let o=r?.body?M(new Uint8Array(await new Response(r.body).arrayBuffer())):void 0,n=await oe(e,r&&{method:r.method,headers:r.headers,base64Body:o});return new Response(n.base64Body?ee(n.base64Body):null,{status:n.status,headers:n.headers})}}L&&ne();var l={};w(l,{acceptCompletion:()=>Zt,alert:()=>Xe,closeCompletion:()=>tr,configureVimMode:()=>or,confirm:()=>Ye,copyToClipboard:()=>lt,cursorCharLeft:()=>xt,cursorCharRight:()=>vt,cursorDocEnd:()=>Lt,cursorDocStart:()=>Tt,cursorGroupLeft:()=>Pt,cursorGroupRight:()=>ht,cursorLineBoundaryLeft:()=>wt,cursorLineBoundaryRight:()=>bt,cursorLineDown:()=>kt,cursorLineEnd:()=>St,cursorLineStart:()=>Ct,cursorLineUp:()=>Et,cursorPageDown:()=>At,cursorPageUp:()=>Ft,deleteCharBackward:()=>qt,deleteCharForward:()=>_t,deleteGroupBackward:()=>Ht,deleteGroupForward:()=>zt,deleteLine:()=>ut,deleteLineBoundaryBackward:()=>Wt,deleteLineBoundaryForward:()=>Jt,dispatch:()=>We,downloadFile:()=>Be,downloadSpaceFile:()=>Ie,filterBox:()=>Oe,flashNotification:()=>Ue,focus:()=>Ke,fold:()=>tt,foldAll:()=>nt,forceLint:()=>Le,getCurrentEditor:()=>pe,getCurrentPage:()=>ie,getCurrentPageMeta:()=>se,getCurrentPath:()=>ae,getCursor:()=>ge,getDocumentCapabilities:()=>de,getFocusedPanelSlot:()=>je,getLastOpenedMap:()=>le,getRecentlyOpenedPages:()=>ce,getSelection:()=>ye,getText:()=>me,getUiOption:()=>Ze,getViewableExtensions:()=>ue,goHistory:()=>Re,hidePanel:()=>Ne,hideProgress:()=>Qe,indentLess:()=>mt,indentMore:()=>pt,insertAtCursor:()=>ze,insertAtPos:()=>Ve,insertNewline:()=>Xt,invokeCommand:()=>ve,isMobile:()=>ir,isNarrowScreen:()=>sr,moveCursor:()=>_e,moveCursorToLine:()=>He,moveLineDown:()=>yt,moveLineUp:()=>gt,navigate:()=>he,newWindow:()=>Me,open:()=>we,openCommandPalette:()=>Ce,openNavigator:()=>Se,openPageNavigator:()=>be,openSearchPanel:()=>ct,openUrl:()=>Ae,prompt:()=>Je,rebuildEditorState:()=>ke,redo:()=>at,reloadConfigAndCommands:()=>Fe,reloadPage:()=>Te,reloadUI:()=>Ee,replaceRange:()=>qe,save:()=>Pe,selectAll:()=>dt,selectCharLeft:()=>Mt,selectCharRight:()=>Rt,selectDocEnd:()=>Kt,selectDocStart:()=>Nt,selectGroupLeft:()=>Bt,selectGroupRight:()=>It,selectLineBoundaryLeft:()=>Dt,selectLineBoundaryRight:()=>Ut,selectLineDown:()=>Gt,selectLineEnd:()=>$t,selectLineStart:()=>Ot,selectLineUp:()=>jt,selectPageDown:()=>Vt,selectPageUp:()=>Qt,sendMessage:()=>nr,setSelection:()=>xe,setText:()=>fe,setUiOption:()=>et,showPanel:()=>$e,showProgress:()=>Ge,startCompletion:()=>er,toggleComment:()=>ft,toggleFold:()=>ot,transposeChars:()=>Yt,undo:()=>st,unfold:()=>rt,unfoldAll:()=>it,uploadFile:()=>De,vimEx:()=>rr});typeof globalThis.syscall>"u"&&(globalThis.syscall=()=>{throw new Error("Not implemented here")});function t(e,...r){return globalThis.syscall(e,...r)}function ie(){return t("editor.getCurrentPage")}function se(){return t("editor.getCurrentPageMeta")}function ae(){return t("editor.getCurrentPath")}function ce(){return t("editor.getRecentlyOpenedPages")}function le(){return t("editor.getLastOpenedMap")}function ue(){return t("editor.getViewableExtensions")}function de(e){return t("editor.getDocumentCapabilities",e)}function pe(){return t("editor.getCurrentEditor")}function me(){return t("editor.getText")}function fe(e,r=!1){return t("editor.setText",e,r)}function ge(){return t("editor.getCursor")}function ye(){return t("editor.getSelection")}function xe(e,r){return t("editor.setSelection",e,r)}function ve(e,r){return t("editor.invokeCommand",e,r)}function Pe(){return t("editor.save")}function he(e,r=!1,o=!1){return t("editor.navigate",e,r,o)}function we(e,r=!1,o=!1){return t("editor.open",e,r,o)}function be(e="page"){return t("editor.openPageNavigator",e)}function Ce(){return t("editor.openCommandPalette")}function Se(e,r){return t("editor.openNavigator",e,r)}function Te(){return t("editor.reloadPage")}function Le(){return t("editor.forceLint")}function Ee(){return t("editor.reloadUI")}function ke(){return t("editor.rebuildEditorState")}function Fe(){return t("editor.reloadConfigAndCommands")}function Ae(e,r=!1){return t("editor.openUrl",e,r)}function Me(){return t("editor.newWindow")}function Re(e){return t("editor.goHistory",e)}function Be(e,r){return t("editor.downloadFile",e,r)}function Ie(e){return t("editor.downloadSpaceFile",e)}function De(e,r){return t("editor.uploadFile",e,r)}function Ue(e,r="info"){return t("editor.flashNotification",e,r)}function Oe(e,r,o="",n=""){return t("editor.filterBox",e,r,o,n)}function $e(e,r,o,n=""){return t("editor.showPanel",e,r,o,n)}function Ne(e){return t("editor.hidePanel",e)}function Ke(){return t("editor.focus")}function je(){return t("editor.getFocusedPanelSlot")}function Ge(e,r){return t("editor.showProgress",e,r)}function Qe(e){return t("editor.showProgress",e)}function Ve(e,r){return t("editor.insertAtPos",e,r)}function qe(e,r,o){return t("editor.replaceRange",e,r,o)}function _e(e,r=!1){return t("editor.moveCursor",e,r)}function He(e,r=1,o=!1){return t("editor.moveCursorToLine",e,r,o)}function ze(e,r=!1,o=!1){return t("editor.insertAtCursor",e,r,o)}function We(e){return t("editor.dispatch",e)}function Je(e,r=""){return t("editor.prompt",e,r)}function Ye(e,r){return t("editor.confirm",e,r)}function Xe(e){return t("editor.alert",e)}function Ze(e){return t("editor.getUiOption",e)}function et(e,r){return t("editor.setUiOption",e,r)}function tt(){return t("editor.fold")}function rt(){return t("editor.unfold")}function ot(){return t("editor.toggleFold")}function nt(){return t("editor.foldAll")}function it(){return t("editor.unfoldAll")}function st(){return t("editor.undo")}function at(){return t("editor.redo")}function ct(){return t("editor.openSearchPanel")}function lt(e){return t("editor.copyToClipboard",e)}function ut(){return t("editor.deleteLine")}function dt(){return t("editor.selectAll")}function pt(){return t("editor.indentMore")}function mt(){return t("editor.indentLess")}function ft(){return t("editor.toggleComment")}function gt(){return t("editor.moveLineUp")}function yt(){return t("editor.moveLineDown")}function xt(){return t("editor.cursorCharLeft")}function vt(){return t("editor.cursorCharRight")}function Pt(){return t("editor.cursorGroupLeft")}function ht(){return t("editor.cursorGroupRight")}function wt(){return t("editor.cursorLineBoundaryLeft")}function bt(){return t("editor.cursorLineBoundaryRight")}function Ct(){return t("editor.cursorLineStart")}function St(){return t("editor.cursorLineEnd")}function Tt(){return t("editor.cursorDocStart")}function Lt(){return t("editor.cursorDocEnd")}function Et(){return t("editor.cursorLineUp")}function kt(){return t("editor.cursorLineDown")}function Ft(){return t("editor.cursorPageUp")}function At(){return t("editor.cursorPageDown")}function Mt(){return t("editor.selectCharLeft")}function Rt(){return t("editor.selectCharRight")}function Bt(){return t("editor.selectGroupLeft")}function It(){return t("editor.selectGroupRight")}function Dt(){return t("editor.selectLineBoundaryLeft")}function Ut(){return t("editor.selectLineBoundaryRight")}function Ot(){return t("editor.selectLineStart")}function $t(){return t("editor.selectLineEnd")}function Nt(){return t("editor.selectDocStart")}function Kt(){return t("editor.selectDocEnd")}function jt(){return t("editor.selectLineUp")}function Gt(){return t("editor.selectLineDown")}function Qt(){return t("editor.selectPageUp")}function Vt(){return t("editor.selectPageDown")}function qt(){return t("editor.deleteCharBackward")}function _t(){return t("editor.deleteCharForward")}function Ht(){return t("editor.deleteGroupBackward")}function zt(){return t("editor.deleteGroupForward")}function Wt(){return t("editor.deleteLineBoundaryBackward")}function Jt(){return t("editor.deleteLineBoundaryForward")}function Yt(){return t("editor.transposeChars")}function Xt(){return t("editor.insertNewline")}function Zt(){return t("editor.acceptCompletion")}function er(){return t("editor.startCompletion")}function tr(){return t("editor.closeCompletion")}function rr(e){return t("editor.vimEx",e)}function or(){return t("editor.configureVimMode")}function nr(e,r){return t("editor.sendMessage",e,r)}function ir(){return t("editor.isMobile")}function sr(){return t("editor.isNarrowScreen")}var u={};w(u,{collidingBasenames:()=>Fr,createRevisionSnapshot:()=>Dr,deleteDocument:()=>hr,deleteFile:()=>Er,deletePage:()=>fr,fileExists:()=>kr,getDocumentMeta:()=>xr,getFileMeta:()=>Tr,getGitConflictVersion:()=>Kr,getGitConflicts:()=>Or,getGitSyncStatus:()=>Ur,getPageMeta:()=>lr,getRevision:()=>Rr,getRevisionDiff:()=>Br,getSpaceLog:()=>Ir,listDocuments:()=>yr,listFiles:()=>wr,listPages:()=>cr,listPlugs:()=>gr,listRevisions:()=>Mr,lookupPaths:()=>Ar,pageExists:()=>ur,readDocument:()=>vr,readFile:()=>br,readFileWithMeta:()=>Sr,readPage:()=>dr,readPageWithMeta:()=>pr,readRef:()=>Cr,resolveGitConflict:()=>Nr,syncGitNow:()=>$r,writeDocument:()=>Pr,writeFile:()=>Lr,writePage:()=>mr});function cr(){return t("space.listPages")}function lr(e){return t("space.getPageMeta",e)}function ur(e){return t("space.pageExists",e)}function dr(e){return t("space.readPage",e)}function pr(e){return t("space.readPageWithMeta",e)}function mr(e,r){return t("space.writePage",e,r)}function fr(e){return t("space.deletePage",e)}function gr(){return t("space.listPlugs")}function yr(){return t("space.listDocuments")}function xr(e){return t("space.getDocumentMeta",e)}function vr(e){return t("space.readDocument",e)}function Pr(e,r){return t("space.writeDocument",e,r)}function hr(e){return t("space.deleteDocument",e)}function wr(){return t("space.listFiles")}function br(e){return t("space.readFile",e)}function Cr(e){return t("space.readRef",e)}function Sr(e){return t("space.readFileWithMeta",e)}function Tr(e){return t("space.getFileMeta",e)}function Lr(e,r){return t("space.writeFile",e,r)}function Er(e){return t("space.deleteFile",e)}function kr(e){return t("space.fileExists",e)}function Fr(){return t("space.collidingBasenames")}function Ar(e){return t("space.lookupPaths",e)}function Mr(e,r){return t("space.listRevisions",e,r)}function Rr(e,r,o){return t("space.getRevision",e,r,o)}function Br(e,r){return t("space.getRevisionDiff",e,r)}function Ir(e,r){return t("space.getSpaceLog",e,r)}function Dr(){return t("space.createRevisionSnapshot")}function Ur(){return t("space.getGitSyncStatus")}function Or(){return t("space.getGitConflicts")}function $r(){return t("space.syncGitNow")}function Nr(e,r,o,n){return t("space.resolveGitConflict",e,r,o,n)}function Kr(e,r,o){return t("space.getGitConflictVersion",e,r,o)}var m={};w(m,{del:()=>Vr,get:()=>Qr,set:()=>Gr});function Gr(e,r){return t("clientStore.set",e,r)}function Qr(e){return t("clientStore.get",e)}function Vr(e){return t("clientStore.delete",e)}var P={};w(P,{areFilesReadyToIndex:()=>Hr,hasInitialSyncCompleted:()=>_r,isEnabled:()=>qr,performFileSync:()=>zr,performSpaceSync:()=>Wr});function qr(){return t("sync.isEnabled")}function _r(){return t("sync.hasInitialSyncCompleted")}function Hr(e){return t("sync.areFilesReadyToIndex",e)}function zr(e,r,o){return t("sync.performFileSync",e,r,o)}function Wr(){return t("sync.performSpaceSync")}var Do=new Uint8Array(16);async function h(){try{await P.isEnabled()&&await P.performSpaceSync()}catch{}}var B="canopy.enabled",lo="canopy.collapsed",I="lhs",uo=.3,E="canopy.toc.enabled",D="rhs",po=.22;function mo(e){let r=e.split(`
`),o=[],n=!1,s=!1;for(let i=0;i<r.length;i++){let a=r[i];if(i===0&&a.trim()==="---"){s=!0;continue}if(s){a.trim()==="---"&&(s=!1);continue}if(/^\s*(```|~~~)/.test(a)){n=!n;continue}if(n)continue;let c=/^(#{1,3})\s+(.*\S)\s*$/.exec(a);c&&o.push({level:c[1].length,text:c[2].trim()})}return o}var fo=/^(Library($|\/)|CONFIG$|SETTINGS$|index$)/;async function U(){let e=await m.get(B);return e==null?!0:!!e}async function O(e){await m.set(B,e)}async function go(){return await m.get(lo)??[]}function yo(e){return!e.isPage||e.children.length>0?"\u{1F4C1}":"\u{1F4C4}"}async function xo(){let e=await l.getCurrentPage(),r=await u.listPages(),o={name:"",title:"",isPage:!1,isCurrent:!1,children:[]},n=r.filter(i=>!fo.test(i.name)).filter(i=>!(i.tags??[]).includes("meta")).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=i.name.split("/"),c=o;a.forEach((p,d)=>{let C=d===a.length-1,x=a.slice(0,d+1).join("/"),g=c.children.find(X=>X.title===p);g||(g={name:x,title:p,isPage:!1,isCurrent:e===x,children:[]},c.children.push(g)),C&&(g.isPage=!0,g.isCurrent=e===i.name),c=g})}let s=i=>{i.sort((a,c)=>{let p=a.children.length>0?0:1,d=c.children.length>0?0:1;return p!==d?p-d:a.title.localeCompare(c.title)}),i.forEach(a=>s(a.children))};return s(o.children),{nodes:o.children,currentPage:e}}function y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $(e,r,o){let n=e.children.length>0,s=o.has(e.name),i=yo(e),a=8+r*14,c=n?`<span class="sv-toggle" data-toggle="${y(e.name)}">${s?"\u25B8":"\u25BE"}</span>`:'<span class="sv-toggle sv-toggle-empty"></span>',p=e.isPage?` data-nav="${y(e.name)}"`:"",C=`<div class="${`sv-row${e.isCurrent?" sv-current":""}${e.isPage?"":" sv-folder-only"}`}" style="padding-left:${a}px"${p} data-path="${y(e.name)}">${c}<span class="sv-icon">${i}</span><span class="sv-title">${y(e.title)}</span></div>`,x="";return n&&(x=`<div class="sv-children${s?" sv-collapsed":""}">`+e.children.map(g=>$(g,r+1,o)).join("")+"</div>"),`<div class="sv-node">${C}${x}</div>`}var vo=`
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
`,Po=`
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
`;async function f(){let{nodes:e}=await xo(),r=new Set(await go()),o=e.length?e.map(s=>$(s,0,r)).join(""):'<div class="sv-empty">No hay p\xE1ginas todav\xEDa.<br>Pulsa \uFF0B para crear una.</div>',n=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${vo}</style>
    <div class="sv-root">
      <div class="sv-header">
        <div class="sv-brand"><span class="dot">\u25CF</span> Canopy</div>
        <div class="sv-actions">
          <button class="sv-btn" id="sv-new-folder" title="Nueva carpeta">\u{1F4C1}</button>
          <button class="sv-btn" id="sv-new-page" title="Nueva p\xE1gina">\uFF0B</button>
          <button class="sv-btn" id="sv-refresh" title="Refrescar">\u21BB</button>
        </div>
      </div>
      <div class="sv-tree">${o}</div>
      <div class="sv-menu" id="sv-menu">
        <div class="sv-menu-item" data-act="newpage">\uFF0B  Nueva p\xE1gina aqu\xED</div>
        <div class="sv-menu-item" data-act="rename">\u270F\uFE0F  Renombrar</div>
        <div class="sv-menu-sep"></div>
        <div class="sv-menu-item danger" data-act="delete">\u{1F5D1}\uFE0F  Borrar</div>
      </div>
    </div>`;await l.showPanel(I,uo,n,Po),await O(!0)}async function k(){await l.hidePanel(I),await O(!1)}async function N(){await U()?await k():await f()}async function K(){try{await U()&&await f()}catch(e){console.error("Canopy showIfEnabled failed",e)}}async function j(){let e=await l.getCurrentPage();if(e.includes("/"))return e.slice(0,e.lastIndexOf("/"));try{if((await u.listPages()).some(o=>o.name.startsWith(e+"/")))return e}catch{}return""}async function G(){let e=await l.prompt("Nombre de la nueva p\xE1gina:");if(!e)return;let r=await j(),o=r?`${r}/${e}`:e;await u.writePage(o,`# ${e}

`),await h(),await l.navigate(o),await f()}async function Q(){let e=await l.prompt("Nombre de la nueva carpeta:");if(!e)return;let r=await j(),o=r?`${r}/${e}`:e;await u.writePage(o,`---
icon: "\u{1F4C1}"
---

# ${e}

`),await u.writePage(`${o}/Untitled`,`# Untitled

`),await h(),await l.navigate(o),await f()}async function V(e){let r=await l.prompt("Nombre de la nueva p\xE1gina:");if(!r)return;let o=e?`${e}/${r}`:r;await u.writePage(o,`# ${r}

`),await h(),await l.navigate(o),await f()}async function q(e){if(!e)return;let o=(await u.listPages()).filter(i=>i.name===e||i.name.startsWith(e+"/")).map(i=>i.name);if(o.length===0)return;let n=o.length>1?`\xBFBorrar la carpeta "${e}" y sus ${o.length} p\xE1ginas? Esto no se puede deshacer.`:`\xBFBorrar "${e}"? Esto no se puede deshacer.`;if(await l.confirm(n,{destructive:!0})){for(let i of o)try{await u.deletePage(i)}catch(a){console.error("Canopy deleteItem",i,a)}await h(),await f()}}async function _(e){if(!e)return;let r=e.includes("/")?e.slice(e.lastIndexOf("/")+1):e,o=e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",n=await l.prompt("Nuevo nombre:",r);if(!n||n===r)return;let s=o+n,a=(await u.listPages()).filter(c=>c.name===e||c.name.startsWith(e+"/"));for(let c of a){let p=c.name===e?s:s+c.name.slice(e.length);try{let d=await u.readPage(c.name);await u.writePage(p,d),await u.deletePage(c.name)}catch(d){console.error("Canopy renameItem",c.name,d)}}await h(),await l.navigate(s),await f()}async function H(){let e=await m.get(E);return e==null?!0:!!e}var ho=`
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
`,wo=`
(function(){
  var root = document.querySelector('.toc-root');
  if (!root) return;
  root.addEventListener('click', function(e){
    var it = e.target.closest('.toc-item');
    if (it && it.dataset.ref) syscall('editor.navigate', it.dataset.ref, false, false);
  });
})();
`;async function b(){let e=await l.getCurrentPage(),r="";try{r=await l.getText()}catch{try{r=await u.readPage(e)}catch{r=""}}let o=mo(r),n=o.length?o.map(i=>`<div class="toc-item toc-l${i.level}" data-ref="${y(e+"#"+i.text)}" title="${y(i.text)}">${y(i.text)}</div>`).join(""):'<div class="toc-empty">Sin encabezados en esta nota.</div>',s=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${ho}</style>
    <div class="toc-root">
      <div class="toc-header"><span class="dot">\u2630</span> Contenido</div>
      <div class="toc-list">${n}</div>
    </div>`;await l.showPanel(D,po,s,wo),await m.set(E,!0)}async function F(){await l.hidePanel(D),await m.set(E,!1)}async function z(){await H()?await F():await b()}async function W(){try{await H()&&await b()}catch(e){console.error("Canopy showTocIfEnabled failed",e)}}var J={show:f,hide:k,showIfEnabled:K,toggle:N,newPage:G,newFolder:Q,deleteItem:q,renameItem:_,newPageIn:V,showToc:b,hideToc:F,showTocIfEnabled:W,toggleToc:z},Y={name:"canopy",functions:{show:{path:"./canopy.ts:show"},hide:{path:"./canopy.ts:hide"},showIfEnabled:{path:"./canopy.ts:showIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved","file:deleted"]},toggle:{path:"./canopy.ts:toggle",command:{name:"Canopy: Toggle Sidebar",key:"Ctrl-Alt-s",mac:"Cmd-Alt-s"}},newPage:{path:"./canopy.ts:newPage",command:{name:"Canopy: New Page"}},newFolder:{path:"./canopy.ts:newFolder",command:{name:"Canopy: New Folder"}},deleteItem:{path:"./canopy.ts:deleteItem"},renameItem:{path:"./canopy.ts:renameItem"},newPageIn:{path:"./canopy.ts:newPageIn"},showToc:{path:"./canopy.ts:showToc"},hideToc:{path:"./canopy.ts:hideToc"},showTocIfEnabled:{path:"./canopy.ts:showTocIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved"]},toggleToc:{path:"./canopy.ts:toggleToc",command:{name:"Canopy: Toggle Outline"}}},assets:{}},yn={manifest:Y,functionMapping:J};R(J,Y,self.postMessage);export{yn as plug};
//# sourceMappingURL=canopy.plug.js.map
