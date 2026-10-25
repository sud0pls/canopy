var re=Object.defineProperty;var b=(e,r)=>{for(var o in r)re(e,o,{get:r[o],enumerable:!0})};function oe(e){let r=atob(e),o=r.length,n=new Uint8Array(o);for(let i=0;i<o;i++)n[i]=r.charCodeAt(i);return n}function B(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let r="",o=e.byteLength;for(let n=0;n<o;n++)r+=String.fromCharCode(e[n]);return btoa(r)}var Lo=new Uint8Array(16),ne=class{constructor(e="",r=1e3){this.prefix=e,this.maxCaptureSize=r,this.prefix=e,this.originalConsole={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},this.patchConsole()}prefix;maxCaptureSize;originalConsole;logBuffer=[];patchConsole(){let e=r=>(...o)=>{let n=this.prefix?[this.prefix,...o]:o;this.originalConsole[r](...n),this.captureLog(r,o)};console.log=e("log"),console.info=e("info"),console.warn=e("warn"),console.error=e("error"),console.debug=e("debug")}captureLog(e,r){let o={level:e,timestamp:Date.now(),message:r.map(n=>{if(typeof n=="string")return n;try{return JSON.stringify(n)}catch{return String(n)}}).join(" ")};this.logBuffer.push(o),this.logBuffer.length>this.maxCaptureSize&&this.logBuffer.shift()}async postToServer(e,r){if(this.logBuffer.length>0){let n=[...this.logBuffer];this.logBuffer=[];try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.map(a=>({...a,source:r})))})).ok)throw new Error("Failed to post logs to server")}catch(i){console.warn("Could not post logs to server",i.message),this.logBuffer.unshift(...n)}}}},R;function ie(e=""){return R=new ne(e),R}var P=e=>{throw new Error("Not initialized yet")},E=typeof window>"u"&&typeof globalThis.WebSocketPair>"u",L=new Map,T=0;E&&(globalThis.syscall=async(e,...r)=>await new Promise((o,n)=>{T++,L.set(T,{resolve:o,reject:n}),P({type:"sys",id:T,name:e,args:r})}));function D(e,r,o){E&&(P=o,self.addEventListener("message",n=>{(async()=>{let i=n.data;switch(i.type){case"inv":{let a=e[i.name];if(!a)throw new Error(`Function not loaded: ${i.name}`);try{let c=await Promise.resolve(a(...i.args||[]));P({type:"invr",id:i.id,result:c})}catch(c){console.error("An exception was thrown as a result of invoking function",i.name,"error:",c.message),P({type:"invr",id:i.id,error:c.message})}}break;case"sysr":{let a=i.id,c=L.get(a);if(!c)throw Error("Invalid request id");L.delete(a),i.error?c.reject(new Error(i.error)):c.resolve(i.result)}break}})().catch(console.error)}),P({type:"manifest",manifest:r}),ie(`[${r.name} plug]`))}async function se(e,r){if(typeof e!="string"){let o=new Uint8Array(await e.arrayBuffer()),n=o.length>0?B(o):void 0;r={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:n},e=e.url}return syscall("sandboxFetch.fetch",e,r)}globalThis.nativeFetch=globalThis.fetch;function ae(){globalThis.fetch=async(e,r)=>{let o=r?.body?B(new Uint8Array(await new Response(r.body).arrayBuffer())):void 0,n=await se(e,r&&{method:r.method,headers:r.headers,base64Body:o});return new Response(n.base64Body?oe(n.base64Body):null,{status:n.status,headers:n.headers})}}E&&ae();var l={};b(l,{acceptCompletion:()=>rr,alert:()=>tt,closeCompletion:()=>nr,configureVimMode:()=>sr,confirm:()=>et,copyToClipboard:()=>pt,cursorCharLeft:()=>ht,cursorCharRight:()=>wt,cursorDocEnd:()=>kt,cursorDocStart:()=>Ft,cursorGroupLeft:()=>bt,cursorGroupRight:()=>Ct,cursorLineBoundaryLeft:()=>St,cursorLineBoundaryRight:()=>Tt,cursorLineDown:()=>Mt,cursorLineEnd:()=>Et,cursorLineStart:()=>Lt,cursorLineUp:()=>At,cursorPageDown:()=>Bt,cursorPageUp:()=>Rt,deleteCharBackward:()=>zt,deleteCharForward:()=>Wt,deleteGroupBackward:()=>Jt,deleteGroupForward:()=>Yt,deleteLine:()=>mt,deleteLineBoundaryBackward:()=>Xt,deleteLineBoundaryForward:()=>Zt,dispatch:()=>Xe,downloadFile:()=>Ue,downloadSpaceFile:()=>Oe,filterBox:()=>Ke,flashNotification:()=>Ne,focus:()=>Qe,fold:()=>nt,foldAll:()=>at,forceLint:()=>ke,getCurrentEditor:()=>fe,getCurrentPage:()=>ce,getCurrentPageMeta:()=>le,getCurrentPath:()=>ue,getCursor:()=>ve,getDocumentCapabilities:()=>ge,getFocusedPanelSlot:()=>Ve,getLastOpenedMap:()=>pe,getRecentlyOpenedPages:()=>de,getSelection:()=>Pe,getText:()=>ye,getUiOption:()=>rt,getViewableExtensions:()=>me,goHistory:()=>Ie,hidePanel:()=>Ge,hideProgress:()=>_e,indentLess:()=>yt,indentMore:()=>ft,insertAtCursor:()=>Ye,insertAtPos:()=>He,insertNewline:()=>tr,invokeCommand:()=>we,isMobile:()=>cr,isNarrowScreen:()=>lr,moveCursor:()=>We,moveCursorToLine:()=>Je,moveLineDown:()=>Pt,moveLineUp:()=>vt,navigate:()=>Ce,newWindow:()=>De,open:()=>Se,openCommandPalette:()=>Le,openNavigator:()=>Ee,openPageNavigator:()=>Te,openSearchPanel:()=>dt,openUrl:()=>Be,prompt:()=>Ze,rebuildEditorState:()=>Me,redo:()=>ut,reloadConfigAndCommands:()=>Re,reloadPage:()=>Fe,reloadUI:()=>Ae,replaceRange:()=>ze,save:()=>be,selectAll:()=>gt,selectCharLeft:()=>Dt,selectCharRight:()=>It,selectDocEnd:()=>Qt,selectDocStart:()=>Gt,selectGroupLeft:()=>Ut,selectGroupRight:()=>Ot,selectLineBoundaryLeft:()=>$t,selectLineBoundaryRight:()=>Nt,selectLineDown:()=>qt,selectLineEnd:()=>jt,selectLineStart:()=>Kt,selectLineUp:()=>Vt,selectPageDown:()=>Ht,selectPageUp:()=>_t,sendMessage:()=>ar,setSelection:()=>he,setText:()=>xe,setUiOption:()=>ot,showPanel:()=>je,showProgress:()=>qe,startCompletion:()=>or,toggleComment:()=>xt,toggleFold:()=>st,transposeChars:()=>er,undo:()=>lt,unfold:()=>it,unfoldAll:()=>ct,uploadFile:()=>$e,vimEx:()=>ir});typeof globalThis.syscall>"u"&&(globalThis.syscall=()=>{throw new Error("Not implemented here")});function t(e,...r){return globalThis.syscall(e,...r)}function ce(){return t("editor.getCurrentPage")}function le(){return t("editor.getCurrentPageMeta")}function ue(){return t("editor.getCurrentPath")}function de(){return t("editor.getRecentlyOpenedPages")}function pe(){return t("editor.getLastOpenedMap")}function me(){return t("editor.getViewableExtensions")}function ge(e){return t("editor.getDocumentCapabilities",e)}function fe(){return t("editor.getCurrentEditor")}function ye(){return t("editor.getText")}function xe(e,r=!1){return t("editor.setText",e,r)}function ve(){return t("editor.getCursor")}function Pe(){return t("editor.getSelection")}function he(e,r){return t("editor.setSelection",e,r)}function we(e,r){return t("editor.invokeCommand",e,r)}function be(){return t("editor.save")}function Ce(e,r=!1,o=!1){return t("editor.navigate",e,r,o)}function Se(e,r=!1,o=!1){return t("editor.open",e,r,o)}function Te(e="page"){return t("editor.openPageNavigator",e)}function Le(){return t("editor.openCommandPalette")}function Ee(e,r){return t("editor.openNavigator",e,r)}function Fe(){return t("editor.reloadPage")}function ke(){return t("editor.forceLint")}function Ae(){return t("editor.reloadUI")}function Me(){return t("editor.rebuildEditorState")}function Re(){return t("editor.reloadConfigAndCommands")}function Be(e,r=!1){return t("editor.openUrl",e,r)}function De(){return t("editor.newWindow")}function Ie(e){return t("editor.goHistory",e)}function Ue(e,r){return t("editor.downloadFile",e,r)}function Oe(e){return t("editor.downloadSpaceFile",e)}function $e(e,r){return t("editor.uploadFile",e,r)}function Ne(e,r="info"){return t("editor.flashNotification",e,r)}function Ke(e,r,o="",n=""){return t("editor.filterBox",e,r,o,n)}function je(e,r,o,n=""){return t("editor.showPanel",e,r,o,n)}function Ge(e){return t("editor.hidePanel",e)}function Qe(){return t("editor.focus")}function Ve(){return t("editor.getFocusedPanelSlot")}function qe(e,r){return t("editor.showProgress",e,r)}function _e(e){return t("editor.showProgress",e)}function He(e,r){return t("editor.insertAtPos",e,r)}function ze(e,r,o){return t("editor.replaceRange",e,r,o)}function We(e,r=!1){return t("editor.moveCursor",e,r)}function Je(e,r=1,o=!1){return t("editor.moveCursorToLine",e,r,o)}function Ye(e,r=!1,o=!1){return t("editor.insertAtCursor",e,r,o)}function Xe(e){return t("editor.dispatch",e)}function Ze(e,r=""){return t("editor.prompt",e,r)}function et(e,r){return t("editor.confirm",e,r)}function tt(e){return t("editor.alert",e)}function rt(e){return t("editor.getUiOption",e)}function ot(e,r){return t("editor.setUiOption",e,r)}function nt(){return t("editor.fold")}function it(){return t("editor.unfold")}function st(){return t("editor.toggleFold")}function at(){return t("editor.foldAll")}function ct(){return t("editor.unfoldAll")}function lt(){return t("editor.undo")}function ut(){return t("editor.redo")}function dt(){return t("editor.openSearchPanel")}function pt(e){return t("editor.copyToClipboard",e)}function mt(){return t("editor.deleteLine")}function gt(){return t("editor.selectAll")}function ft(){return t("editor.indentMore")}function yt(){return t("editor.indentLess")}function xt(){return t("editor.toggleComment")}function vt(){return t("editor.moveLineUp")}function Pt(){return t("editor.moveLineDown")}function ht(){return t("editor.cursorCharLeft")}function wt(){return t("editor.cursorCharRight")}function bt(){return t("editor.cursorGroupLeft")}function Ct(){return t("editor.cursorGroupRight")}function St(){return t("editor.cursorLineBoundaryLeft")}function Tt(){return t("editor.cursorLineBoundaryRight")}function Lt(){return t("editor.cursorLineStart")}function Et(){return t("editor.cursorLineEnd")}function Ft(){return t("editor.cursorDocStart")}function kt(){return t("editor.cursorDocEnd")}function At(){return t("editor.cursorLineUp")}function Mt(){return t("editor.cursorLineDown")}function Rt(){return t("editor.cursorPageUp")}function Bt(){return t("editor.cursorPageDown")}function Dt(){return t("editor.selectCharLeft")}function It(){return t("editor.selectCharRight")}function Ut(){return t("editor.selectGroupLeft")}function Ot(){return t("editor.selectGroupRight")}function $t(){return t("editor.selectLineBoundaryLeft")}function Nt(){return t("editor.selectLineBoundaryRight")}function Kt(){return t("editor.selectLineStart")}function jt(){return t("editor.selectLineEnd")}function Gt(){return t("editor.selectDocStart")}function Qt(){return t("editor.selectDocEnd")}function Vt(){return t("editor.selectLineUp")}function qt(){return t("editor.selectLineDown")}function _t(){return t("editor.selectPageUp")}function Ht(){return t("editor.selectPageDown")}function zt(){return t("editor.deleteCharBackward")}function Wt(){return t("editor.deleteCharForward")}function Jt(){return t("editor.deleteGroupBackward")}function Yt(){return t("editor.deleteGroupForward")}function Xt(){return t("editor.deleteLineBoundaryBackward")}function Zt(){return t("editor.deleteLineBoundaryForward")}function er(){return t("editor.transposeChars")}function tr(){return t("editor.insertNewline")}function rr(){return t("editor.acceptCompletion")}function or(){return t("editor.startCompletion")}function nr(){return t("editor.closeCompletion")}function ir(e){return t("editor.vimEx",e)}function sr(){return t("editor.configureVimMode")}function ar(e,r){return t("editor.sendMessage",e,r)}function cr(){return t("editor.isMobile")}function lr(){return t("editor.isNarrowScreen")}var d={};b(d,{collidingBasenames:()=>Rr,createRevisionSnapshot:()=>$r,deleteDocument:()=>Cr,deleteFile:()=>Ar,deletePage:()=>xr,fileExists:()=>Mr,getDocumentMeta:()=>hr,getFileMeta:()=>Fr,getGitConflictVersion:()=>Qr,getGitConflicts:()=>Kr,getGitSyncStatus:()=>Nr,getPageMeta:()=>pr,getRevision:()=>Ir,getRevisionDiff:()=>Ur,getSpaceLog:()=>Or,listDocuments:()=>Pr,listFiles:()=>Sr,listPages:()=>dr,listPlugs:()=>vr,listRevisions:()=>Dr,lookupPaths:()=>Br,pageExists:()=>mr,readDocument:()=>wr,readFile:()=>Tr,readFileWithMeta:()=>Er,readPage:()=>gr,readPageWithMeta:()=>fr,readRef:()=>Lr,resolveGitConflict:()=>Gr,syncGitNow:()=>jr,writeDocument:()=>br,writeFile:()=>kr,writePage:()=>yr});function dr(){return t("space.listPages")}function pr(e){return t("space.getPageMeta",e)}function mr(e){return t("space.pageExists",e)}function gr(e){return t("space.readPage",e)}function fr(e){return t("space.readPageWithMeta",e)}function yr(e,r){return t("space.writePage",e,r)}function xr(e){return t("space.deletePage",e)}function vr(){return t("space.listPlugs")}function Pr(){return t("space.listDocuments")}function hr(e){return t("space.getDocumentMeta",e)}function wr(e){return t("space.readDocument",e)}function br(e,r){return t("space.writeDocument",e,r)}function Cr(e){return t("space.deleteDocument",e)}function Sr(){return t("space.listFiles")}function Tr(e){return t("space.readFile",e)}function Lr(e){return t("space.readRef",e)}function Er(e){return t("space.readFileWithMeta",e)}function Fr(e){return t("space.getFileMeta",e)}function kr(e,r){return t("space.writeFile",e,r)}function Ar(e){return t("space.deleteFile",e)}function Mr(e){return t("space.fileExists",e)}function Rr(){return t("space.collidingBasenames")}function Br(e){return t("space.lookupPaths",e)}function Dr(e,r){return t("space.listRevisions",e,r)}function Ir(e,r,o){return t("space.getRevision",e,r,o)}function Ur(e,r){return t("space.getRevisionDiff",e,r)}function Or(e,r){return t("space.getSpaceLog",e,r)}function $r(){return t("space.createRevisionSnapshot")}function Nr(){return t("space.getGitSyncStatus")}function Kr(){return t("space.getGitConflicts")}function jr(){return t("space.syncGitNow")}function Gr(e,r,o,n){return t("space.resolveGitConflict",e,r,o,n)}function Qr(e,r,o){return t("space.getGitConflictVersion",e,r,o)}var m={};b(m,{del:()=>Hr,get:()=>_r,set:()=>qr});function qr(e,r){return t("clientStore.set",e,r)}function _r(e){return t("clientStore.get",e)}function Hr(e){return t("clientStore.delete",e)}var h={};b(h,{areFilesReadyToIndex:()=>Jr,hasInitialSyncCompleted:()=>Wr,isEnabled:()=>zr,performFileSync:()=>Yr,performSpaceSync:()=>Xr});function zr(){return t("sync.isEnabled")}function Wr(){return t("sync.hasInitialSyncCompleted")}function Jr(e){return t("sync.areFilesReadyToIndex",e)}function Yr(e,r,o){return t("sync.performFileSync",e,r,o)}function Xr(){return t("sync.performSpaceSync")}var $o=new Uint8Array(16);async function w(){try{await h.isEnabled()&&await h.performSpaceSync()}catch{}}var I={"Red Team HQ":"\u{1F3AF}","Knowledge Base":"\u{1F4DA}",Certifications:"\u{1F3C5}","Labs & CTF":"\u{1F6A9}",Programming:"\u{1F4BB}",Toolbox:"\u{1F9F0}","Study Resources":"\u{1F4D6}",English:"\u{1F310}","Command Arsenal":"\u2328\uFE0F"},U="canopy.enabled",mo="canopy.collapsed",O="lhs",go=.3,F="canopy.toc.enabled",$="rhs",fo=.22;function yo(e){let r=e.split(`
`),o=[],n=!1,i=!1;for(let a=0;a<r.length;a++){let c=r[a];if(a===0&&c.trim()==="---"){i=!0;continue}if(i){c.trim()==="---"&&(i=!1);continue}if(/^\s*(```|~~~)/.test(c)){n=!n;continue}if(n)continue;let s=/^(#{1,3})\s+(.*\S)\s*$/.exec(c);s&&o.push({level:s[1].length,text:s[2].trim()})}return o}var xo=/^(Library($|\/)|CONFIG$|SETTINGS$|index$)/;async function N(){let e=await m.get(U);return e==null?!0:!!e}async function K(e){await m.set(U,e)}async function vo(){return await m.get(mo)??[]}function Po(e){return e.icon?e.icon:I[e.name]?I[e.name]:!e.isPage||e.children.length>0?"\u{1F4C1}":"\u{1F4C4}"}async function ho(){let e=await l.getCurrentPage(),r=await d.listPages(),o=new Map;for(let s of r){let u=s.icon??s.pageDecoration?.prefix??s.pageDecoration?.icon;typeof u=="string"&&u.trim()&&o.set(s.name,u.trim())}let n={name:"",title:"",isPage:!1,isCurrent:!1,children:[]},i=r.filter(s=>!xo.test(s.name)).filter(s=>!(s.tags??[]).includes("meta")).sort((s,u)=>s.name.localeCompare(u.name));for(let s of i){let u=s.name.split("/"),p=n;u.forEach((y,f)=>{let S=f===u.length-1,M=u.slice(0,f+1).join("/"),v=p.children.find(te=>te.title===y);v||(v={name:M,title:y,isPage:!1,isCurrent:e===M,children:[]},p.children.push(v)),S&&(v.isPage=!0,v.isCurrent=e===s.name),p=v})}let a=s=>{o.has(s.name)&&(s.icon=o.get(s.name)),s.children.forEach(a)};n.children.forEach(a);let c=s=>{s.sort((u,p)=>{let y=u.children.length>0?0:1,f=p.children.length>0?0:1;return y!==f?y-f:u.title.localeCompare(p.title)}),s.forEach(u=>c(u.children))};return c(n.children),{nodes:n.children,currentPage:e}}function x(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function j(e,r,o){let n=e.children.length>0,i=o.has(e.name),a=Po(e),c=8+r*14,s=n?`<span class="sv-toggle" data-toggle="${x(e.name)}">${i?"\u25B8":"\u25BE"}</span>`:'<span class="sv-toggle sv-toggle-empty"></span>',u=e.isPage?` data-nav="${x(e.name)}"`:"",y=`<div class="${`sv-row${e.isCurrent?" sv-current":""}${e.isPage?"":" sv-folder-only"}`}" style="padding-left:${c}px"${u} data-path="${x(e.name)}">${s}<span class="sv-icon">${a}</span><span class="sv-title">${x(e.title)}</span></div>`,f="";return n&&(f=`<div class="sv-children${i?" sv-collapsed":""}">`+e.children.map(S=>j(S,r+1,o)).join("")+"</div>"),`<div class="sv-node">${y}${f}</div>`}var wo=`
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
`,bo=`
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
`;async function g(){let{nodes:e}=await ho(),r=new Set(await vo()),o=e.length?e.map(i=>j(i,0,r)).join(""):'<div class="sv-empty">No hay p\xE1ginas todav\xEDa.<br>Pulsa \uFF0B para crear una.</div>',n=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${wo}</style>
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
    </div>`;await l.showPanel(O,go,n,bo),await K(!0)}async function k(){await l.hidePanel(O),await K(!1)}async function G(){await N()?await k():await g()}async function Q(){try{await N()&&await g()}catch(e){console.error("Canopy showIfEnabled failed",e)}}async function V(){let e=await l.getCurrentPage();if(e.includes("/"))return e.slice(0,e.lastIndexOf("/"));try{if((await d.listPages()).some(o=>o.name.startsWith(e+"/")))return e}catch{}return""}async function q(){let e=await l.prompt("Nombre de la nueva p\xE1gina:");if(!e)return;let r=await V(),o=r?`${r}/${e}`:e;await d.writePage(o,`# ${e}

`),await w(),await l.navigate(o),await g()}async function _(){let e=await l.prompt("Nombre de la nueva carpeta:");if(!e)return;let r=await V(),o=r?`${r}/${e}`:e;await d.writePage(o,`---
icon: "\u{1F4C1}"
---

# ${e}

`),await d.writePage(`${o}/Untitled`,`# Untitled

`),await w(),await l.navigate(o),await g()}async function H(e){let r=await l.prompt("Nombre de la nueva p\xE1gina:");if(!r)return;let o=e?`${e}/${r}`:r;await d.writePage(o,`# ${r}

`),await w(),await l.navigate(o),await g()}async function z(e){if(!e)return;let o=(await d.listPages()).filter(a=>a.name===e||a.name.startsWith(e+"/")).map(a=>a.name);if(o.length===0)return;let n=o.length>1?`\xBFBorrar la carpeta "${e}" y sus ${o.length} p\xE1ginas? Esto no se puede deshacer.`:`\xBFBorrar "${e}"? Esto no se puede deshacer.`;if(await l.confirm(n,{destructive:!0})){for(let a of o)try{await d.deletePage(a)}catch(c){console.error("Canopy deleteItem",a,c)}await w(),await g()}}async function W(e){if(!e)return;let r=e.includes("/")?e.slice(e.lastIndexOf("/")+1):e,o=e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",n=await l.prompt("Nuevo nombre:",r);if(!n||n===r)return;let i=o+n,c=(await d.listPages()).filter(s=>s.name===e||s.name.startsWith(e+"/"));for(let s of c){let u=s.name===e?i:i+s.name.slice(e.length);try{let p=await d.readPage(s.name);await d.writePage(u,p),await d.deletePage(s.name)}catch(p){console.error("Canopy renameItem",s.name,p)}}await w(),await l.navigate(i),await g()}async function J(){let e=await m.get(F);return e==null?!0:!!e}var Co=`
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
`,So=`
(function(){
  var root = document.querySelector('.toc-root');
  if (!root) return;
  root.addEventListener('click', function(e){
    var it = e.target.closest('.toc-item');
    if (it && it.dataset.ref) syscall('editor.navigate', it.dataset.ref, false, false);
  });
})();
`;async function C(){let e=await l.getCurrentPage(),r="";try{r=await l.getText()}catch{try{r=await d.readPage(e)}catch{r=""}}let o=yo(r),n=o.length?o.map(a=>`<div class="toc-item toc-l${a.level}" data-ref="${x(e+"#"+a.text)}" title="${x(a.text)}">${x(a.text)}</div>`).join(""):'<div class="toc-empty">Sin encabezados en esta nota.</div>',i=`
    <link rel="stylesheet" href="/.client/main.css" />
    <style>${Co}</style>
    <div class="toc-root">
      <div class="toc-header"><span class="dot">\u2630</span> Contenido</div>
      <div class="toc-list">${n}</div>
    </div>`;await l.showPanel($,fo,i,So),await m.set(F,!0)}async function A(){await l.hidePanel($),await m.set(F,!1)}async function Y(){await J()?await A():await C()}async function X(){try{await J()&&await C()}catch(e){console.error("Canopy showTocIfEnabled failed",e)}}var Z={show:g,hide:k,showIfEnabled:Q,toggle:G,newPage:q,newFolder:_,deleteItem:z,renameItem:W,newPageIn:H,showToc:C,hideToc:A,showTocIfEnabled:X,toggleToc:Y},ee={name:"canopy",functions:{show:{path:"./canopy.ts:show"},hide:{path:"./canopy.ts:hide"},showIfEnabled:{path:"./canopy.ts:showIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved","file:deleted"]},toggle:{path:"./canopy.ts:toggle",command:{name:"Canopy: Toggle Sidebar",key:"Ctrl-Alt-s",mac:"Cmd-Alt-s"}},newPage:{path:"./canopy.ts:newPage",command:{name:"Canopy: New Page"}},newFolder:{path:"./canopy.ts:newFolder",command:{name:"Canopy: New Folder"}},deleteItem:{path:"./canopy.ts:deleteItem"},renameItem:{path:"./canopy.ts:renameItem"},newPageIn:{path:"./canopy.ts:newPageIn"},showToc:{path:"./canopy.ts:showToc"},hideToc:{path:"./canopy.ts:hideToc"},showTocIfEnabled:{path:"./canopy.ts:showTocIfEnabled",events:["editor:init","editor:pageLoaded","editor:pageSaved"]},toggleToc:{path:"./canopy.ts:toggleToc",command:{name:"Canopy: Toggle Outline"}}},assets:{}},Pn={manifest:ee,functionMapping:Z};D(Z,ee,self.postMessage);export{Pn as plug};
//# sourceMappingURL=canopy.plug.js.map
