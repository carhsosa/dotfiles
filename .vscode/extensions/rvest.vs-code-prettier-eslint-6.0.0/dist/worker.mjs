var l=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(r,t)=>(typeof require<"u"?require:r)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});import{isAbsolute as T}from"path";function d(e,r,t,n){function a(o){return o instanceof t?o:new t(function(i){i(o)})}return new(t||(t=Promise))(function(o,i){function u(s){try{c(n.next(s))}catch(f){i(f)}}function b(s){try{c(n.throw(s))}catch(f){i(f)}}function c(s){s.done?o(s.value):a(s.value).then(u,b)}c((n=n.apply(e,r||[])).next())})}import{createRequire as m}from"node:module";import{MessageChannel as P,Worker as F,parentPort as E,receiveMessageOnPort as N,workerData as y}from"node:worker_threads";var{SYNCKIT_BUFFER_SIZE:h,SYNCKIT_TIMEOUT:w,SYNCKIT_EXEC_ARGV:p,SYNCKIT_TS_RUNNER:U,NODE_OPTIONS:D}=process.env,I=h?+h:void 0,L=w?+w:void 0;var $=(p==null?void 0:p.split(","))||[];function S(e){if(e&&typeof e=="object"){let r={};for(let t in e)r[t]=e[t];return r}}var C=typeof l>"u"?m(import.meta.url):l;function _(e){if(!y)return;let{workerPort:r}=y;E.on("message",({sharedBuffer:t,id:n,args:a})=>{d(this,void 0,void 0,function*(){let o=new Int32Array(t),i;try{i={id:n,result:yield e(...a)}}catch(u){i={id:n,error:u,properties:S(u)}}r.postMessage(i),Atomics.add(o,0,1),Atomics.notify(o,0)})})}import{pathToFileURL as v}from"url";_(async({text:e,prettierEslintPath:r,filePath:t,extensionConfig:n})=>{let a=(await(T(r)?import(v(r)):import(r))).default;return a({text:e,filePath:t,logLevel:"info",prettierLast:n==null?void 0:n.prettierLast})});
//# sourceMappingURL=worker.mjs.map
