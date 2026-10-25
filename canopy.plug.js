var z=Object.defineProperty;var w=(e,r)=>{for(var o in r)z(e,o,{get:r[o],enumerable:!0})};function J(e){let r=atob(e),o=r.length,n=new Uint8Array(o);for(let s=0;s<o;s++)n[s]=r.charCodeAt(s);return n}function k(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let r="",o=e.byteLength;for(let n=0;n<o;n++)r+=String.fromCharCode(e[n]);return btoa(r)}var fo=new Uint8Array(16),Y=class{constructor(e="",r=1e3){this.prefix=e,this.maxCaptureSize=r,this.prefix=e,this.originalConsole={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},this.patchConsole()}prefix;maxCaptureSize;originalConsole;logBuffer=[];patchConsole(){let e=r=>(...o)=>{let n=this.prefix?[this.prefix,...o]:o;this.originalConsole[r](...n),this.captureLog(r,o)};console.log=e("log"),console.info=e("info"),console.warn=e("warn"),console.error=e("error"),console.debug=e("debug")}captureLog(e,r){let o={level:e,timestamp:Date.now(),message:r.map(n=>{if(typeof n=="string")return n;try{return JSON.stringify(n)}catch{return String(n)}}).join(" ")};this.logBuffer.push(o),this.logBuffer.length>this.maxCaptureSize&&this.logBuffer.shift()}async postToServer(e,r){if(this.logBuffer.length>0){let n=[...this.logBuffer];this.logBuffer=[];try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.map(a=>({...a,source:r})))})).ok)throw new Error("Failed to post logs to server")}catch(s){console.warn("Could not post logs to server",s.message),this.logBuffer.unshift(...n)}}}},A;function X(e=""){return A=new Y(e),A}var P=e=>{throw new Error("Not initialized yet")},F=typeof window>"u"&&typeof globalThis.WebSocketPair>"u",L=new Map,S=0;F&&(globalThis.syscall=async(e,...r)=>await new Promise((o,n)=>{S++,L.set(S,{resolve:o,reject:n}),P({type:"sys",id:S,name:e,args:r})}));function M(e,r,o){F&&(P=o,self.addEventListener("message",n=>{(async()=>{let s=n.data;switch(s.type){case"inv":{let a=e[s.name];if(!a)throw new Error(`Function not loaded: ${s.name}`);try{let u=await Promise.resolve(a(...s.args||[]));P({type:"invr",id:s.id,result:u})}catch(u){console.error("An exception was thrown as a result of invoking function",s.name,"error:",u.message),P({type:"invr",id:s.id,error:u.message})}}break;case"sysr":{let a=s.id,u=L.get(a);if(!u)throw Error("Invalid request id");L.delete(a),s.error?u.reject(new Error(s.error)):u.resolve(s.result)}break}})().catch(console.error)}),P({type:"manifest",manifest:r}),X(`[${r.name} plug]`))}async function Z(e,r){if(typeof e!="string"){let o=new Uint8Array(await e.arrayBuffer()),n=o.length>0?k(o):void 0;r={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:n},e=e.url}return syscall("sandboxFetch.fetch",e,r)}globalThis.nativeFetch=globalThis.fetch;function ee(){globalThis.fetch=async(e,r)=>{let o=r?.body?k(new Uint8Array(await new Response(r.body).arrayBuffer())):void 0,n=await Z(e,r&&{method:r.method,headers:r.headers,base64Body:o});return new Response(n.base64Body?J(n.base64Body):null,{status:n.status,headers:n.headers})}}F&&ee();var l={};w(l,{acceptCompletion:()=>zt,alert:()=>We,closeCompletion:()=>Yt,configureVimMode:()=>Zt,confirm:()=>_e,copyToClipboard:()=>it,cursorCharLeft:()=>mt,cursorCharRight:()=>gt,cursorDocEnd:()=>bt,cursorDocStart:()=>wt,cursorGroupLeft:()=>ft,cursorGroupRight:()=>yt,cursorLineBoundaryLeft:()=>xt,cursorLineBoundaryRight:()=>Pt,cursorLineDown:()=>St,cursorLineEnd:()=>ht,cursorLineStart:()=>vt,cursorLineUp:()=>Ct,cursorPageDown:()=>Ft,cursorPageUp:()=>Lt,deleteCharBackward:()=>jt,deleteCharForward:()=>Gt,deleteGroupBackward:()=>Qt,deleteGroupForward:()=>Vt,deleteLine:()=>st,deleteLineBoundaryBackward:()=>qt,deleteLineBoundaryForward:()=>Ht,dispatch:()=>qe,downloadFile:()=>Ae,downloadSpaceFile:()=>ke,filterBox:()=>Be,flashNotification:()=>Re,focus:()=>Ie,fold:()=>Ye,foldAll:()=>et,forceLint:()=>be,getCurrentEditor:()=>ce,getCurrentPage:()=>te,getCurrentPageMeta:()=>re,getCurrentPath:()=>oe,getCursor:()=>de,getDocumentCapabilities:()=>ae,getFocusedPanelSlot:()=>Oe,getLastOpenedMap:()=>ie,getRecentlyOpenedPages:()=>ne,getSelection:()=>pe,getText:()=>ue,getUiOption:()=>ze,getViewableExtensions:()=>se,goHistory:()=>Te,hidePanel:()=>Ue,hideProgress:()=>Ne,indentLess:()=>ut,indentMore:()=>ct,insertAtCursor:()=>Ve,insertAtPos:()=>$e,insertNewline:()=>Wt,invokeCommand:()=>ge,isMobile:()=>tr,isNarrowScreen:()=>rr,moveCursor:()=>Ge,moveCursorToLine:()=>Qe,moveLineDown:()=>pt,moveLineUp:()=>dt,navigate:()=>ye,newWindow:()=>Ee,open:()=>xe,openCommandPalette:()=>ve,openNavigator:()=>he,openPageNavigator:()=>Pe,openSearchPanel:()=>nt,openUrl:()=>Fe,prompt:()=>He,rebuildEditorState:()=>Se,redo:()=>ot,reloadConfigAndCommands:()=>Le,reloadPage:()=>we,reloadUI:()=>Ce,replaceRange:()=>je,save:()=>fe,selectAll:()=>at,selectCharLeft:()=>Et,selectCharRight:()=>Tt,selectDocEnd:()=>It,selectDocStart:()=>Ut,selectGroupLeft:()=>At,selectGroupRight:()=>kt,selectLineBoundaryLeft:()=>Mt,selectLineBoundaryRight:()=>Rt,selectLineDown:()=>Kt,selectLineEnd:()=>Dt,selectLineStart:()=>Bt,selectLineUp:()=>Ot,selectPageDown:()=>$t,selectPageUp:()=>Nt,sendMessage:()=>er,setSelection:()=>me,setText:()=>le,setUiOption:()=>Je,showPanel:()=>De,showProgress:()=>Ke,startCompletion:()=>Jt,toggleComment:()=>lt,toggleFold:()=>Ze,transposeChars:()=>_t,undo:()=>rt,unfold:()=>Xe,unfoldAll:()=>tt,uploadFile:()=>Me,vimEx:()=>Xt});typeof globalThis.syscall>"u"&&(globalThis.syscall=()=>{throw new Error("Not implemented here")});function t(e,...r){return globalThis.syscall(e,...r)}function te(){return t("editor.getCurrentPage")}function re(){return t("editor.getCurrentPageMeta")}function oe(){return t("editor.getCurrentPath")}function ne(){return t("editor.getRecentlyOpenedPages")}function ie(){return t("editor.getLastOpenedMap")}function se(){return t("editor.getViewableExtensions")}function ae(e){return t("editor.getDocumentCapabilities",e)}function ce(){return t("editor.getCurrentEditor")}function ue(){return t("editor.getText")}function le(e,r=!1){return t("editor.setText",e,r)}function de(){return t("editor.getCursor")}function pe(){return t("editor.getSelection")}function me(e,r){return t("editor.setSelection",e,r)}function ge(e,r){return t("editor.invokeCommand",e,r)}function fe(){return t("editor.save")}function ye(e,r=!1,o=!1){return t("editor.navigate",e,r,o)}function xe(e,r=!1,o=!1){return t("editor.open",e,r,o)}function Pe(e="page"){return t("editor.openPageNavigator",e)}function ve(){return t("editor.openCommandPalette")}function he(e,r){return t("editor.openNavigator",e,r)}function we(){return t("editor.reloadPage")}function be(){return t("editor.forceLint")}function Ce(){return t("editor.reloadUI")}function Se(){return t("editor.rebuildEditorState")}function Le(){return t("editor.reloadConfigAndCommands")}function Fe(e,r=!1){return t("editor.openUrl",e,r)}function Ee(){return t("editor.newWindow")}function Te(e){return t("editor.goHistory",e)}function Ae(e,r){return t("editor.downloadFile",e,r)}function ke(e){return t("editor.downloadSpaceFile",e)}function Me(e,r){return t("editor.uploadFile",e,r)}function Re(e,r="info"){return t("editor.flashNotification",e,r)}function Be(e,r,o="",n=""){return t("editor.filterBox",e,r,o,n)}function De(e,r,o,n=""){return t("editor.showPanel",e,r,o,n)}function Ue(e){return t("editor.hidePanel",e)}function Ie(){return t("editor.focus")}function Oe(){return t("editor.getFocusedPanelSlot")}function Ke(e,r){return t("editor.showProgress",e,r)}function Ne(e){return t("editor.showProgress",e)}function $e(e,r){return t("editor.insertAtPos",e,r)}function je(e,r,o){return t("editor.replaceRange",e,r,o)}function Ge(e,r=!1){return t("editor.moveCursor",e,r)}function Qe(e,r=1,o=!1){return t("editor.moveCursorToLine",e,r,o)}function Ve(e,r=!1,o=!1){return t("editor.insertAtCursor",e,r,o)}function qe(e){return t("editor.dispatch",e)}function He(e,r=""){return t("editor.prompt",e,r)}function _e(e,r){return t("editor.confirm",e,r)}function We(e){return t("editor.alert",e)}function ze(e){return t("editor.getUiOption",e)}function Je(e,r){return t("editor.setUiOption",e,r)}function Ye(){return t("editor.fold")}function Xe(){return t("editor.unfold")}function Ze(){return t("editor.toggleFold")}function et(){return t("editor.foldAll")}function tt(){return t("editor.unfoldAll")}function rt(){return t("editor.undo")}function ot(){return t("editor.redo")}function nt(){return t("editor.openSearchPanel")}function it(e){return t("editor.copyToClipboard",e)}function st(){return t("editor.deleteLine")}function at(){return t("editor.selectAll")}function ct(){return t("editor.indentMore")}function ut(){return t("editor.indentLess")}function lt(){return t("editor.toggleComment")}function dt(){return t("editor.moveLineUp")}function pt(){return t("editor.moveLineDown")}function mt(){return t("editor.cursorCharLeft")}function gt(){return t("editor.cursorCharRight")}function ft(){return t("editor.cursorGroupLeft")}function yt(){return t("editor.cursorGroupRight")}function xt(){return t("editor.cursorLineBoundaryLeft")}function Pt(){return t("editor.cursorLineBoundaryRight")}function vt(){return t("editor.cursorLineStart")}function ht(){return t("editor.cursorLineEnd")}function wt(){return t("editor.cursorDocStart")}function bt(){return t("editor.cursorDocEnd")}function Ct(){return t("editor.cursorLineUp")}function St(){return t("editor.cursorLineDown")}function Lt(){return t("editor.cursorPageUp")}function Ft(){return t("editor.cursorPageDown")}function Et(){return t("editor.selectCharLeft")}function Tt(){return t("editor.selectCharRight")}function At(){return t("editor.selectGroupLeft")}function kt(){return t("editor.selectGroupRight")}function Mt(){return t("editor.selectLineBoundaryLeft")}function Rt(){return t("editor.selectLineBoundaryRight")}function Bt(){return t("editor.selectLineStart")}function Dt(){return t("editor.selectLineEnd")}function Ut(){return t("editor.selectDocStart")}function It(){return t("editor.selectDocEnd")}function Ot(){return t("editor.selectLineUp")}function Kt(){return t("editor.selectLineDown")}function Nt(){return t("editor.selectPageUp")}function $t(){return t("editor.selectPageDown")}function jt(){return t("editor.deleteCharBackward")}function Gt(){return t("editor.deleteCharForward")}function Qt(){return t("editor.deleteGroupBackward")}function Vt(){return t("editor.deleteGroupForward")}function qt(){return t("editor.deleteLineBoundaryBackward")}function Ht(){return t("editor.deleteLineBoundaryForward")}function _t(){return t("editor.transposeChars")}function Wt(){return t("editor.insertNewline")}function zt(){return t("editor.acceptCompletion")}function Jt(){return t("editor.startCompletion")}function Yt(){return t("editor.closeCompletion")}function Xt(e){return t("editor.vimEx",e)}function Zt(){return t("editor.configureVimMode")}function er(e,r){return t("editor.sendMessage",e,r)}function tr(){return t("editor.isMobile")}function rr(){return t("editor.isNarrowScreen")}var d={};w(d,{collidingBasenames:()=>Lr,createRevisionSnapshot:()=>Mr,deleteDocument:()=>yr,deleteFile:()=>Cr,deletePage:()=>lr,fileExists:()=>Sr,getDocumentMeta:()=>mr,getFileMeta:()=>wr,getGitConflictVersion:()=>Ir,getGitConflicts:()=>Br,getGitSyncStatus:()=>Rr,getPageMeta:()=>ir,getRevision:()=>Tr,getRevisionDiff:()=>Ar,getSpaceLog:()=>kr,listDocuments:()=>pr,listFiles:()=>xr,listPages:()=>nr,listPlugs:()=>dr,listRevisions:()=>Er,lookupPaths:()=>Fr,pageExists:()=>sr,readDocument:()=>gr,readFile:()=>Pr,readFileWithMeta:()=>hr,readPage:()=>ar,readPageWithMeta:()=>cr,readRef:()=>vr,resolveGitConflict:()=>Ur,syncGitNow:()=>Dr,writeDocument:()=>fr,writeFile:()=>br,writePage:()=>ur});function nr(){return t("space.listPages")}function ir(e){return t("space.getPageMeta",e)}function sr(e){return t("space.pageExists",e)}function ar(e){return t("space.readPage",e)}function cr(e){return t("space.readPageWithMeta",e)}function ur(e,r){return t("space.writePage",e,r)}function lr(e){return t("space.deletePage",e)}function dr(){return t("space.listPlugs")}function pr(){return t("space.listDocuments")}function mr(e){return t("space.getDocumentMeta",e)}function gr(e){return t("space.readDocument",e)}function fr(e,r){return t("space.writeDocument",e,r)}function yr(e){return t("space.deleteDocument",e)}function xr(){return t("space.listFiles")}function Pr(e){return t("space.readFile",e)}function vr(e){return t("space.readRef",e)}function hr(e){return t("space.readFileWithMeta",e)}function wr(e){return t("space.getFileMeta",e)}function br(e,r){return t("space.writeFile",e,r)}function Cr(e){return t("space.deleteFile",e)}function Sr(e){return t("space.fileExists",e)}function Lr(){return t("space.collidingBasenames")}function Fr(e){return t("space.lookupPaths",e)}function Er(e,r){return t("space.listRevisions",e,r)}function Tr(e,r,o){return t("space.getRevision",e,r,o)}function Ar(e,r){return t("space.getRevisionDiff",e,r)}function kr(e,r){return t("space.getSpaceLog",e,r)}function Mr(){return t("space.createRevisionSnapshot")}function Rr(){return t("space.getGitSyncStatus")}function Br(){return t("space.getGitConflicts")}function Dr(){return t("space.syncGitNow")}function Ur(e,r,o,n){return t("space.resolveGitConflict",e,r,o,n)}function Ir(e,r,o){return t("space.getGitConflictVersion",e,r,o)}var x={};w(x,{del:()=>$r,get:()=>Nr,set:()=>Kr});function Kr(e,r){return t("clientStore.set",e,r)}function Nr(e){return t("clientStore.get",e)}function $r(e){return t("clientStore.delete",e)}var v={};w(v,{areFilesReadyToIndex:()=>Qr,hasInitialSyncCompleted:()=>Gr,isEnabled:()=>jr,performFileSync:()=>Vr,performSpaceSync:()=>qr});function jr(){return t("sync.isEnabled")}function Gr(){return t("sync.hasInitialSyncCompleted")}function Qr(e){return t("sync.areFilesReadyToIndex",e)}function Vr(e,r,o){return t("sync.performFileSync",e,r,o)}function qr(){return t("sync.performSpaceSync")}var Eo=new Uint8Array(16);async function h(){try{await v.isEnabled()&&await v.performSpaceSync()}catch{}}var R={"Red Team HQ":"\u{1F3AF}","Knowledge Base":"\u{1F4DA}",Certifications:"\u{1F3C5}","Labs & CTF":"\u{1F6A9}",Programming:"\u{1F4BB}",Toolbox:"\u{1F9F0}","Study Resources":"\u{1F4D6}",English:"\u{1F310}","Command Arsenal":"\u2328\uFE0F"},B="canopy.enabled",io="canopy.collapsed",D="lhs",so=.3,ao=/^(Library($|\/)|CONFIG$|SETTINGS$|index$)/;async function U(){let e=await x.get(B);return e==null?!0:!!e}async function I(e){await x.set(B,e)}async function co(){return await x.get(io)??[]}function uo(e){return e.icon?e.icon:R[e.name]?R[e.name]:!e.isPage||e.children.length>0?"\u{1F4C1}":"\u{1F4C4}"}async function lo(){let e=await l.getCurrentPage(),r=await d.listPages(),o=new Map;for(let i of r){let c=i.icon??i.pageDecoration?.prefix??i.pageDecoration?.icon;typeof c=="string"&&c.trim()&&o.set(i.name,c.trim())}let n={name:"",title:"",isPage:!1,isCurrent:!1,children:[]},s=r.filter(i=>!ao.test(i.name)).filter(i=>!(i.tags??[]).includes("meta")).sort((i,c)=>i.name.localeCompare(c.name));for(let i of s){let c=i.name.split("/"),p=n;c.forEach((f,g)=>{let C=g===c.length-1,T=c.slice(0,g+1).join("/"),y=p.children.find(W=>W.title===f);y||(y={name:T,title:f,isPage:!1,isCurrent:e===T,children:[]},p.children.push(y)),C&&(y.isPage=!0,y.isCurrent=e===i.name),p=y})}let a=i=>{o.has(i.name)&&(i.icon=o.get(i.name)),i.children.forEach(a)};n.children.forEach(a);let u=i=>{i.sort((c,p)=>{let f=c.children.length>0?0:1,g=p.children.length>0?0:1;return f!==g?f-g:c.title.localeCompare(p.title)}),i.forEach(c=>u(c.children))};return u(n.children),{nodes:n.children,currentPage:e}}function b(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function O(e,r,o){let n=e.children.length>0,s=o.has(e.name),a=uo(e),u=8+r*14,i=n?`<span class="sv-toggle" data-toggle="${b(e.name)}">${s?"\u25B8":"\u25BE"}</span>`:'<span class="sv-toggle sv-toggle-empty"></span>',c=e.isPage?` data-nav="${b(e.name)}"`:"",f=`<div class="${`sv-row${e.isCurrent?" sv-current":""}${e.isPage?"":" sv-folder-only"}`}" style="padding-left:${u}px"${c} data-path="${b(e.name)}">${i}<span class="sv-icon">${a}</span><span class="sv-title">${b(e.title)}</span></div>`,g="";return n&&(g=`<div class="sv-children${s?" sv-collapsed":""}">`+e.children.map(C=>O(C,r+1,o)).join("")+"</div>"),`<div class="sv-node">${f}${g}</div>`}var po=`
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
`,mo=`
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
`;async function m(){let{nodes:e}=await lo(),r=new Set(await co()),o=e.length?e.map(s=>O(s,0,r)).join(""):'<div class="sv-empty">No hay p\xE1ginas todav\xEDa.<br>Pulsa \uFF0B para crear una.</div>',n=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${po}</style>
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
    </div>`;await l.showPanel(D,so,n,mo),await I(!0)}async function E(){await l.hidePanel(D),await I(!1)}async function K(){await U()?await E():await m()}async function N(){try{await U()&&await m()}catch(e){console.error("Canopy showIfEnabled failed",e)}}async function $(){let e=await l.getCurrentPage();if(e.includes("/"))return e.slice(0,e.lastIndexOf("/"));try{if((await d.listPages()).some(o=>o.name.startsWith(e+"/")))return e}catch{}return""}async function j(){let e=await l.prompt("Nombre de la nueva p\xE1gina:");if(!e)return;let r=await $(),o=r?`${r}/${e}`:e;await d.writePage(o,`# ${e}

`),await h(),await l.navigate(o),await m()}async function G(){let e=await l.prompt("Nombre de la nueva carpeta:");if(!e)return;let r=await $(),o=r?`${r}/${e}`:e;await d.writePage(o,`---
icon: "\u{1F4C1}"
---

# ${e}

`),await d.writePage(`${o}/Untitled`,`# Untitled

`),await h(),await l.navigate(o),await m()}async function Q(e){let r=await l.prompt("Nombre de la nueva p\xE1gina:");if(!r)return;let o=e?`${e}/${r}`:r;await d.writePage(o,`# ${r}

`),await h(),await l.navigate(o),await m()}async function V(e){if(!e)return;let o=(await d.listPages()).filter(a=>a.name===e||a.name.startsWith(e+"/")).map(a=>a.name);if(o.length===0)return;let n=o.length>1?`\xBFBorrar la carpeta "${e}" y sus ${o.length} p\xE1ginas? Esto no se puede deshacer.`:`\xBFBorrar "${e}"? Esto no se puede deshacer.`;if(await l.confirm(n,{destructive:!0})){for(let a of o)try{await d.deletePage(a)}catch(u){console.error("Canopy deleteItem",a,u)}await h(),await m()}}async function q(e){if(!e)return;let r=e.includes("/")?e.slice(e.lastIndexOf("/")+1):e,o=e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",n=await l.prompt("Nuevo nombre:",r);if(!n||n===r)return;let s=o+n,u=(await d.listPages()).filter(i=>i.name===e||i.name.startsWith(e+"/"));for(let i of u){let c=i.name===e?s:s+i.name.slice(e.length);try{let p=await d.readPage(i.name);await d.writePage(c,p),await d.deletePage(i.name)}catch(p){console.error("Canopy renameItem",i.name,p)}}await h(),await l.navigate(s),await m()}var H={show:m,hide:E,showIfEnabled:N,toggle:K,newPage:j,newFolder:G,deleteItem:V,renameItem:q,newPageIn:Q},_={name:"canopy",functions:{show:{path:"./canopy.ts:show"},hide:{path:"./canopy.ts:hide"},showIfEnabled:{path:"./canopy.ts:showIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved","file:deleted"]},toggle:{path:"./canopy.ts:toggle",command:{name:"Canopy: Toggle Sidebar",key:"Ctrl-Alt-s",mac:"Cmd-Alt-s"}},newPage:{path:"./canopy.ts:newPage",command:{name:"Canopy: New Page"}},newFolder:{path:"./canopy.ts:newFolder",command:{name:"Canopy: New Folder"}},deleteItem:{path:"./canopy.ts:deleteItem"},renameItem:{path:"./canopy.ts:renameItem"},newPageIn:{path:"./canopy.ts:newPageIn"}},assets:{}},on={manifest:_,functionMapping:H};M(H,_,self.postMessage);export{on as plug};
//# sourceMappingURL=canopy.plug.js.map
