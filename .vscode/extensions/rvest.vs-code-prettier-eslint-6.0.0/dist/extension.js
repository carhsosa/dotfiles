var Je=Object.create;var re=Object.defineProperty;var et=Object.getOwnPropertyDescriptor;var tt=Object.getOwnPropertyNames;var rt=Object.getPrototypeOf,nt=Object.prototype.hasOwnProperty;var w=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var st=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of tt(t))!nt.call(e,s)&&s!==r&&re(e,s,{get:()=>t[s],enumerable:!(n=et(t,s))||n.enumerable});return e};var f=(e,t,r)=>(r=e!=null?Je(rt(e)):{},st(t||!e||!e.__esModule?re(r,"default",{value:e,enumerable:!0}):r,e));var oe=w((tr,ie)=>{ie.exports=function(t){if(typeof t!="string"||t==="")return!1;for(var r;r=/(\\).|([@?!+*]\(.*\))/g.exec(t);){if(r[2])return!0;t=t.slice(r.index+r[0].length)}return!1}});var ue=w((rr,ce)=>{var at=oe(),ae={"{":"}","(":")","[":"]"},ct=function(e){if(e[0]==="!")return!0;for(var t=0,r=-2,n=-2,s=-2,o=-2,i=-2;t<e.length;){if(e[t]==="*"||e[t+1]==="?"&&/[\].+)]/.test(e[t])||n!==-1&&e[t]==="["&&e[t+1]!=="]"&&(n<t&&(n=e.indexOf("]",t)),n>t&&(i===-1||i>n||(i=e.indexOf("\\",t),i===-1||i>n)))||s!==-1&&e[t]==="{"&&e[t+1]!=="}"&&(s=e.indexOf("}",t),s>t&&(i=e.indexOf("\\",t),i===-1||i>s))||o!==-1&&e[t]==="("&&e[t+1]==="?"&&/[:!=]/.test(e[t+2])&&e[t+3]!==")"&&(o=e.indexOf(")",t),o>t&&(i=e.indexOf("\\",t),i===-1||i>o))||r!==-1&&e[t]==="("&&e[t+1]!=="|"&&(r<t&&(r=e.indexOf("|",t)),r!==-1&&e[r+1]!==")"&&(o=e.indexOf(")",r),o>r&&(i=e.indexOf("\\",r),i===-1||i>o))))return!0;if(e[t]==="\\"){var a=e[t+1];t+=2;var c=ae[a];if(c){var u=e.indexOf(c,t);u!==-1&&(t=u+1)}if(e[t]==="!")return!0}else t++}return!1},ut=function(e){if(e[0]==="!")return!0;for(var t=0;t<e.length;){if(/[*?{}()[\]]/.test(e[t]))return!0;if(e[t]==="\\"){var r=e[t+1];t+=2;var n=ae[r];if(n){var s=e.indexOf(n,t);s!==-1&&(t=s+1)}if(e[t]==="!")return!0}else t++}return!1};ce.exports=function(t,r){if(typeof t!="string"||t==="")return!1;if(at(t))return!0;var n=ct;return r&&r.strict===!1&&(n=ut),n(t)}});var Re=w((Er,Se)=>{"use strict";var xe=require("path"),j=require("module"),_e={},ve=function(e){var t=e?xe.resolve(e):process.cwd(),r=xe.join(t,"@root"),n=_e[r];return n||(n=new j(r),n.filename=r,n.paths=j._nodeModulePaths(t),_e[r]=n),n},ye=function(e,t){var r=ve(t);return r.require(e)};ye.resolve=function(e,t){var r=ve(t);return j._resolveFilename(e,r)};Se.exports=ye});var qe=w((Ar,De)=>{function Ce(e){return Array.isArray(e)?e:[e]}var ke="",Le=" ",X="\\",Ct=/^\s+$/,Lt=/(?:[^\\]|^)\\$/,$t=/^\\!/,At=/^\\#/,kt=/\r?\n/g,Ft=/^\.*\/|^\.+$/,W="/",Fe="node-ignore";typeof Symbol<"u"&&(Fe=Symbol.for("node-ignore"));var $e=Fe,Ot=(e,t,r)=>Object.defineProperty(e,t,{value:r}),Ut=/([0-z])-([0-z])/g,Oe=()=>!1,Dt=e=>e.replace(Ut,(t,r,n)=>r.charCodeAt(0)<=n.charCodeAt(0)?t:ke),qt=e=>{let{length:t}=e;return e.slice(0,t-t%2)},jt=[[/\\?\s+$/,e=>e.indexOf("\\")===0?Le:ke],[/\\\s/g,()=>Le],[/[\\$.|*+(){^]/g,e=>`\\${e}`],[/(?!\\)\?/g,()=>"[^/]"],[/^\//,()=>"^"],[/\//g,()=>"\\/"],[/^\^*\\\*\\\*\\\//,()=>"^(?:.*\\/)?"],[/^(?=[^^])/,function(){return/\/(?!$)/.test(this)?"^":"(?:^|\\/)"}],[/\\\/\\\*\\\*(?=\\\/|$)/g,(e,t,r)=>t+6<r.length?"(?:\\/[^\\/]+)*":"\\/.+"],[/(^|[^\\]+)(\\\*)+(?=.+)/g,(e,t,r)=>{let n=r.replace(/\\\*/g,"[^\\/]*");return t+n}],[/\\\\\\(?=[$.|*+(){^])/g,()=>X],[/\\\\/g,()=>X],[/(\\)?\[([^\]/]*?)(\\*)($|\])/g,(e,t,r,n,s)=>t===X?`\\[${r}${qt(n)}${s}`:s==="]"&&n.length%2===0?`[${Dt(r)}${n}]`:"[]"],[/(?:[^*])$/,e=>/\/$/.test(e)?`${e}$`:`${e}(?=$|\\/$)`],[/(\^|\\\/)?\\\*$/,(e,t)=>`${t?`${t}[^/]+`:"[^/]*"}(?=$|\\/$)`]],Ae=Object.create(null),Mt=(e,t)=>{let r=Ae[e];return r||(r=jt.reduce((n,s)=>n.replace(s[0],s[1].bind(e)),e),Ae[e]=r),t?new RegExp(r,"i"):new RegExp(r)},Y=e=>typeof e=="string",Gt=e=>e&&Y(e)&&!Ct.test(e)&&!Lt.test(e)&&e.indexOf("#")!==0,Xt=e=>e.split(kt),V=class{constructor(t,r,n,s){this.origin=t,this.pattern=r,this.negative=n,this.regex=s}},Wt=(e,t)=>{let r=e,n=!1;e.indexOf("!")===0&&(n=!0,e=e.substr(1)),e=e.replace($t,"!").replace(At,"#");let s=Mt(e,t);return new V(r,e,n,s)},Vt=(e,t)=>{throw new t(e)},h=(e,t,r)=>Y(e)?e?h.isNotRelative(e)?r(`path should be a \`path.relative()\`d string, but got "${t}"`,RangeError):!0:r("path must not be empty",TypeError):r(`path must be a string, but got \`${t}\``,TypeError),Ue=e=>Ft.test(e);h.isNotRelative=Ue;h.convert=e=>e;var B=class{constructor({ignorecase:t=!0,ignoreCase:r=t,allowRelativePaths:n=!1}={}){Ot(this,$e,!0),this._rules=[],this._ignoreCase=r,this._allowRelativePaths=n,this._initCache()}_initCache(){this._ignoreCache=Object.create(null),this._testCache=Object.create(null)}_addPattern(t){if(t&&t[$e]){this._rules=this._rules.concat(t._rules),this._added=!0;return}if(Gt(t)){let r=Wt(t,this._ignoreCase);this._added=!0,this._rules.push(r)}}add(t){return this._added=!1,Ce(Y(t)?Xt(t):t).forEach(this._addPattern,this),this._added&&this._initCache(),this}addPattern(t){return this.add(t)}_testOne(t,r){let n=!1,s=!1;return this._rules.forEach(o=>{let{negative:i}=o;if(s===i&&n!==s||i&&!n&&!s&&!r)return;o.regex.test(t)&&(n=!i,s=i)}),{ignored:n,unignored:s}}_test(t,r,n,s){let o=t&&h.convert(t);return h(o,t,this._allowRelativePaths?Oe:Vt),this._t(o,r,n,s)}_t(t,r,n,s){if(t in r)return r[t];if(s||(s=t.split(W)),s.pop(),!s.length)return r[t]=this._testOne(t,n);let o=this._t(s.join(W)+W,r,n,s);return r[t]=o.ignored?o:this._testOne(t,n)}ignores(t){return this._test(t,this._ignoreCache,!1).ignored}createFilter(){return t=>!this.ignores(t)}filter(t){return Ce(t).filter(this.createFilter())}test(t){return this._test(t,this._testCache,!0)}},P=e=>new B(e),Bt=e=>h(e&&h.convert(e),e,Oe);P.isPathValid=Bt;P.default=P;De.exports=P;if(typeof process<"u"&&(process.env&&process.env.IGNORE_TEST_WIN32||process.platform==="win32")){let e=r=>/^\\\\\?\\/.test(r)||/["<>|\u0000-\u001F]+/u.test(r)?r:r.replace(/\\/g,"/");h.convert=e;let t=/^[a-z]:\//i;h.isNotRelative=r=>t.test(r)||Ue(r)}});var p=require("vscode"),Ge=f(require("path"));var he=f(require("node:fs"),1),Ee=require("node:module"),_=f(require("node:path"),1),q=require("node:url"),g=require("node:worker_threads");var ne=require("node:module"),ot={},k,it="development";var Jt=(k=process.env.NODE_ENV)!==null&&k!==void 0?k:it;var x=process.cwd(),F=typeof require>"u"?(0,ne.createRequire)(ot.url):require,se=[".ts",".tsx",...Object.keys(F.extensions)];var T=f(require("node:fs"),1),E=f(require("node:path"),1),lt=f(ue(),1);var ft=e=>{try{return F.resolve(e)}catch{}};var m=e=>!!ft(e),or=m("typescript"),ar=m("@angular/core/package.json"),cr=m("@mdx-js/mdx/package.json")||m("@mdx-js/react/package.json"),ur=m("react"),lr=m("svelte"),fr=m("vue"),I=(e,t=!1)=>{if(typeof e=="string")return T.default.existsSync(e)&&(t||T.default.statSync(e).isFile())?e:"";for(let r of e??[])if(I(r,t))return r;return""},le=(e,t=se)=>{let r=[...t,""].find(n=>I(e+n));return r==null?"":e+r};var fe=(e,t="package.json")=>{if(console.assert(E.default.isAbsolute(e)),!I(e,!0)||e!==x&&!e.startsWith(x+E.default.sep))return"";e=E.default.resolve(T.default.statSync(e).isDirectory()?e:E.default.resolve(e,".."));do{let r=I(E.default.resolve(e,t));if(r)return r;e=E.default.resolve(e,"..")}while(e===x||e.startsWith(x+E.default.sep));return""};var Rt={},l={TsNode:"ts-node",EsbuildRegister:"esbuild-register",EsbuildRunner:"esbuild-runner",SWC:"swc",TSX:"tsx"},{SYNCKIT_BUFFER_SIZE:pe,SYNCKIT_TIMEOUT:de,SYNCKIT_EXEC_ARGV:O,SYNCKIT_TS_RUNNER:pt,NODE_OPTIONS:U}=process.env,dt=pe?+pe:void 0,mt=de?+de:void 0,ht=dt||1024,Et=(O==null?void 0:O.split(","))||[],gt=pt,xt=16,me=new Map;function ge(e,t,r){if(!_.default.isAbsolute(e))throw new Error("`workerPath` must be absolute");let n=me.get(e);if(n)return n;let s=St(e,typeof t=="number"?{bufferSize:t,timeout:r}:t);return me.set(e,s),s}var D=typeof require>"u"?(0,Ee.createRequire)(Rt.url):require,_t=e=>new URL(`data:text/javascript,${encodeURIComponent(e)}`),vt=e=>{var t;try{return!!(!((t=he.default.statSync(e,{throwIfNoEntry:!1}))===null||t===void 0)&&t.isFile())}catch{return!1}},yt=(e,{execArgv:t,tsRunner:r})=>{let n=_.default.extname(e);if(!/[/\\]node_modules[/\\]/.test(e)&&(!n||/^\.[cm]?js$/.test(n))){let i=n?e.slice(0,-n.length):e,a;switch(n){case".cjs":{a=[".cts",".cjs"];break}case".mjs":{a=[".mts",".mjs"];break}default:{a=[".ts",".js"];break}}let c=le(i,a),u;c&&(!n||(u=c!==i))&&(e=c,u&&(n=_.default.extname(e)))}let s=/\.[cm]?ts$/.test(e),o=e.endsWith(".mts");if(s){if(!o){let i=fe(e);i&&(o=D(i).type==="module")}switch(r==null&&m(l.TsNode)&&(r=l.TsNode),r){case l.TsNode:{o?t.includes("--loader")||(t=["--loader",`${l.TsNode}/esm`,...t]):t.includes("-r")||(t=["-r",`${l.TsNode}/register`,...t]);break}case l.EsbuildRegister:{t.includes("-r")||(t=["-r",l.EsbuildRegister,...t]);break}case l.EsbuildRunner:{t.includes("-r")||(t=["-r",`${l.EsbuildRunner}/register`,...t]);break}case l.SWC:{t.includes("-r")||(t=["-r",`@${l.SWC}-node/register`,...t]);break}case l.TSX:{t.includes("--loader")||(t=["--loader",l.TSX,...t]);break}default:throw new Error(`Unknown ts runner: ${String(r)}`)}}if(process.versions.pnp){let i=U==null?void 0:U.split(/\s+/),a;try{a=D.resolve("pnpapi")}catch{}if(a&&!(i!=null&&i.some((c,u)=>["-r","--require"].includes(c)&&a===D.resolve(i[u+1])))&&!t.includes(a)){t=["-r",a,...t];let c=_.default.resolve(a,"../.pnp.loader.mjs");vt(c)&&(t=["--experimental-loader",(0,q.pathToFileURL)(c).toString(),...t])}}return{ext:n,isTs:s,tsRunner:r,tsUseEsm:o,workerPath:e,execArgv:t}};function St(e,{bufferSize:t=ht,timeout:r=mt,execArgv:n=Et,tsRunner:s=gt,transferList:o=[]}={}){let{port1:i,port2:a}=new g.MessageChannel,{isTs:c,ext:u,tsUseEsm:d,tsRunner:S,workerPath:$,execArgv:Be}=yt(e,{execArgv:n,tsRunner:s}),z=(0,q.pathToFileURL)($);if(/\.[cm]ts$/.test($)){let R=!d||Number.parseFloat(process.versions.node)>=xt;if(S){if([l.EsbuildRegister,l.EsbuildRunner,l.SWC,...R?[]:[l.TSX]].includes(S))throw new Error(`${S} is not supported for ${u} files yet`+(R?", you can try [tsx](https://github.com/esbuild-kit/tsx) instead":""))}else throw new Error("No ts runner specified, ts worker path is not supported")}let H=c&&!d,Z=new g.Worker(d&&S===l.TsNode?_t(`import '${String(z)}'`):H?`require('${$.replace(/\\/g,"\\\\")}')`:z,{eval:H,workerData:{workerPort:a},transferList:[a,...o],execArgv:Be}),Ye=0,Ke=(...R)=>{let A=Ye++,Q=new SharedArrayBuffer(t),ze=new Int32Array(Q),He={sharedBuffer:Q,id:A,args:R};Z.postMessage(He);let J=Atomics.wait(ze,0,0,r);if(!["ok","not-equal"].includes(J))throw new Error("Internal error: Atomics.wait() failed: "+J);let{id:ee,result:Ze,error:te,properties:Qe}=(0,g.receiveMessageOnPort)(i).message;if(A!==ee)throw new Error(`Internal error: Expected id ${A} but got id ${ee}`);if(te)throw Object.assign(te,Qe);return Ze};return Z.unref(),Ke}var Xe=f(Re());var je=f(require("fs")),C=f(require("path"));var v=f(require("node:path"),1),Ne=require("node:url");var we=f(require("node:process"),1),Te=f(require("node:path"),1),N=f(require("node:fs"),1),Ie=require("node:url");var M=class{value;next;constructor(t){this.value=t}},b=class{#e;#t;#r;constructor(){this.clear()}enqueue(t){let r=new M(t);this.#e?(this.#t.next=r,this.#t=r):(this.#e=r,this.#t=r),this.#r++}dequeue(){let t=this.#e;if(t)return this.#e=this.#e.next,this.#r--,t.value}clear(){this.#e=void 0,this.#t=void 0,this.#r=0}get size(){return this.#r}*[Symbol.iterator](){let t=this.#e;for(;t;)yield t.value,t=t.next}};var be={directory:"isDirectory",file:"isFile"};function wt(e){if(!Object.hasOwnProperty.call(be,e))throw new Error(`Invalid type specified: ${e}`)}var Tt=(e,t)=>t[be[e]](),It=e=>e instanceof URL?(0,Ie.fileURLToPath)(e):e;function G(e,{cwd:t=we.default.cwd(),type:r="file",allowSymlinks:n=!0}={}){wt(r),t=It(t);let s=n?N.default.statSync:N.default.lstatSync;for(let o of e)try{let i=s(Te.default.resolve(t,o),{throwIfNoEntry:!1});if(!i)continue;if(Tt(r,i))return o}catch{}}var bt=e=>e instanceof URL?(0,Ne.fileURLToPath)(e):e,Nt=Symbol("findUpStop");function Pt(e,t={}){let r=v.default.resolve(bt(t.cwd)||""),{root:n}=v.default.parse(r),s=t.stopAt||n,o=t.limit||Number.POSITIVE_INFINITY,i=[e].flat(),a=u=>{if(typeof e!="function")return G(i,u);let d=e(u.cwd);return typeof d=="string"?G([d],u):d},c=[];for(;;){let u=a({...t,cwd:r});if(u===Nt||(u&&c.push(v.default.resolve(r,u)),r===s||c.length>=o))break;r=v.default.dirname(r)}return c}function Pe(e,t={}){return Pt(e,{...t,limit:1})[0]}var Me=f(qe()),Yt=/(\r|\n|\r\n)/;function Kt(e){let t=je.default.readFileSync(e,"utf8").split(Yt).filter(n=>Boolean(n.trim())),r=(0,Me.default)();return r.add(t),r.ignores.bind(r)}function L(e,t,r){let n={cwd:C.default.dirname(e)};t&&(n.stopAt=t);let s=Pe(r,n);if(!s)return!1;let o=C.default.dirname(s),i=C.default.relative(o,e);return Kt(s)(i)}var y=p.window.createOutputChannel("Prettier Eslint"),We=ge(require.resolve("./worker.mjs"));function Ve(e,t){try{return Xe.default.resolve(t,e)}catch{return require.resolve(t)}}function zt(e){var n,s;let t=Ge.dirname(e.fileName),r=(s=(n=p.workspace)==null?void 0:n.workspaceFolders.find(o=>t.startsWith(o.uri.path)))==null?void 0:s.uri.path;try{if(L(e.fileName,r,".eslintignore"))return y.appendLine(`File ${e.fileName} is ignored by ESLint.`),[];if(L(e.fileName,r,".prettierignore"))return y.appendLine(`File ${e.fileName} is ignored by Prettier.`),[];let o=e.lineAt(0),i=e.lineAt(e.lineCount-1),a=new p.Range(o.range.start,i.range.end),c=e.getText(a),u=p.workspace.getConfiguration("vs-code-prettier-eslint").get("prettierLast"),d=We({text:c,prettierEslintPath:Ve(e.fileName,"prettier-eslint"),filePath:e.fileName,extensionConfig:{prettierLast:u}});return[p.TextEdit.replace(a,d)]}catch(o){y.appendLine(`Error: ${o.message} 
${o.stack}`)}}var K=["css","graphql","html","javascript","javascriptreact","json","jsonc","less","markdown","mdx","scss","svelte","typescript","typescriptreact","vue","yaml"];function Ht(){return!p.window.activeTextEditor||!K.includes(p.window.activeTextEditor.document.languageId)?new Promise(e=>{let t=p.window.onDidChangeActiveTextEditor(({document:r})=>{K.includes(r.languageId)&&(t.dispose(),e(r))})}):Promise.resolve(p.window.activeTextEditor.document)}async function Zt(e){let t=Ve(e.fileName,"prettier-eslint");We({text:"",prettierEslintPath:t,filePath:e.fileName})}K.forEach(e=>{p.languages.registerDocumentRangeFormattingEditProvider(e,{provideDocumentRangeFormattingEdits(t){return zt(t)}})});Ht().then(e=>Zt(e)).then(()=>{y.appendLine("Worker has been warmed up")}).catch(e=>{y.appendLine(`Error: Could not warm up worker. Formatting a file for the first time may take longer than usual.
Message: ${e.message}
Stacktrace: ${e.stack}`)});
/*! Bundled license information:

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=extension.js.map
