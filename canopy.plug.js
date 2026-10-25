var oe=Object.defineProperty;var b=(e,r)=>{for(var o in r)oe(e,o,{get:r[o],enumerable:!0})};function ne(e){let r=atob(e),o=r.length,n=new Uint8Array(o);for(let s=0;s<o;s++)n[s]=r.charCodeAt(s);return n}function D(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let r="",o=e.byteLength;for(let n=0;n<o;n++)r+=String.fromCharCode(e[n]);return btoa(r)}var Fo=new Uint8Array(16),ie=class{constructor(e="",r=1e3){this.prefix=e,this.maxCaptureSize=r,this.prefix=e,this.originalConsole={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},this.patchConsole()}prefix;maxCaptureSize;originalConsole;logBuffer=[];patchConsole(){let e=r=>(...o)=>{let n=this.prefix?[this.prefix,...o]:o;this.originalConsole[r](...n),this.captureLog(r,o)};console.log=e("log"),console.info=e("info"),console.warn=e("warn"),console.error=e("error"),console.debug=e("debug")}captureLog(e,r){let o={level:e,timestamp:Date.now(),message:r.map(n=>{if(typeof n=="string")return n;try{return JSON.stringify(n)}catch{return String(n)}}).join(" ")};this.logBuffer.push(o),this.logBuffer.length>this.maxCaptureSize&&this.logBuffer.shift()}async postToServer(e,r){if(this.logBuffer.length>0){let n=[...this.logBuffer];this.logBuffer=[];try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.map(a=>({...a,source:r})))})).ok)throw new Error("Failed to post logs to server")}catch(s){console.warn("Could not post logs to server",s.message),this.logBuffer.unshift(...n)}}}},B;function se(e=""){return B=new ie(e),B}var P=e=>{throw new Error("Not initialized yet")},E=typeof window>"u"&&typeof globalThis.WebSocketPair>"u",L=new Map,T=0;E&&(globalThis.syscall=async(e,...r)=>await new Promise((o,n)=>{T++,L.set(T,{resolve:o,reject:n}),P({type:"sys",id:T,name:e,args:r})}));function I(e,r,o){E&&(P=o,self.addEventListener("message",n=>{(async()=>{let s=n.data;switch(s.type){case"inv":{let a=e[s.name];if(!a)throw new Error(`Function not loaded: ${s.name}`);try{let c=await Promise.resolve(a(...s.args||[]));P({type:"invr",id:s.id,result:c})}catch(c){console.error("An exception was thrown as a result of invoking function",s.name,"error:",c.message),P({type:"invr",id:s.id,error:c.message})}}break;case"sysr":{let a=s.id,c=L.get(a);if(!c)throw Error("Invalid request id");L.delete(a),s.error?c.reject(new Error(s.error)):c.resolve(s.result)}break}})().catch(console.error)}),P({type:"manifest",manifest:r}),se(`[${r.name} plug]`))}async function ae(e,r){if(typeof e!="string"){let o=new Uint8Array(await e.arrayBuffer()),n=o.length>0?D(o):void 0;r={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:n},e=e.url}return syscall("sandboxFetch.fetch",e,r)}globalThis.nativeFetch=globalThis.fetch;function ce(){globalThis.fetch=async(e,r)=>{let o=r?.body?D(new Uint8Array(await new Response(r.body).arrayBuffer())):void 0,n=await ae(e,r&&{method:r.method,headers:r.headers,base64Body:o});return new Response(n.base64Body?ne(n.base64Body):null,{status:n.status,headers:n.headers})}}E&&ce();var l={};b(l,{acceptCompletion:()=>or,alert:()=>rt,closeCompletion:()=>ir,configureVimMode:()=>ar,confirm:()=>tt,copyToClipboard:()=>mt,cursorCharLeft:()=>wt,cursorCharRight:()=>bt,cursorDocEnd:()=>At,cursorDocStart:()=>kt,cursorGroupLeft:()=>Ct,cursorGroupRight:()=>St,cursorLineBoundaryLeft:()=>Tt,cursorLineBoundaryRight:()=>Lt,cursorLineDown:()=>Rt,cursorLineEnd:()=>Ft,cursorLineStart:()=>Et,cursorLineUp:()=>Mt,cursorPageDown:()=>Dt,cursorPageUp:()=>Bt,deleteCharBackward:()=>Wt,deleteCharForward:()=>Jt,deleteGroupBackward:()=>Yt,deleteGroupForward:()=>Xt,deleteLine:()=>ft,deleteLineBoundaryBackward:()=>Zt,deleteLineBoundaryForward:()=>er,dispatch:()=>Ze,downloadFile:()=>Oe,downloadSpaceFile:()=>$e,filterBox:()=>je,flashNotification:()=>Ke,focus:()=>Ve,fold:()=>it,foldAll:()=>ct,forceLint:()=>Ae,getCurrentEditor:()=>ye,getCurrentPage:()=>le,getCurrentPageMeta:()=>ue,getCurrentPath:()=>de,getCursor:()=>Pe,getDocumentCapabilities:()=>ge,getFocusedPanelSlot:()=>qe,getLastOpenedMap:()=>me,getRecentlyOpenedPages:()=>pe,getSelection:()=>he,getText:()=>xe,getUiOption:()=>ot,getViewableExtensions:()=>fe,goHistory:()=>Ue,hidePanel:()=>Qe,hideProgress:()=>He,indentLess:()=>xt,indentMore:()=>yt,insertAtCursor:()=>Xe,insertAtPos:()=>ze,insertNewline:()=>rr,invokeCommand:()=>be,isMobile:()=>lr,isNarrowScreen:()=>ur,moveCursor:()=>Je,moveCursorToLine:()=>Ye,moveLineDown:()=>ht,moveLineUp:()=>Pt,navigate:()=>Se,newWindow:()=>Ie,open:()=>Te,openCommandPalette:()=>Ee,openNavigator:()=>Fe,openPageNavigator:()=>Le,openSearchPanel:()=>pt,openUrl:()=>De,prompt:()=>et,rebuildEditorState:()=>Re,redo:()=>dt,reloadConfigAndCommands:()=>Be,reloadPage:()=>ke,reloadUI:()=>Me,replaceRange:()=>We,save:()=>Ce,selectAll:()=>gt,selectCharLeft:()=>It,selectCharRight:()=>Ut,selectDocEnd:()=>Vt,selectDocStart:()=>Qt,selectGroupLeft:()=>Ot,selectGroupRight:()=>$t,selectLineBoundaryLeft:()=>Nt,selectLineBoundaryRight:()=>Kt,selectLineDown:()=>_t,selectLineEnd:()=>Gt,selectLineStart:()=>jt,selectLineUp:()=>qt,selectPageDown:()=>zt,selectPageUp:()=>Ht,sendMessage:()=>cr,setSelection:()=>we,setText:()=>ve,setUiOption:()=>nt,showPanel:()=>Ge,showProgress:()=>_e,startCompletion:()=>nr,toggleComment:()=>vt,toggleFold:()=>at,transposeChars:()=>tr,undo:()=>ut,unfold:()=>st,unfoldAll:()=>lt,uploadFile:()=>Ne,vimEx:()=>sr});typeof globalThis.syscall>"u"&&(globalThis.syscall=()=>{throw new Error("Not implemented here")});function t(e,...r){return globalThis.syscall(e,...r)}function le(){return t("editor.getCurrentPage")}function ue(){return t("editor.getCurrentPageMeta")}function de(){return t("editor.getCurrentPath")}function pe(){return t("editor.getRecentlyOpenedPages")}function me(){return t("editor.getLastOpenedMap")}function fe(){return t("editor.getViewableExtensions")}function ge(e){return t("editor.getDocumentCapabilities",e)}function ye(){return t("editor.getCurrentEditor")}function xe(){return t("editor.getText")}function ve(e,r=!1){return t("editor.setText",e,r)}function Pe(){return t("editor.getCursor")}function he(){return t("editor.getSelection")}function we(e,r){return t("editor.setSelection",e,r)}function be(e,r){return t("editor.invokeCommand",e,r)}function Ce(){return t("editor.save")}function Se(e,r=!1,o=!1){return t("editor.navigate",e,r,o)}function Te(e,r=!1,o=!1){return t("editor.open",e,r,o)}function Le(e="page"){return t("editor.openPageNavigator",e)}function Ee(){return t("editor.openCommandPalette")}function Fe(e,r){return t("editor.openNavigator",e,r)}function ke(){return t("editor.reloadPage")}function Ae(){return t("editor.forceLint")}function Me(){return t("editor.reloadUI")}function Re(){return t("editor.rebuildEditorState")}function Be(){return t("editor.reloadConfigAndCommands")}function De(e,r=!1){return t("editor.openUrl",e,r)}function Ie(){return t("editor.newWindow")}function Ue(e){return t("editor.goHistory",e)}function Oe(e,r){return t("editor.downloadFile",e,r)}function $e(e){return t("editor.downloadSpaceFile",e)}function Ne(e,r){return t("editor.uploadFile",e,r)}function Ke(e,r="info"){return t("editor.flashNotification",e,r)}function je(e,r,o="",n=""){return t("editor.filterBox",e,r,o,n)}function Ge(e,r,o,n=""){return t("editor.showPanel",e,r,o,n)}function Qe(e){return t("editor.hidePanel",e)}function Ve(){return t("editor.focus")}function qe(){return t("editor.getFocusedPanelSlot")}function _e(e,r){return t("editor.showProgress",e,r)}function He(e){return t("editor.showProgress",e)}function ze(e,r){return t("editor.insertAtPos",e,r)}function We(e,r,o){return t("editor.replaceRange",e,r,o)}function Je(e,r=!1){return t("editor.moveCursor",e,r)}function Ye(e,r=1,o=!1){return t("editor.moveCursorToLine",e,r,o)}function Xe(e,r=!1,o=!1){return t("editor.insertAtCursor",e,r,o)}function Ze(e){return t("editor.dispatch",e)}function et(e,r=""){return t("editor.prompt",e,r)}function tt(e,r){return t("editor.confirm",e,r)}function rt(e){return t("editor.alert",e)}function ot(e){return t("editor.getUiOption",e)}function nt(e,r){return t("editor.setUiOption",e,r)}function it(){return t("editor.fold")}function st(){return t("editor.unfold")}function at(){return t("editor.toggleFold")}function ct(){return t("editor.foldAll")}function lt(){return t("editor.unfoldAll")}function ut(){return t("editor.undo")}function dt(){return t("editor.redo")}function pt(){return t("editor.openSearchPanel")}function mt(e){return t("editor.copyToClipboard",e)}function ft(){return t("editor.deleteLine")}function gt(){return t("editor.selectAll")}function yt(){return t("editor.indentMore")}function xt(){return t("editor.indentLess")}function vt(){return t("editor.toggleComment")}function Pt(){return t("editor.moveLineUp")}function ht(){return t("editor.moveLineDown")}function wt(){return t("editor.cursorCharLeft")}function bt(){return t("editor.cursorCharRight")}function Ct(){return t("editor.cursorGroupLeft")}function St(){return t("editor.cursorGroupRight")}function Tt(){return t("editor.cursorLineBoundaryLeft")}function Lt(){return t("editor.cursorLineBoundaryRight")}function Et(){return t("editor.cursorLineStart")}function Ft(){return t("editor.cursorLineEnd")}function kt(){return t("editor.cursorDocStart")}function At(){return t("editor.cursorDocEnd")}function Mt(){return t("editor.cursorLineUp")}function Rt(){return t("editor.cursorLineDown")}function Bt(){return t("editor.cursorPageUp")}function Dt(){return t("editor.cursorPageDown")}function It(){return t("editor.selectCharLeft")}function Ut(){return t("editor.selectCharRight")}function Ot(){return t("editor.selectGroupLeft")}function $t(){return t("editor.selectGroupRight")}function Nt(){return t("editor.selectLineBoundaryLeft")}function Kt(){return t("editor.selectLineBoundaryRight")}function jt(){return t("editor.selectLineStart")}function Gt(){return t("editor.selectLineEnd")}function Qt(){return t("editor.selectDocStart")}function Vt(){return t("editor.selectDocEnd")}function qt(){return t("editor.selectLineUp")}function _t(){return t("editor.selectLineDown")}function Ht(){return t("editor.selectPageUp")}function zt(){return t("editor.selectPageDown")}function Wt(){return t("editor.deleteCharBackward")}function Jt(){return t("editor.deleteCharForward")}function Yt(){return t("editor.deleteGroupBackward")}function Xt(){return t("editor.deleteGroupForward")}function Zt(){return t("editor.deleteLineBoundaryBackward")}function er(){return t("editor.deleteLineBoundaryForward")}function tr(){return t("editor.transposeChars")}function rr(){return t("editor.insertNewline")}function or(){return t("editor.acceptCompletion")}function nr(){return t("editor.startCompletion")}function ir(){return t("editor.closeCompletion")}function sr(e){return t("editor.vimEx",e)}function ar(){return t("editor.configureVimMode")}function cr(e,r){return t("editor.sendMessage",e,r)}function lr(){return t("editor.isMobile")}function ur(){return t("editor.isNarrowScreen")}var d={};b(d,{collidingBasenames:()=>Br,createRevisionSnapshot:()=>Nr,deleteDocument:()=>Sr,deleteFile:()=>Mr,deletePage:()=>vr,fileExists:()=>Rr,getDocumentMeta:()=>wr,getFileMeta:()=>kr,getGitConflictVersion:()=>Vr,getGitConflicts:()=>jr,getGitSyncStatus:()=>Kr,getPageMeta:()=>mr,getRevision:()=>Ur,getRevisionDiff:()=>Or,getSpaceLog:()=>$r,listDocuments:()=>hr,listFiles:()=>Tr,listPages:()=>pr,listPlugs:()=>Pr,listRevisions:()=>Ir,lookupPaths:()=>Dr,pageExists:()=>fr,readDocument:()=>br,readFile:()=>Lr,readFileWithMeta:()=>Fr,readPage:()=>gr,readPageWithMeta:()=>yr,readRef:()=>Er,resolveGitConflict:()=>Qr,syncGitNow:()=>Gr,writeDocument:()=>Cr,writeFile:()=>Ar,writePage:()=>xr});function pr(){return t("space.listPages")}function mr(e){return t("space.getPageMeta",e)}function fr(e){return t("space.pageExists",e)}function gr(e){return t("space.readPage",e)}function yr(e){return t("space.readPageWithMeta",e)}function xr(e,r){return t("space.writePage",e,r)}function vr(e){return t("space.deletePage",e)}function Pr(){return t("space.listPlugs")}function hr(){return t("space.listDocuments")}function wr(e){return t("space.getDocumentMeta",e)}function br(e){return t("space.readDocument",e)}function Cr(e,r){return t("space.writeDocument",e,r)}function Sr(e){return t("space.deleteDocument",e)}function Tr(){return t("space.listFiles")}function Lr(e){return t("space.readFile",e)}function Er(e){return t("space.readRef",e)}function Fr(e){return t("space.readFileWithMeta",e)}function kr(e){return t("space.getFileMeta",e)}function Ar(e,r){return t("space.writeFile",e,r)}function Mr(e){return t("space.deleteFile",e)}function Rr(e){return t("space.fileExists",e)}function Br(){return t("space.collidingBasenames")}function Dr(e){return t("space.lookupPaths",e)}function Ir(e,r){return t("space.listRevisions",e,r)}function Ur(e,r,o){return t("space.getRevision",e,r,o)}function Or(e,r){return t("space.getRevisionDiff",e,r)}function $r(e,r){return t("space.getSpaceLog",e,r)}function Nr(){return t("space.createRevisionSnapshot")}function Kr(){return t("space.getGitSyncStatus")}function jr(){return t("space.getGitConflicts")}function Gr(){return t("space.syncGitNow")}function Qr(e,r,o,n){return t("space.resolveGitConflict",e,r,o,n)}function Vr(e,r,o){return t("space.getGitConflictVersion",e,r,o)}var m={};b(m,{del:()=>zr,get:()=>Hr,set:()=>_r});function _r(e,r){return t("clientStore.set",e,r)}function Hr(e){return t("clientStore.get",e)}function zr(e){return t("clientStore.delete",e)}var h={};b(h,{areFilesReadyToIndex:()=>Yr,hasInitialSyncCompleted:()=>Jr,isEnabled:()=>Wr,performFileSync:()=>Xr,performSpaceSync:()=>Zr});function Wr(){return t("sync.isEnabled")}function Jr(){return t("sync.hasInitialSyncCompleted")}function Yr(e){return t("sync.areFilesReadyToIndex",e)}function Xr(e,r,o){return t("sync.performFileSync",e,r,o)}function Zr(){return t("sync.performSpaceSync")}var Ko=new Uint8Array(16);async function w(){try{await h.isEnabled()&&await h.performSpaceSync()}catch{}}var U={"Red Team HQ":"\u{1F3AF}","Knowledge Base":"\u{1F4DA}",Certifications:"\u{1F3C5}","Labs & CTF":"\u{1F6A9}",Programming:"\u{1F4BB}",Toolbox:"\u{1F9F0}","Study Resources":"\u{1F4D6}",English:"\u{1F310}","Command Arsenal":"\u2328\uFE0F"},O="canopy.enabled",fo="canopy.collapsed",$="lhs",go=.3,k="canopy.toc.enabled",N="rhs",yo=.22;function xo(e){let r=e.split(`
`),o=[],n=!1,s=!1;for(let a=0;a<r.length;a++){let c=r[a];if(a===0&&c.trim()==="---"){s=!0;continue}if(s){c.trim()==="---"&&(s=!1);continue}if(/^\s*(```|~~~)/.test(c)){n=!n;continue}if(n)continue;let i=/^(#{1,3})\s+(.*\S)\s*$/.exec(c);i&&o.push({level:i[1].length,text:i[2].trim()})}return o}var vo=/^(Library($|\/)|CONFIG$|SETTINGS$|index$)/;async function K(){let e=await m.get(O);return e==null?!0:!!e}async function j(e){await m.set(O,e)}async function Po(){return await m.get(fo)??[]}function ho(e){return e.icon?e.icon:U[e.name]?U[e.name]:!e.isPage||e.children.length>0?"\u{1F4C1}":"\u{1F4C4}"}function F(e){return e.replace(/^["'“”‘’]+/,"").replace(/["'“”‘’]+$/,"").trim()}function wo(e){let r=/^---\r?\n([\s\S]*?)\r?\n---/.exec(e);if(!r)return;let o=/^[ \t]*icon[ \t]*:[ \t]*(.+?)[ \t]*$/m.exec(r[1]);return o&&F(o[1])||void 0}async function bo(){let e=await l.getCurrentPage(),r=await d.listPages(),o=new Map;for(let i of r){let u=i.icon??i.pageDecoration?.prefix??i.pageDecoration?.icon;typeof u=="string"&&F(u)&&o.set(i.name,F(u))}try{let i=wo(await l.getText());i?o.set(e,i):o.delete(e)}catch{}let n={name:"",title:"",isPage:!1,isCurrent:!1,children:[]},s=r.filter(i=>!vo.test(i.name)).filter(i=>!(i.tags??[]).includes("meta")).sort((i,u)=>i.name.localeCompare(u.name));for(let i of s){let u=i.name.split("/"),p=n;u.forEach((y,g)=>{let S=g===u.length-1,R=u.slice(0,g+1).join("/"),v=p.children.find(re=>re.title===y);v||(v={name:R,title:y,isPage:!1,isCurrent:e===R,children:[]},p.children.push(v)),S&&(v.isPage=!0,v.isCurrent=e===i.name),p=v})}let a=i=>{o.has(i.name)&&(i.icon=o.get(i.name)),i.children.forEach(a)};n.children.forEach(a);let c=i=>{i.sort((u,p)=>{let y=u.children.length>0?0:1,g=p.children.length>0?0:1;return y!==g?y-g:u.title.localeCompare(p.title)}),i.forEach(u=>c(u.children))};return c(n.children),{nodes:n.children,currentPage:e}}function x(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function G(e,r,o){let n=e.children.length>0,s=o.has(e.name),a=ho(e),c=8+r*14,i=n?`<span class="sv-toggle" data-toggle="${x(e.name)}">${s?"\u25B8":"\u25BE"}</span>`:'<span class="sv-toggle sv-toggle-empty"></span>',u=e.isPage?` data-nav="${x(e.name)}"`:"",y=`<div class="${`sv-row${e.isCurrent?" sv-current":""}${e.isPage?"":" sv-folder-only"}`}" style="padding-left:${c}px"${u} data-path="${x(e.name)}">${i}<span class="sv-icon">${a}</span><span class="sv-title">${x(e.title)}</span></div>`,g="";return n&&(g=`<div class="sv-children${s?" sv-collapsed":""}">`+e.children.map(S=>G(S,r+1,o)).join("")+"</div>"),`<div class="sv-node">${y}${g}</div>`}var Co=`
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
`,So=`
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
`;async function f(){let{nodes:e}=await bo(),r=new Set(await Po()),o=e.length?e.map(s=>G(s,0,r)).join(""):'<div class="sv-empty">No hay p\xE1ginas todav\xEDa.<br>Pulsa \uFF0B para crear una.</div>',n=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${Co}</style>
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
    </div>`;await l.showPanel($,go,n,So),await j(!0)}async function A(){await l.hidePanel($),await j(!1)}async function Q(){await K()?await A():await f()}async function V(){try{await K()&&await f()}catch(e){console.error("Canopy showIfEnabled failed",e)}}async function q(){let e=await l.getCurrentPage();if(e.includes("/"))return e.slice(0,e.lastIndexOf("/"));try{if((await d.listPages()).some(o=>o.name.startsWith(e+"/")))return e}catch{}return""}async function _(){let e=await l.prompt("Nombre de la nueva p\xE1gina:");if(!e)return;let r=await q(),o=r?`${r}/${e}`:e;await d.writePage(o,`# ${e}

`),await w(),await l.navigate(o),await f()}async function H(){let e=await l.prompt("Nombre de la nueva carpeta:");if(!e)return;let r=await q(),o=r?`${r}/${e}`:e;await d.writePage(o,`---
icon: "\u{1F4C1}"
---

# ${e}

`),await d.writePage(`${o}/Untitled`,`# Untitled

`),await w(),await l.navigate(o),await f()}async function z(e){let r=await l.prompt("Nombre de la nueva p\xE1gina:");if(!r)return;let o=e?`${e}/${r}`:r;await d.writePage(o,`# ${r}

`),await w(),await l.navigate(o),await f()}async function W(e){if(!e)return;let o=(await d.listPages()).filter(a=>a.name===e||a.name.startsWith(e+"/")).map(a=>a.name);if(o.length===0)return;let n=o.length>1?`\xBFBorrar la carpeta "${e}" y sus ${o.length} p\xE1ginas? Esto no se puede deshacer.`:`\xBFBorrar "${e}"? Esto no se puede deshacer.`;if(await l.confirm(n,{destructive:!0})){for(let a of o)try{await d.deletePage(a)}catch(c){console.error("Canopy deleteItem",a,c)}await w(),await f()}}async function J(e){if(!e)return;let r=e.includes("/")?e.slice(e.lastIndexOf("/")+1):e,o=e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",n=await l.prompt("Nuevo nombre:",r);if(!n||n===r)return;let s=o+n,c=(await d.listPages()).filter(i=>i.name===e||i.name.startsWith(e+"/"));for(let i of c){let u=i.name===e?s:s+i.name.slice(e.length);try{let p=await d.readPage(i.name);await d.writePage(u,p),await d.deletePage(i.name)}catch(p){console.error("Canopy renameItem",i.name,p)}}await w(),await l.navigate(s),await f()}async function Y(){let e=await m.get(k);return e==null?!0:!!e}var To=`
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
`,Lo=`
(function(){
  var root = document.querySelector('.toc-root');
  if (!root) return;
  root.addEventListener('click', function(e){
    var it = e.target.closest('.toc-item');
    if (it && it.dataset.ref) syscall('editor.navigate', it.dataset.ref, false, false);
  });
})();
`;async function C(){let e=await l.getCurrentPage(),r="";try{r=await l.getText()}catch{try{r=await d.readPage(e)}catch{r=""}}let o=xo(r),n=o.length?o.map(a=>`<div class="toc-item toc-l${a.level}" data-ref="${x(e+"#"+a.text)}" title="${x(a.text)}">${x(a.text)}</div>`).join(""):'<div class="toc-empty">Sin encabezados en esta nota.</div>',s=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${To}</style>
    <div class="toc-root">
      <div class="toc-header"><span class="dot">\u2630</span> Contenido</div>
      <div class="toc-list">${n}</div>
    </div>`;await l.showPanel(N,yo,s,Lo),await m.set(k,!0)}async function M(){await l.hidePanel(N),await m.set(k,!1)}async function X(){await Y()?await M():await C()}async function Z(){try{await Y()&&await C()}catch(e){console.error("Canopy showTocIfEnabled failed",e)}}var ee={show:f,hide:A,showIfEnabled:V,toggle:Q,newPage:_,newFolder:H,deleteItem:W,renameItem:J,newPageIn:z,showToc:C,hideToc:M,showTocIfEnabled:Z,toggleToc:X},te={name:"canopy",functions:{show:{path:"./canopy.ts:show"},hide:{path:"./canopy.ts:hide"},showIfEnabled:{path:"./canopy.ts:showIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved","file:deleted"]},toggle:{path:"./canopy.ts:toggle",command:{name:"Canopy: Toggle Sidebar",key:"Ctrl-Alt-s",mac:"Cmd-Alt-s"}},newPage:{path:"./canopy.ts:newPage",command:{name:"Canopy: New Page"}},newFolder:{path:"./canopy.ts:newFolder",command:{name:"Canopy: New Folder"}},deleteItem:{path:"./canopy.ts:deleteItem"},renameItem:{path:"./canopy.ts:renameItem"},newPageIn:{path:"./canopy.ts:newPageIn"},showToc:{path:"./canopy.ts:showToc"},hideToc:{path:"./canopy.ts:hideToc"},showTocIfEnabled:{path:"./canopy.ts:showTocIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved"]},toggleToc:{path:"./canopy.ts:toggleToc",command:{name:"Canopy: Toggle Outline"}}},assets:{}},wn={manifest:te,functionMapping:ee};I(ee,te,self.postMessage);export{wn as plug};
//# sourceMappingURL=canopy.plug.js.map
