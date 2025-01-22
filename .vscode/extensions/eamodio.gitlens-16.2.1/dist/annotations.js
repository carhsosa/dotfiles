exports.id=459,exports.ids=[459],exports.modules={1432:(e,t,r)=>{r.d(t,{z:()=>BlameAnnotationProviderBase});var o=r(1398),n=r(5823),i=r(2573),a=r(4143),s=r(4007),l=r(9971),u=r(5563),h=Object.defineProperty,c=Object.getOwnPropertyDescriptor;let d=0x40000000-1;let BlameAnnotationProviderBase=class BlameAnnotationProviderBase extends l.wJ{blame;hoverProviderDisposable;constructor(e,t,r,o,n){super(e,t,r,o,n),this.blame=e.git.getBlame(this.trackedDocument.uri,o.document),o.document.isDirty&&n.setForceDirtyStateChangeOnNextDocumentChange()}clear(){return null!=this.hoverProviderDisposable&&(this.hoverProviderDisposable.dispose(),this.hoverProviderDisposable=void 0),super.clear()}async validate(){let e=await this.blame;return!!e?.lines.length}async getBlame(e){e&&(this.blame=this.container.git.getBlame(this.trackedDocument.uri,this.editor.document));let t=await this.blame;if(t?.lines.length)return t}getComputedHeatmap(e){let t,r,o;let n=[];for(let o of e.lines)r!==o.sha&&(r=o.sha,null!=(t=e.commits.get(o.sha))&&n.push(t.date));n.sort((e,t)=>e.getTime()-t.getTime());let i=new Date;i.setDate(i.getDate()-(a.H.get("heatmap.ageThreshold")||90));let s=i.getTime(),l=[],h=[];for(let e of n)e.getTime()<s?h.push(e):l.push(e);o=l.length&&h.length?{hot:p(l),cold:p(h)}:p(n);let c=(e,t)=>Array.isArray(o)?o:t?o.hot.concat(o.cold):e.getTime()<s?o.cold:o.hot,d=(e,t)=>{let r=e.getTime(),o=0;for(let e=0;e<t.length&&(o=e,!(r>=t[e]));e++);return o};return{coldThresholdTimestamp:s,colors:(0,u.v7)(),computeRelativeAge:e=>d(e,c(e)),computeOpacity:e=>{let t=c(e,!0);return Math.max(.2,Math.round((1-d(e,t)/t.length)*100)/100)}}}registerHoverProviders(e){let t=a.H.get("hovers");t.enabled&&t.annotations.enabled&&(e.details||e.changes)&&(this.hoverProviderDisposable?.dispose(),this.hoverProviderDisposable=o.languages.registerHoverProvider({pattern:this.editor.document.uri.fsPath},{provideHover:(t,r,o)=>this.provideHover(e,t,r,o)}))}async provideHover(e,t,r,s){if("line"!==a.H.get("hovers.annotations.over")&&0!==r.character||this.editor.document.uri.toString()!==t.uri.toString())return;let l=await this.getBlame();if(null==l)return;let u=l.lines[r.line],h=l.commits.get(u.sha);if(null==h)return;let c=(await Promise.all([e.details?this.getDetailsHoverMessage(h,t):void 0,e.changes?(0,i.PV)(this.container,h,await n.nk.fromUri(t.uri),r.line,t):void 0])).filter(e=>!!e);return new o.Hover(c,t.validateRange(new o.Range(r.line,0,r.line,d)))}async getDetailsHoverMessage(e,t){let r=this.editor.selection.active.line,o=r+1;r=(e.lines.find(e=>e.line===o)??e.lines[0]).originalLine-1;let s=a.H.get("hovers");return(0,i.MX)(this.container,e,await n.nk.fromUri(t.uri),r,{autolinks:s.autolinks.enabled,dateFormat:a.H.get("defaultDateFormat"),format:s.detailsMarkdownFormat,pullRequests:s.pullRequests.enabled,timeout:250})}};function p(e){let t=[],r=Math.floor(e.length/2),o=e.length%2?e[r].getTime():(e[r-1].getTime()+e[r].getTime())/2,n=(e[e.length-1].getTime()-o)/5;for(let e=5;e>0;e--)t.push(o+n*e);t.push(o),n=(o-e[0].getTime())/4;for(let e=1;e<=4;e++)t.push(o-n*e);return t}((e,t,r,o)=>{for(var n,i=c(t,r),a=e.length-1;a>=0;a--)(n=e[a])&&(i=n(t,r,i)||i);return o&&i&&h(t,r,i)})([(0,s.Rm)({args:!1})],BlameAnnotationProviderBase.prototype,"getComputedHeatmap",1)},37:(e,t,r)=>{r.d(t,{GutterBlameAnnotationProvider:()=>GutterBlameAnnotationProvider});var o=r(1398),n=r(5811),i=r(8400),a=r(4143),s=r(2387),l=r(4007),u=r(5270),h=r(6450),c=r(1165),d=r(7603),p=r(5563),g=r(1432),m=r(9228),f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,y=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),b=e=>{throw TypeError(e)},w=(e,t,r,o)=>{for(var n,i=o>1?void 0:o?v(t,r):t,a=e.length-1;a>=0;a--)(n=e[a])&&(i=(o?n(t,r,i):n(i))||i);return o&&i&&f(t,r,i),i},P=(e,t,r)=>{if(null!=t){var o,n;"object"!=typeof t&&"function"!=typeof t&&b("Object expected"),r&&(o=t[y("asyncDispose")]),void 0===o&&(o=t[y("dispose")],r&&(n=o)),"function"!=typeof o&&b("Object not disposable"),n&&(o=function(){try{n.call(this)}catch(e){return Promise.reject(e)}}),e.push([r,o,t])}else r&&e.push([r]);return t},D=(e,t,r)=>{var o="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},n=e=>t=r?new o(e,t,"An error was suppressed during disposal"):(r=!0,e),i=o=>{for(;o=e.pop();)try{var a=o[1]&&o[1].call(o[2]);if(o[0])return Promise.resolve(a).then(i,e=>(n(e),i()))}catch(e){n(e)}if(r)throw t};return i()};let H=0x40000000-1;let GutterBlameAnnotationProvider=class GutterBlameAnnotationProvider extends g.z{constructor(e,t,r,o){super(e,t,"blame",r,o)}async clear(){if(await super.clear(),null!=m.I.gutterBlameHighlight)try{this.editor.setDecorations(m.I.gutterBlameHighlight,[])}catch{}}async onProvideAnnotation(e,t){var r=[];try{let e,s,l,u,g,f;let v=(0,h.dQ)(),y=await this.getBlame(t?.recompute);if(null==y)return!1;let b=P(r,(0,c.u)(v)),w=a.H.get("blame"),D=(0,d.Vx)(w.format).reduce((e,t)=>(e[t.key]=t.options,e),Object.create(null));i.c.has(w.format,"tips")&&(e=await this.container.git.getBranchesAndTagsTipsLookup(y.repoPath));let H={dateFormat:null===w.dateFormat?a.H.get("defaultDateFormat"):w.dateFormat,getBranchAndTagTips:e,tokenOptions:D},x={family:a.H.get("blame.fontFamily"),size:a.H.get("blame.fontSize"),style:a.H.get("blame.fontStyle"),weight:a.H.get("blame.fontWeight")},k=w.avatars,S=a.H.get("defaultGravatarsStyle"),A=w.separateLines,O=(0,p.kM)(A,w.heatmap,w.avatars,w.format,H,x),R=[],B=new Map,T=k?new Map:void 0,F=!1;for(let e of(w.heatmap.enabled&&(g=this.getComputedHeatmap(y)),y.lines)){let t=e.line-1;if(u===e.sha){if(null==l)continue;l={...l},w.compact&&!F&&(null==f&&(f=n.EO.Space.repeat((0,d.RG)(l.renderOptions.before.contentText))),l.renderOptions={before:{...l.renderOptions.before,contentText:f}},A&&(l.renderOptions.before.textDecoration=`none;box-sizing: border-box${k?";padding: 0 0 0 18px":""}${x.family?`;font-family: ${x.family}`:""}${x.size?`;font-size: ${x.size}px`:""}`),F=!0),l.range=new o.Range(t,0,t,0),R.push(l);continue}if(F=!1,u=e.sha,s=y.commits.get(e.sha),null!=s){if(l=B.get(e.sha),null!=l){l={...l,range:new o.Range(t,0,t,0)},R.push(l);continue}l=(0,p.w)(s,w.format,H,O),null!=g&&(0,p.nx)(l,s.date,g),l.range=new o.Range(t,0,t,0),R.push(l),k&&null!=s.author.email&&await this.applyAvatarDecoration(s,l,S,T),B.set(e.sha,l)}}return b?.restart({suffix:" to compute gutter blame annotations"}),R.length&&(this.setDecorations([{decorationType:m.I.gutterBlameAnnotation,rangesOrOptions:R}]),b?.stop({suffix:" to apply all gutter blame annotations"})),this.registerHoverProviders(a.H.get("hovers.annotations")),!0}catch(e){var s=e,l=!0}finally{D(r,s,l)}}async selection(e){let t;if(!1===e||null==m.I.gutterBlameHighlight)return;let r=await this.blame;if(!r?.lines.length)return;if(e?.sha!=null)t=e.sha;else if(e?.line!=null){if(e.line>=0){let o=r.lines[e.line];t=o?.sha}}else t=u.$1(r.commits.values())?.sha;if(!t){this.editor.setDecorations(m.I.gutterBlameHighlight,[]);return}let n=(0,s.x1)(r.lines,e=>e.sha===t?this.editor.document.validateRange(new o.Range(e.line-1,0,e.line-1,H)):void 0);this.editor.setDecorations(m.I.gutterBlameHighlight,n)}async applyAvatarDecoration(e,t,r,o){let n=o.get(e.author.email??"");if(null==n){let t=(await e.getAvatarUri({defaultStyle:r,size:16})).toString(!0);n={contentText:"",height:"16px",width:"16px",textDecoration:`none;position:absolute;top:1px;left:5px;background:url(${encodeURI(t)});background-size:16px 16px;margin-left: 0 !important`},o.set(e.author.email??"",n)}t.renderOptions.after=n}};w([(0,l.Rm)()],GutterBlameAnnotationProvider.prototype,"onProvideAnnotation",1),w([(0,l.Rm)({args:!1})],GutterBlameAnnotationProvider.prototype,"selection",1)},7847:(e,t,r)=>{r.d(t,{GutterChangesAnnotationProvider:()=>GutterChangesAnnotationProvider});var o=r(1398),n=r(2573),i=r(4143),a=r(4007),s=r(6450),l=r(471),u=r(1165),h=r(9971),c=r(9228),d=Object.defineProperty,p=Object.getOwnPropertyDescriptor,g=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),m=e=>{throw TypeError(e)},f=(e,t,r)=>{if(null!=t){var o,n;"object"!=typeof t&&"function"!=typeof t&&m("Object expected"),r&&(o=t[g("asyncDispose")]),void 0===o&&(o=t[g("dispose")],r&&(n=o)),"function"!=typeof o&&m("Object not disposable"),n&&(o=function(){try{n.call(this)}catch(e){return Promise.reject(e)}}),e.push([r,o,t])}else r&&e.push([r]);return t},v=(e,t,r)=>{var o="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},n=e=>t=r?new o(e,t,"An error was suppressed during disposal"):(r=!0,e),i=o=>{for(;o=e.pop();)try{var a=o[1]&&o[1].call(o[2]);if(o[0])return Promise.resolve(a).then(i,e=>(n(e),i()))}catch(e){n(e)}if(r)throw t};return i()};let y=0x40000000-1;let GutterChangesAnnotationProvider=class GutterChangesAnnotationProvider extends h.wJ{hoverProviderDisposable;sortedHunkStarts;state;constructor(e,t,r,o){super(e,t,"changes",r,o)}canReuse(e){return!(this.annotationContext?.sha!==e?.sha||this.annotationContext?.only!==e?.only)}clear(){return this.state=void 0,null!=this.hoverProviderDisposable&&(this.hoverProviderDisposable.dispose(),this.hoverProviderDisposable=void 0),super.clear()}nextChange(){if(null==this.sortedHunkStarts)return;let e=-1,t=this.editor.selection.active.line;for(let r of this.sortedHunkStarts)if(r>t){e=r;break}-1===e&&(e=this.sortedHunkStarts[0]),e>0&&(this.editor.selection=new o.Selection(e,0,e,0),this.editor.revealRange(new o.Range(e,0,e,0),o.TextEditorRevealType.InCenterIfOutsideViewport))}previousChange(){if(null==this.sortedHunkStarts)return;let e=-1,t=this.editor.selection.active.line;for(let r of this.sortedHunkStarts){if(r>=t)break;e=r}-1===e&&(e=this.sortedHunkStarts[this.sortedHunkStarts.length-1]),e>0&&(this.editor.selection=new o.Selection(e,0,e,0),this.editor.revealRange(new o.Range(e,0,e,0),o.TextEditorRevealType.InCenterIfOutsideViewport))}async onProvideAnnotation(e,t){var r=[];try{let n,i;let a=(0,s.dQ)(),h=this.trackedDocument.uri.sha,d=e?.sha!=null&&e.sha!==h?`${e.sha}^`:void 0,p=null==h&&null==d;if(p){let e=await this.container.git.getOldestUnpushedRefForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri);if(null!=e)e=`${e}^`,n=await this.container.git.getCommitForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri,{ref:e}),null!=n?null!=d?d=e:(h=e,d=""):p=!1;else{let e=await this.container.git.status(this.trackedDocument.uri.repoPath).getStatusForFile?.(this.trackedDocument.uri),t=e?.getPseudoCommits(this.container,await this.container.git.getCurrentUser(this.trackedDocument.uri.repoPath));t?.length?(n=await this.container.git.getCommitForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri),h="HEAD"):this.trackedDocument.dirty?h="HEAD":p=!1}}p||(n=await this.container.git.getCommitForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri,{ref:d??h}),null==n||(null!=d||(h=`${n.ref}^`),d=n.ref));let g=(await Promise.allSettled(null==d&&this.editor.document.isDirty?[this.container.git.getDiffForFileContents(this.trackedDocument.uri,h,this.editor.document.getText()),this.container.git.getDiffForFile(this.trackedDocument.uri,h,d)]:[this.container.git.getDiffForFile(this.trackedDocument.uri,h,d)])).map(e=>(0,l.Ro)(e)).filter(e=>!!e);if(!g?.length)return!1;let m=f(r,(0,u.u)(a)),v=new Map,b=e?.sha!=null&&e?.only?await this.container.git.getBlame(this.trackedDocument.uri,this.editor?.document):void 0;for(let t of(this.sortedHunkStarts=[],g))for(let r of t.hunks){if(null!=b){let t=!0,o=e.sha;for(let e=r.current.position.start-1;e<r.current.position.end;e++)b.lines[e]?.sha===o&&(t=!1);if(t)continue}for(let[e,t]of r.lines){if("unchanged"===t.state)continue;let r=this.editor.document.validateRange(new o.Range(new o.Position(e-1,0),new o.Position(e-1,y)));this.sortedHunkStarts.push(r.start.line),null==i&&(i=new o.Selection(r.start,r.end));let n=v.get(t.state);null==n?(n={decorationType:"added"===t.state?c.I.changesLineAddedAnnotation:"removed"===t.state?c.I.changesLineDeletedAnnotation:c.I.changesLineChangedAnnotation,rangesOrOptions:[{range:r}]},v.set(t.state,n)):n.rangesOrOptions.push({range:r})}}return this.sortedHunkStarts.sort((e,t)=>e-t),m?.restart({suffix:" to compute recent changes annotations"}),v.size&&(this.setDecorations([...v.values()]),m?.stop({suffix:" to apply all recent changes annotations"}),null==i||e?.selection===!1||t?.restoring||(this.editor.selection=i,this.editor.revealRange(i,o.TextEditorRevealType.InCenterIfOutsideViewport))),this.state={commit:n,diffs:g},this.registerHoverProvider(),!0}catch(e){var n=e,i=!0}finally{v(r,n,i)}}registerHoverProvider(){let e=i.H.get("hovers");e.enabled&&e.annotations.enabled&&(this.hoverProviderDisposable?.dispose(),this.hoverProviderDisposable=o.languages.registerHoverProvider({pattern:this.editor.document.uri.fsPath},{provideHover:(e,t,r)=>this.provideHover(e,t,r)}))}async provideHover(e,t,r){if(null==this.state||"line"!==i.H.get("hovers.annotations.over")&&0!==t.character)return;let{commit:a,diffs:s}=this.state;for(let r of s)for(let i of r.hunks){let r=i.previous.count>i.current.count;if(t.line>=i.current.position.start-1&&t.line<=i.current.position.end-(r?0:1)){let s=await (0,n.ec)(a,this.trackedDocument.uri,t.line,i);if(null==s)return;return new o.Hover(s,e.validateRange(new o.Range(i.current.position.start-1,0,i.current.position.end-(r?0:1),y)))}}}};((e,t,r,o)=>{for(var n,i=p(t,r),a=e.length-1;a>=0;a--)(n=e[a])&&(i=n(t,r,i)||i);return o&&i&&d(t,r,i)})([(0,a.Rm)()],GutterChangesAnnotationProvider.prototype,"onProvideAnnotation",1)},6631:(e,t,r)=>{r.d(t,{GutterHeatmapBlameAnnotationProvider:()=>GutterHeatmapBlameAnnotationProvider});var o=r(1398),n=r(4007),i=r(6450),a=r(1165),s=r(5563),l=r(1432),u=Object.defineProperty,h=Object.getOwnPropertyDescriptor,c=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),d=e=>{throw TypeError(e)},p=(e,t,r)=>{if(null!=t){var o,n;"object"!=typeof t&&"function"!=typeof t&&d("Object expected"),r&&(o=t[c("asyncDispose")]),void 0===o&&(o=t[c("dispose")],r&&(n=o)),"function"!=typeof o&&d("Object not disposable"),n&&(o=function(){try{n.call(this)}catch(e){return Promise.reject(e)}}),e.push([r,o,t])}else r&&e.push([r]);return t},g=(e,t,r)=>{var o="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},n=e=>t=r?new o(e,t,"An error was suppressed during disposal"):(r=!0,e),i=o=>{for(;o=e.pop();)try{var a=o[1]&&o[1].call(o[2]);if(o[0])return Promise.resolve(a).then(i,e=>(n(e),i()))}catch(e){n(e)}if(r)throw t};return i()};let GutterHeatmapBlameAnnotationProvider=class GutterHeatmapBlameAnnotationProvider extends l.z{constructor(e,t,r,o){super(e,t,"heatmap",r,o)}async onProvideAnnotation(e,t){var r=[];try{let e;let n=(0,i.dQ)(),l=await this.getBlame(t?.recompute);if(null==l)return!1;let u=p(r,(0,a.u)(n)),h=new Map,c=this.getComputedHeatmap(l);for(let t of l.lines){let r=t.line-1;e=l.commits.get(t.sha),null!=e&&(0,s.n0)(e.date,c,new o.Range(r,0,r,0),h)}return u?.restart({suffix:" to compute heatmap annotations"}),h.size&&(this.setDecorations([...h.values()]),u?.stop({suffix:" to apply all heatmap annotations"})),!0}catch(e){var n=e,l=!0}finally{g(r,n,l)}}};((e,t,r,o)=>{for(var n,i=h(t,r),a=e.length-1;a>=0;a--)(n=e[a])&&(i=n(t,r,i)||i);return o&&i&&u(t,r,i)})([(0,n.Rm)()],GutterHeatmapBlameAnnotationProvider.prototype,"onProvideAnnotation",1)}};