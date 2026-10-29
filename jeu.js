// Frozen Scooter v3 (scooter JUL, tours de briques de glace, 5 essais, points cumulés) + Roue de la fortune : Arcade FrozenBlocks Lisieux. Le bouton "Arcade" ouvre le jeu par-dessus la boutique.
// Photos des boutiques : shop1.jpg ... shop4.jpg (même dossier que jeu.js).
(function(){try{
var cs0=document.currentScript,BASE=(cs0&&cs0.src)?cs0.src.replace(/[^\/]*$/,""):"";
var C=(typeof CONTACT!=="undefined")?CONTACT:"Frozen_blokcNormandy16";
// Classement partagé (Firebase Realtime Database) : lecture publique pour tous les joueurs.
var LB_URL="https://frozenblocks-arcade-default-rtdb.europe-west1.firebasedatabase.app";
var SHOPS=["shop1.jpg","shop2.jpg","shop3.jpg","shop4.jpg"];
var SALT="fb-lisieux-7";
var fab=document.createElement("button");fab.id="gfab";fab.textContent="🕹️ Arcade";
var ov=document.createElement("div");ov.id="gov";
var host=document.createElement("div");host.id="jeu";
var cl=document.createElement("button");cl.id="gcl";cl.textContent="✕";cl.setAttribute("aria-label","Fermer");
ov.appendChild(cl);ov.appendChild(host);
document.body.appendChild(fab);document.body.appendChild(ov);
fab.onclick=function(){openG()};
cl.onclick=function(){closeG()};
var st=document.createElement("style");
st.textContent="#gfab{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:12px;z-index:5;box-shadow:0 0 12px rgba(242,178,28,.6);font-weight:800}#gov{display:none;position:fixed;inset:0;z-index:20;background:#050814;overflow:auto;padding:60px 14px 30px}#gcl{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:12px;z-index:21;width:40px;height:40px;padding:0;border-radius:50%}#gov .titre{color:#fff;text-align:center;margin:0 0 2px;text-shadow:0 0 12px #3aa0ff}#gov .gsub{color:#7fd0ff;text-align:center;font-size:.72rem;letter-spacing:3px;font-weight:800;margin-bottom:12px}"+
".gm{max-width:380px;margin:0 auto;background:linear-gradient(#0c1637,#08102a);border:1px solid #2a5bd7;border-radius:16px;padding:14px;box-shadow:0 0 26px rgba(58,160,255,.35);text-align:center;color:#e8f1ff}"+
".gm p{margin:0 0 8px;font-weight:700;font-size:.9rem}.gp{background:rgba(58,160,255,.14);border:1px solid rgba(127,208,255,.35);border-radius:8px;padding:6px;font-size:.82rem;font-weight:800;margin-bottom:10px;color:#cfe8ff}"+
"#gc{display:block;width:100%;max-width:340px;aspect-ratio:2/3;margin:0 auto 10px;border-radius:12px;border:1px solid #2a5bd7;touch-action:manipulation;-webkit-user-select:none;user-select:none;background:#0a1030}"+
".gi{display:flex;justify-content:space-around;align-items:center;margin-bottom:8px;font-weight:800}"+
"#gmt{background:rgba(58,160,255,.18);color:#fff;border:1px solid #2a5bd7;border-radius:8px;padding:2px 10px;font-size:1rem}"+
"#gpn{width:100%;border:1px solid #2a5bd7;background:#0a1230;color:#fff;border-radius:10px;padding:10px;font:inherit;text-align:center;margin-bottom:8px;box-sizing:border-box}#gpn:disabled{opacity:.6}"+
"#gbtn,#gsend{display:block;width:100%;margin-top:6px;text-decoration:none;text-align:center;box-sizing:border-box;border-radius:10px;padding:12px;font-weight:800;border:0}"+
"#gbtn{background:#f2b21c;color:#3a2f1f}#gsend{display:none;background:#2f9e4f;color:#fff}#grk{color:#7fd0ff;font-size:.8rem;font-weight:800;margin:0 0 8px}"+
"#glb{list-style:none;margin:0;padding:0;font-weight:800;font-size:.92rem;text-align:left}#glb li{display:flex;justify-content:space-between;gap:8px;padding:4px 2px;border-bottom:1px solid rgba(127,208,255,.15)}#glb li.me{color:#7fd0ff}#glb small{opacity:.85;white-space:nowrap}";
st.textContent+="#gbtn:disabled{opacity:.55}#gc.lk{opacity:.5;filter:grayscale(.4)}#gpn.need{border-color:#f2b21c;box-shadow:0 0 14px rgba(242,178,28,.7)}";document.head.appendChild(st);
host.innerHTML='<h2 class="titre">❄️ Frozen Scooter</h2><div class="gsub">FROZEN BLOCKS · LISIEUX</div><div class="gm"><p>Touche l’écran pour booster ton scooter entre les blocs de glace. 1 point par passage, 5 essais toutes les 20 h, et tes points s’additionnent sur la semaine !</p>'+
'<div class="gp">Top 10 des points cumulés de la semaine : 🥇 10 € · 🥈🥉 5 € · 4e à 10e 2 €</div>'+
'<canvas id="gc" width="320" height="480"></canvas>'+
'<div class="gi"><span>Score : <b id="gsc">0</b></span><span>Total : <b id="gbs">0</b></span><span>Essais : <b id="gtr">5</b>/5</span><button id="gmt" aria-label="Son">🔊</button></div>'+
'<input id="gpn" type="text" maxlength="16" placeholder="Ton pseudo" aria-label="Pseudo" enterkeyhint="done" autocomplete="off">'+
'<button id="gbtn">▶ Touche l’écran pour jouer</button><a id="gsend" href="#" target="_blank" rel="noopener">📨 Envoyer mon score</a><h3 style="margin:14px 0 4px">🏆 Classement de la semaine</h3><div id="grk"></div><ol id="glb"></ol></div>';

function $(i){return document.getElementById(i)}
function wk(){var d=new Date();d=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var j=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-j);var y=new Date(Date.UTC(d.getUTCFullYear(),0,1));return d.getUTCFullYear()+"-S"+Math.ceil(((d-y)/864e5+1)/7)}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function ck(k){var m=document.cookie.match(new RegExp("(?:^|; )"+k+"=([^;]*)"));try{return m?decodeURIComponent(m[1]):null}catch(e){return null}}
function ldC(k){return ld(k)||ck(k)}
function svC(k,v){sv(k,v);try{document.cookie=k+"="+encodeURIComponent(v)+";max-age=93600;path=/;SameSite=Lax"}catch(e){}}
function cp(x){return String(x).replace(/[\u0000-\u001f\u007f<>"'`\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/g,"").trim().slice(0,16)}
function esc(x){return String(x).replace(/[&<>"']/g,function(c){return "&#"+c.charCodeAt(0)+";"})}
function hs(s){var h1=0xdeadbeef,h2=0x41c6ce57,i,c;for(i=0;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^h1>>>16,2246822507)^Math.imul(h2^h2>>>13,3266489909);h2=Math.imul(h2^h2>>>16,2246822507)^Math.imul(h1^h1>>>13,3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(36)}
var PCH="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
function pt(id){var t=0;for(var i=0;i<8;i++)t=t*64+PCH.indexOf(id.charAt(i));return t}
function rf(){try{var a=new Uint32Array(2);crypto.getRandomValues(a);return ((a[0]>>>5)*67108864+(a[1]>>>6))/9007199254740992}catch(e){return Math.random()}}
var w0=wk(),best=0;
var TOK=ld("ff_tok");if(!TOK){TOK=rf().toString(36).slice(2)+Date.now().toString(36)+rf().toString(36).slice(2);sv("ff_tok",TOK)}
var K=hs(TOK+"|key");
var PRIZE=["10 €","5 €","5 €","2 €","2 €","2 €","2 €","2 €","2 €","2 €"];
var RANK=["🥇","🥈","🥉"];
function bk(p){return w0+"|"+p.toLowerCase()}
function loadBest(){var p=cp($("gpn").value||""),o;best=0;try{o=JSON.parse(ld("ff_best2")||"{}");if(p&&o[bk(p)])best=o[bk(p)]}catch(e){}$("gbs").textContent=p?getTot(p):0}
function totK(p){return w0+"|"+p.toLowerCase()}
function getTot(p){try{var o=JSON.parse(ld("ff_tot")||"{}");return o[totK(p)]||0}catch(e){return 0}}
function addTot(p,s){var n={},k,o;try{o=JSON.parse(ld("ff_tot")||"{}");for(k in o)if(k.indexOf(w0+"|")===0)n[k]=o[k]}catch(e){}n[totK(p)]=(n[totK(p)]||0)+s;sv("ff_tot",JSON.stringify(n))}
function saveBest(p,b){var n={},k;try{var o=JSON.parse(ld("ff_best2")||"{}");for(k in o)if(k.indexOf(w0+"|")===0)n[k]=o[k]}catch(e){}n[bk(p)]=b;sv("ff_best2",JSON.stringify(n))}
$("gpn").value=ld("fb_pseudo")||"";loadBest();

var TAU=2*Math.PI;
// ---------- Son ----------
var AC=null,mute=ld("ff_mute")==="1";
$("gmt").textContent=mute?"🔇":"🔊";
$("gmt").onclick=function(){mute=!mute;sv("ff_mute",mute?"1":"0");$("gmt").textContent=mute?"🔇":"🔊"};
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==="suspended"){try{AC.resume()}catch(e){}}return AC}
function tone(f1,f2,d,type,vol){
 if(mute)return;var a=ac();if(!a)return;
 try{var o=a.createOscillator(),g=a.createGain(),n=a.currentTime;o.type=type||"square";o.frequency.setValueAtTime(f1,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(vol||.05,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(a.destination);o.start(n);o.stop(n+d)}catch(e){}
}

// ---------- Moteur déterministe (même code pour jouer et pour vérifier les scores) ----------
//CORE-START
var W=320,H=480,G=64,PW=54,R=11,BX=92,STEP=1000/60;
// Difficulté : départ plus doux, montée progressive plafonnée.
var D0={s0:2.2,sMax:3.3,sInc:.025,g0:150,gMin:118,gDec:.8,jit:100,dist:190,jMax:100,jInc:0,dMin:190,dDec:0};
// Mode difficile : la vitesse, l'écart, la distance entre blocs et les variations de hauteur évoluent jusqu'à ~70 points.
var D1={s0:2.2,sMax:4.5,sInc:.03,g0:150,gMin:98,gDec:.9,jit:90,dist:190,jMax:150,jInc:1,dMin:150,dDec:.8};
// Le mode difficile démarre à la semaine 2026-S45 (les scores de la semaine en cours restent valides).
var HF=(typeof HARD_FROM!=="undefined")?HARD_FROM:202645;
function DW(){var m=/^(\d+)-S(\d+)$/.exec(w0);return (m&&(+m[1])*100+(+m[2])>=HF)?D1:D0}
var D=D0;
function mk(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function hit(y,rx,ry,rw,rh){var cx=Math.max(rx,Math.min(BX,rx+rw)),cy=Math.max(ry,Math.min(y,ry+rh)),dx=BX-cx,dy=y-cy;return dx*dx+dy*dy<R*R}
function Core(seed){D=DW();this.rnd=mk(seed);this.by=230;this.bv=0;this.pipes=[];this.score=0;this.spd=D.s0;this.gap=D.g0;this.f=0}
Core.prototype.tick=function(fl){
 var s=this,i,p,gb,lp;
 if(fl)s.bv=-6.9;
 s.bv+=.42;s.by+=s.bv;s.f++;
 s.spd=Math.min(D.sMax,D.s0+s.score*D.sInc);s.gap=Math.max(D.gMin,D.g0-s.score*D.gDec);
 lp=s.pipes[s.pipes.length-1];
 for(i=0;i<s.pipes.length;i++)s.pipes[i].x-=s.spd;
 if(!lp||lp.x<W-Math.max(D.dMin,D.dist-s.score*D.dDec)){
  var cmin=58+s.gap/2,cmax=H-G-58-s.gap/2,c=lp?Math.max(cmin,Math.min(cmax,lp.gy+lp.g/2+(s.rnd()*2-1)*Math.min(D.jMax,D.jit+s.score*D.jInc))):(cmin+cmax)/2;
  s.pipes.push({x:W+4,gy:c-s.gap/2,g:s.gap,p:false});
 }
 if(s.pipes.length&&s.pipes[0].x<-PW-10)s.pipes.shift();
 for(i=0;i<s.pipes.length;i++){
  p=s.pipes[i];gb=p.gy+p.g;
  if(!p.p&&p.x+PW<BX-R){p.p=true;s.score++}
  if(hit(s.by,p.x,-10,PW,p.gy+10)||hit(s.by,p.x-3,p.gy-18,PW+6,18)||hit(s.by,p.x,gb,PW,H)||hit(s.by,p.x-3,gb,PW+6,18))return 1;
 }
 if(s.by+R>=H-G){s.by=H-G-R;return 2}
 if(s.by<R){s.by=R;if(s.bv<0)s.bv=0}
 return 0;
};
// Rejoue une partie : r = écarts (en images) entre les appuis. Renvoie {s:score,n:image de la mort} ou null si invalide.
function sim(sd,r){
 var a=r.split(","),x=0,i,d,set={},c,st;
 if(a.length>700)return null;
 for(i=0;i<a.length;i++){d=parseInt(a[i],10);if(!(d>=0)||(i>0&&d<4))return null;x+=d;set[x]=1}
 c=new Core(sd);
 while(c.f<20000){st=c.tick(set[c.f]===1);if(st)return {s:c.score,n:c.f}}
 return null;
}
//CORE-END

// ---------- Classement ----------
var OWN={},VC={};
function pseudo(){var p=cp($("gpn").value||"")||"Anonyme";sv("fb_pseudo",p);return p}
function link(){$("gsend").href="https://t.me/"+C+"?text="+encodeURIComponent("🏆 Score Frozen Scooter\nPseudo : "+curP+"\nScore : "+score+"\nDurée : "+runT+" s\nSemaine : "+w0+"\nRéf : "+seed)}
function showLB(rows){
 var m={},me=(ld("fb_pseudo")||"").trim().toLowerCase(),ix=-1;
 rows.forEach(function(r){if(!r||!r.p)return;var k=String(r.p).toLowerCase();if(!m[k])m[k]={p:String(r.p).slice(0,16),s:0};m[k].s+=r.s});
 var all=Object.keys(m).map(function(k){return m[k]}).sort(function(x,y){return y.s-x.s}),a=all.slice(0,10);
 all.forEach(function(r,i){if(r.p.toLowerCase()===me)ix=i});
 if(ix>=0&&state!=="play"&&state!=="dead")$("gbs").textContent=all[ix].s;
 $("grk").textContent=all.length?(ix>=0?"Ta place : "+(ix+1)+"e sur ":"")+all.length+" joueur"+(all.length>1?"s":"")+(ix>=0?"":" cette semaine"):"";
 $("glb").innerHTML=a.length?a.map(function(r,i){return "<li"+(r.p.toLowerCase()===me?" class='me'":"")+"><span>"+(RANK[i]||(i+1)+".")+" "+esc(r.p)+"</span><span>"+r.s+" pts <small>("+PRIZE[i]+")</small></span></li>"}).join(""):"<li>Personne pour l’instant, sois le premier !</li>";
}
function localRows(){try{var o=JSON.parse(ld("ff_loc")||"{}");return o.w===w0?o.r:[]}catch(e){return []}}
function cacheRows(){try{var o=JSON.parse(ld("ff_lbc")||"{}");return o.w===w0?o.r:[]}catch(e){return []}}
function lbU(w){return LB_URL.replace(/\/$/,"")+"/scores/"+w+"-flappy.json"}
// Ne garde que les scores dont la partie rejouée donne exactement le score annoncé, jouée en temps réel,
// avec un seul score par ticket et un pseudo réservé au premier appareil qui l'a utilisé.
function verify(o){
 var ks=Object.keys(o).sort().slice(0,5000),owner={},used={},bst={},out=[],i,e,pk;
 for(i=0;i<ks.length;i++){
  e=o[ks[i]];
  if(!e||typeof e.p!=="string"||typeof e.s!=="number"||typeof e.r!=="string"||typeof e.k!=="string"||typeof e.tk!=="string"||typeof e.sd!=="number"||typeof e.n!=="number")continue;
  pk=cp(e.p).toLowerCase();
  if(!pk||e.r.length>4000||e.s<1||e.tk.length!==20||used[e.tk])continue;
  if(!(pt(ks[i])-pt(e.tk)>=e.n*STEP*.9-2500))continue;
  var v=VC[e.tk];if(v===undefined){v=sim(e.sd,e.r)||0;VC[e.tk]=v}
  if(!v||v.s!==e.s||v.n!==e.n)continue;
  used[e.tk]=1;
  if(owner[pk]===undefined)owner[pk]=e.k;else if(owner[pk]!==e.k)continue;
  if(!bst[pk])bst[pk]={p:cp(e.p),s:0};bst[pk].s+=e.s;
 }
 OWN=owner;
 for(pk in bst)out.push(bst[pk]);
 return out;
}
function loadLB(){
 if(!LB_URL){showLB(localRows());return}
 fetch(lbU(w0)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(o){var rows=verify(o||{});sv("ff_lbc",JSON.stringify({w:w0,r:rows}));showLB(rows)}).catch(function(){showLB(cacheRows());$("grk").textContent="Classement hors ligne (dernier classement connu)"});
}
function getPend(){try{var a=JSON.parse(ld("ff_pend")||"[]");return Array.isArray(a)?a:[]}catch(e){return []}}
function queue(e,w){var a=getPend();a.push({e:e,w:w});sv("ff_pend",JSON.stringify(a.slice(-5)))}
function send(e,w){return fetch(lbU(w),{method:"POST",body:JSON.stringify(e)}).then(function(r){if(!r.ok)throw 0;loadLB()}).catch(function(){queue(e,w)})}
function flushPend(){var a=getPend();if(!a.length||!LB_URL)return;sv("ff_pend","[]");a.forEach(function(x){if(x&&x.e&&x.w)send(x.e,x.w)})}
function getTicket(){
 if(!LB_URL)return Promise.resolve("local");
 return fetch(LB_URL.replace(/\/$/,"")+"/tk/"+w0+".json",{method:"POST",body:JSON.stringify({k:K})}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(o){return (o&&o.name)||""}).catch(function(){return ""});
}
function postLB(e,tp){
 if(!LB_URL){var r=localRows();r.push({p:e.p,s:e.s});sv("ff_loc",JSON.stringify({w:w0,r:r}));showLB(r);return}
 var w=w0;
 tp.then(function(id){if(!id){$("grk").textContent="Connexion perdue au départ : score non classé";return}e.tk=id;return send(e,w)});
}
setInterval(function(){if(ov.style.display==="block"&&!document.hidden&&state!=="play"&&state!=="dead")loadLB()},30000);

// ---------- Jeu ----------
var cv=$("gc"),ctx=cv.getContext("2d"),dpr=Math.min(3,window.devicePixelRatio||1);
cv.width=W*dpr;cv.height=H*dpr;
var lvT=-999,state,by,bv,pipes,score,spd,gap,t=0,wing,tilt,shake,flash,parts,trail,pop,overAt=0,newBest,medal,startT,runT=0,acc=0,gx=0,raf=0,last=0;
var core=null,flaps=[],pend=false,lastF=0,seed=0,runN=0,curP="",tkP=null,paused=false;
var PH=[],bgI=SHOPS.length-1,bgJ=0,bgT=1;
var stars=[],flakes=[],i0;
for(i0=0;i0<48;i0++)stars.push({x:Math.random()*W,y:Math.random()*(H-G-120),r:Math.random()*1.3+.3,p:Math.random()*6});
for(i0=0;i0<46;i0++)flakes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.7,v:Math.random()*.6+.3,d:Math.random()*1000});

function openG(){w0=wk();loadBest();ov.style.display="block";document.body.style.overflow="hidden";last=0;acc=0;if(!raf)raf=requestAnimationFrame(loop);loadLB();flushPend()}
function closeG(){if(state==="play"||state==="dead")paused=true;ov.style.display="none";document.body.style.overflow=""}

// 5 essais toutes les 20 h (fenêtre glissante), enregistrés avec une signature : un stockage modifié à la main = tous les essais perdus.
var MAXT=5,WIN=20*36e5;
function saveT(a){svC("ff_att",JSON.stringify({a:a,g:hs(a.join(",")+SALT)}))}
function tries(){
 var lim=Date.now()-WIN,raw=ldC("ff_att"),o,a,n;
 if(!raw)return [];
 try{o=JSON.parse(raw)}catch(e){o=null}
 if(Array.isArray(o))a=o;
 else if(o&&Array.isArray(o.a)&&o.g===hs(o.a.join(",")+SALT))a=o.a;
 else{n=Date.now();a=[n,n,n,n,n];saveT(a)}
 return a.filter(function(x){return typeof x==="number"&&x>lim});
}
function used(){return tries().length}
function left(){return Math.max(0,MAXT-used())}
function showTries(){$("gtr").textContent=left()}
function addTry(){var a=tries();a.push(Date.now());saveT(a);showTries()}
function fmt(ms){var s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60);s%=60;return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s}
function untilNext(){var a=tries();return a.length?Math.min.apply(null,a)+WIN-Date.now():0}
function nameMsg(){var pn=cp($("gpn").value||"");if(!pn)return "✏️ Entre ton pseudo pour jouer";if(OWN[pn.toLowerCase()]&&OWN[pn.toLowerCase()]!==K)return "⚠️ Ce pseudo est déjà pris, change-le";return ""}
function lockUI(){var rd=state==="ready"&&left()>0,bad=rd&&!!nameMsg();$("gbtn").disabled=bad;$("gc").className=bad?"lk":"";$("gpn").className=bad?"need":""}
function btnTxt(){var m=nameMsg();if(state==="ready"&&left()>0&&m)return m;return btnTxt0()}
function btnTxt0(){
 var l=left();
 if(l<=0)return "⏳ Prochain essai dans "+fmt(untilNext());
 return state==="over"?"🔄 Rejouer ("+l+" essai"+(l>1?"s":"")+" restant"+(l>1?"s":"")+")":"▶ Touche l’écran pour jouer";
}
setInterval(function(){if(ov.style.display!=="block")return;showTries();lockUI();if(state==="ready"||state==="over"){var s=btnTxt(),b=$("gbtn");if(b.textContent!==s)b.textContent=s}},1000);
function okP(i){return !!(PH[i]&&PH[i].naturalWidth>0)}
function firstP(){for(var i=0;i<PH.length;i++)if(okP(i))return i;return -1}
function photoOK(){return firstP()>=0}
function nextBG(){var n=SHOPS.length,k,j;bgJ=bgI;for(k=1;k<=n;k++){j=(bgI+k)%n;if(okP(j)||k===n){bgI=j;break}}bgT=0}
function reset(){
 D=DW();
 state="ready";paused=false;core=null;by=230;bv=0;pipes=[];score=0;spd=D.s0;gap=D.g0;wing=0;tilt=0;shake=0;flash=0;parts=[];trail=[];pop=0;newBest=false;medal=0;acc=0;pend=false;
 nextBG();
 $("gsc").textContent=0;$("gsend").style.display="none";$("gpn").disabled=false;$("gbtn").textContent=btnTxt(),lockUI();
}
function burst(x,y,n,cols){for(var i=0;i<n;i++)parts.push({x:x,y:y,vx:(Math.random()-.5)*7,vy:(Math.random()-.85)*6,l:28+Math.random()*22,s:2+Math.random()*3,c:cols[i%cols.length]})}
function finish(){
 var tp=tkP;
 state="over";overAt=Date.now();runT=Math.max(1,Math.round((Date.now()-startT)/1000));
 score=core?core.score:score;
 newBest=score>best;
 if(newBest){best=score;saveBest(curP,best)}
 if(score>0)addTot(curP,score);$("gbs").textContent=getTot(curP);
 medal=score>=50?4:score>=30?3:score>=15?2:score>=5?1:0;
 $("gpn").disabled=false;
 $("gbtn").textContent=btnTxt(),lockUI();
 if(score>0){link();$("gsend").style.display="block"}
 if(score>0)postLB({p:curP,s:score,k:K,sd:seed,n:runN,r:flaps.join(","),tk:""},tp);
}
function die(ground){
 tone(220,50,.3,"sawtooth",.07);
 try{if(navigator.vibrate)navigator.vibrate(90)}catch(e){}
 runN=core.f;
 shake=14;flash=1;burst(BX,by,16,["#ffffff","#bfeaff","#7fd0ff","#3aa0ff"]);
 if(ground)finish();else{state="dead";bv=-3}
}
function flap(){
 if(paused){paused=false;last=0;acc=0;return}
 if(state==="dead"||state==="over"&&Date.now()-overAt<=700)return;
 if(state==="over"){if(left()>0)reset();return}
 if(state==="ready"){
  if(left()<=0)return;
  if(nameMsg()){$("gpn").focus();$("gbtn").textContent=nameMsg();lockUI();return}
  if(document.activeElement===$("gpn")||Date.now()-blurAt<600){$("gpn").blur();return}
  var pn=cp($("gpn").value||"");
  if(!pn){$("gpn").focus();$("gbtn").textContent="✏️ Entre ton pseudo d’abord";return}
  if(OWN[pn.toLowerCase()]&&OWN[pn.toLowerCase()]!==K){$("gbtn").textContent="⚠️ Ce pseudo est déjà pris, change-le";return}
  w0=wk();loadBest();curP=pseudo();addTry();
  seed=(rf()*4294967296)>>>0;core=new Core(seed);by=core.by;bv=0;pipes=core.pipes;flaps=[];lastF=0;runN=0;
  tkP=getTicket();
  $("gpn").disabled=true;state="play";startT=Date.now();
 }
 pend=true;
}
cv.addEventListener("pointerdown",function(e){e.preventDefault();flap()});
$("gbtn").onclick=function(){flap()};
document.addEventListener("keydown",function(e){
 if(ov.style.display!=="block"||e.target===$("gpn"))return;
 if(e.code==="Space"||e.code==="ArrowUp"){e.preventDefault();flap()}
});
document.addEventListener("visibilitychange",function(){if(document.hidden){last=0;acc=0;if(state==="play"||state==="dead")paused=true}});
var blurAt=0;$("gpn").addEventListener("blur",function(){blurAt=Date.now()});$("gpn").addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();$("gpn").blur()}});
$("gpn").addEventListener("input",function(){loadBest();if(state==="ready")$("gbtn").textContent=btnTxt(),lockUI()});

function fx(){
 var i;
 for(i=0;i<parts.length;i++){var p=parts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.2;p.l--}
 parts=parts.filter(function(p){return p.l>0});
 for(i=0;i<trail.length;i++)trail[i].l--;
 trail=trail.filter(function(p){return p.l>0});
 if(shake>0)shake-=1;flash*=.86;if(pop>0)pop--;if(bgT<1)bgT=Math.min(1,bgT+.02);
 for(i=0;i<flakes.length;i++){var f=flakes[i];f.y+=f.v;f.x+=Math.sin((t+f.d)/40)*.3-(state==="play"?.5:.15);if(f.y>H){f.y=-4;f.x=Math.random()*W}if(f.x<-4)f.x=W+4}
}
function step(){
 t++;fx();
 if(wing>0)wing--;
 if(state==="ready"){gx+=1.2;by=230+Math.sin(t/16)*7;bv=0;tilt=0;if(t%26===0)wing=8;return}
 if(state==="over")return;
 if(state==="dead"){bv+=.42;by+=bv;tilt=Math.max(-.45,Math.min(1.3,bv*.085));if(by+R>=H-G){by=H-G-R;bv=0;finish()}return}
 var fl=false,sb=core.score,s;
 if(pend){
  pend=false;
  if(!flaps.length||core.f-lastF>=4){fl=true;flaps.push(core.f-lastF);lastF=core.f;wing=10;tone(480,760,.09,"square",.04);burst(BX-16,by+14,4,["#ffffff","#bfeaff","#7fd0ff"])}
 }
 s=core.tick(fl);
 by=core.by;bv=core.bv;spd=core.spd;gap=core.gap;pipes=core.pipes;gx+=spd;
 tilt=Math.max(-.45,Math.min(1.3,bv*.085));
 if(t%3===0)trail.push({x:BX-18,y:by+12,l:20});
 if(core.score>sb){score=core.score;pop=10;$("gsc").textContent=score;tone(880,1320,.12,"triangle",.05);if(score%10===0){nextBG();lvT=t}}
 if(s)die(s===2);
}

// ---------- Dessin ----------
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function tx(s,x,y,size,fill,stroke,al){
 ctx.font="800 "+size+"px ui-rounded,'SF Pro Rounded',system-ui,-apple-system,sans-serif";ctx.textAlign="center";ctx.lineJoin="round";
 if(al!==undefined)ctx.globalAlpha=al;
 if(stroke){ctx.lineWidth=Math.max(3,size/5);ctx.strokeStyle=stroke;ctx.strokeText(s,x,y)}
 ctx.fillStyle=fill;ctx.fillText(s,x,y);ctx.globalAlpha=1;
}
var LAY=[{t:"fb",w:132},{t:"br",w:92,pl:1},{t:"bak",w:86},{t:"br",w:92},{t:"fb",w:132},{t:"cafe",w:104},{t:"br",w:92},{t:"pha",w:86}],LP=0;
LAY.forEach(function(b){b.x=LP;LP+=b.w});
function lit(a,b,c){return (((a*7+b*3+c*5)%4)+4)%4===0}
function night(x,y,w,h){ctx.fillStyle="rgba(5,8,20,.26)";ctx.fillRect(x,y,w,h)}
function awn(x,y,w,c1,c2){
 var i,n=8,s=w/n;
 for(i=0;i<n;i++){ctx.fillStyle=i%2?c1:c2;ctx.fillRect(x+i*s,y,s+.5,12);ctx.beginPath();ctx.arc(x+i*s+s/2,y+12,s/2,0,Math.PI);ctx.fill()}
}
function brick(x,y,w,h,k,ix){
 var top=y-h,fl=Math.floor((h-70)/42),r,c;
 ctx.fillStyle="#4a2a2e";ctx.fillRect(x,top,w,h);
 ctx.fillStyle="rgba(0,0,0,.14)";for(r=top+6;r<y-60;r+=10)ctx.fillRect(x,r,w,1);
 ctx.fillStyle="#7a5a52";ctx.fillRect(x-1,top,w+2,6);
 night(x,top,w,h);
 for(r=0;r<fl;r++){
  if(k.pl&&r===fl-1)continue;
  for(c=0;c<2;c++){
   var wx=c?x+w-12-20:x+12,wy=top+16+r*42;
   ctx.fillStyle="#d8d4ca";ctx.fillRect(wx-7,wy,6,28);ctx.fillRect(wx+21,wy,6,28);
   ctx.fillStyle="#e6e0d2";ctx.fillRect(wx-1,wy-2,22,32);
   ctx.fillStyle=lit(ix,r,c)?"#ffd98a":"#141a38";ctx.fillRect(wx+1,wy,18,28);
  }
 }
 ctx.fillStyle="#2a1f26";ctx.fillRect(x+w/2-13,y-54,26,54);ctx.fillStyle="#1a2a4a";ctx.fillRect(x+w/2-10,y-50,20,28);
 ctx.fillStyle="#ffd98a";ctx.fillRect(x+w/2+7,y-26,3,3);
 if(k.pl){
  var pw=84,ph=26,px=x+w/2-pw/2,py=top+16+(fl-1)*42+1;
  ctx.fillStyle="#0b3d91";rr(px,py,pw,ph,3);ctx.fill();ctx.strokeStyle="#ffffff";ctx.lineWidth=1.5;rr(px+1.5,py+1.5,pw-3,ph-3,2);ctx.stroke();
  tx("RUE VICTOR HUGO",x+w/2,py+11,7.6,"#ffffff");tx("14100 LISIEUX",x+w/2,py+21,6.4,"#cfe3ff");
 }
}
function shop(x,y,w){
 var top=y-206,i,r,c;
 ctx.fillStyle="#060a1c";ctx.fillRect(x,top,w,206);
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=10;ctx.strokeStyle="#4db3ff";ctx.lineWidth=2;ctx.strokeRect(x+4,top+8,w-8,46);ctx.restore();
 var cx=x+22,cy=top+31;
 ctx.fillStyle="#bfeaff";ctx.beginPath();ctx.moveTo(cx,cy-11);ctx.lineTo(cx+11,cy-5);ctx.lineTo(cx,cy+1);ctx.lineTo(cx-11,cy-5);ctx.fill();
 ctx.fillStyle="#5db8f5";ctx.beginPath();ctx.moveTo(cx-11,cy-5);ctx.lineTo(cx,cy+1);ctx.lineTo(cx,cy+13);ctx.lineTo(cx-11,cy+7);ctx.fill();
 ctx.fillStyle="#2b7be0";ctx.beginPath();ctx.moveTo(cx+11,cy-5);ctx.lineTo(cx,cy+1);ctx.lineTo(cx,cy+13);ctx.lineTo(cx+11,cy+7);ctx.fill();
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=8;tx("FROZEN BLOCKS",x+w/2+12,top+32,13,"#ffffff");ctx.restore();
 tx("LISIEUX",x+w/2+12,top+46,8,"#7fd0ff");tx("❄",x+w-14,top+22,11,"#bfeaff");
 ctx.fillStyle="#02040f";ctx.fillRect(x+4,top+60,18,140);
 for(i=0;i<6;i++){ctx.fillStyle="#cfe3ff";ctx.fillRect(x+10,top+70+i*21,6,6)}
 var g=ctx.createLinearGradient(0,top+62,0,y);g.addColorStop(0,"#1a1050");g.addColorStop(1,"#3b2a8a");
 ctx.fillStyle=g;ctx.fillRect(x+26,top+62,w-32,138);
 var cols=["#ff6b9a","#7fe8a0","#ffd24a","#7fd0ff","#c58bff"];
 for(r=0;r<4;r++){ctx.fillStyle="rgba(127,208,255,.4)";ctx.fillRect(x+26,top+84+r*30,w-32,2);for(c=0;c<7;c++){ctx.fillStyle=cols[(c+r)%5];ctx.fillRect(x+32+c*13,top+74+r*30,6,9)}}
 tx("❄",x+w/2+12,top+142,28,"rgba(255,255,255,.55)");
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=8;ctx.fillStyle="#4db3ff";ctx.fillRect(x+26,top+60,w-32,2);ctx.fillRect(x+26,y-3,w-32,2);ctx.restore();
}
function bakery(x,y,w){
 var top=y-190,r,c;
 ctx.fillStyle="#b98b4a";ctx.fillRect(x,top,w,190);ctx.fillStyle="#8a6430";ctx.fillRect(x-1,top,w+2,6);night(x,top,w,190);
 for(r=0;r<2;r++)for(c=0;c<2;c++){var wx=x+12+c*(w-44),wy=top+16+r*42;ctx.fillStyle="#e6e0d2";ctx.fillRect(wx-1,wy-2,22,32);ctx.fillStyle=lit(5,r,c)?"#ffd98a":"#141a38";ctx.fillRect(wx+1,wy,18,28)}
 ctx.fillStyle="#3a2412";rr(x+7,y-96,w-14,18,3);ctx.fill();tx("BOULANGERIE",x+w/2,y-83,9,"#ffd98a");
 awn(x+3,y-76,w-6,"#e8873a","#f6e9cf");
 ctx.fillStyle="#ffcf7a";ctx.fillRect(x+8,y-58,w-30,48);ctx.fillStyle="#c9893a";for(c=0;c<4;c++){ctx.beginPath();ctx.ellipse(x+18+c*12,y-24,7,3,0,0,TAU);ctx.fill()}
 ctx.fillStyle="#2a1f26";ctx.fillRect(x+w-18,y-54,13,54);
}
function cafe(x,y,w){
 var top=y-180,r,c;
 ctx.fillStyle="#1f3a4d";ctx.fillRect(x,top,w,180);ctx.fillStyle="#6a8a9a";ctx.fillRect(x-1,top,w+2,6);night(x,top,w,180);
 for(r=0;r<2;r++)for(c=0;c<3;c++){var wx=x+10+c*30,wy=top+14+r*40;ctx.fillStyle="#e6e0d2";ctx.fillRect(wx-1,wy-2,22,30);ctx.fillStyle=lit(9,r,c)?"#ffd98a":"#141a38";ctx.fillRect(wx+1,wy,18,26)}
 ctx.fillStyle="#10202c";rr(x+w/2-22,y-92,44,16,3);ctx.fill();tx("CAFÉ",x+w/2,y-80,11,"#ffd98a");
 awn(x+4,y-74,w-8,"#8e1f2b","#e9e2d0");
 ctx.fillStyle="#ffcf7a";ctx.fillRect(x+8,y-56,w-16,44);ctx.fillStyle="rgba(60,30,10,.55)";for(c=0;c<3;c++)ctx.fillRect(x+16+c*26,y-44,10,24);
 ctx.fillStyle="#2a2a2a";for(c=0;c<2;c++){var tx0=x+16+c*(w-34);ctx.beginPath();ctx.arc(tx0,y-11,6,0,TAU);ctx.fill();ctx.fillRect(tx0-1,y-6,2,6)}
}
function pharma(x,y,w){
 var top=y-196,r,c;
 ctx.fillStyle="#c9d6d2";ctx.fillRect(x,top,w,196);ctx.fillStyle="#8fa39d";ctx.fillRect(x-1,top,w+2,6);night(x,top,w,196);
 for(r=0;r<2;r++)for(c=0;c<2;c++){var wx=x+12+c*(w-44),wy=top+14+r*40;ctx.fillStyle="#e6e0d2";ctx.fillRect(wx-1,wy-2,22,32);ctx.fillStyle=lit(3,r,c)?"#ffd98a":"#141a38";ctx.fillRect(wx+1,wy,18,28)}
 ctx.save();ctx.shadowColor="#3dff8a";ctx.shadowBlur=12;ctx.fillStyle="#3dff8a";ctx.fillRect(x+w/2-3,y-134,6,22);ctx.fillRect(x+w/2-11,y-126,22,6);ctx.restore();
 ctx.fillStyle="#0b5a2a";rr(x+6,y-100,w-12,15,3);ctx.fill();tx("PHARMACIE",x+w/2,y-89,8,"#eafff2");
 ctx.fillStyle="#dff5ff";ctx.fillRect(x+8,y-76,w-30,66);ctx.fillStyle="#2f9e4f";ctx.fillRect(x+14,y-66,w-42,3);ctx.fillRect(x+14,y-46,w-42,3);
 ctx.fillStyle="#2a3a38";ctx.fillRect(x+w-18,y-54,13,54);
}
function drawStreet(){
 var y=H-G,off=gx*.5,P=190,k0=Math.floor(off/P),k,x,i;
 for(k=k0;k<k0+Math.ceil(W/P)+2;k++){
  x=k*P-off+40;
  ctx.fillStyle="#3a2b22";ctx.fillRect(x-3,y-70,6,70);
  ctx.fillStyle="#174a2b";ctx.beginPath();ctx.arc(x,y-94,24,0,TAU);ctx.arc(x-15,y-78,16,0,TAU);ctx.arc(x+15,y-80,16,0,TAU);ctx.fill();
  ctx.fillStyle="#1d5a36";ctx.beginPath();ctx.arc(x+4,y-100,13,0,TAU);ctx.fill();
  x=k*P-off+135;
  ctx.fillStyle="#222a3c";ctx.fillRect(x-1.5,y-120,3,120);ctx.fillRect(x-1.5,y-120,14,3);
  ctx.save();ctx.shadowColor="#ffe9a8";ctx.shadowBlur=18;ctx.fillStyle="#fff3c4";ctx.beginPath();ctx.arc(x+12,y-115,4.5,0,TAU);ctx.fill();ctx.restore();
 }
 off=gx*.6;P=64;k0=Math.floor(off/P);
 for(k=k0;k<k0+Math.ceil(W/P)+2;k++){x=k*P-off;ctx.fillStyle="#2b2523";ctx.fillRect(x-2.5,y-26,5,26);ctx.fillStyle="#6b5a50";ctx.fillRect(x-2.5,y-26,5,3)}
}
function drawCity(){
 var off=gx*.3,y=H-G,k0=Math.floor(off/LP),k,i,b,x;
 for(k=k0;k<k0+Math.ceil(W/LP)+2;k++)for(i=0;i<LAY.length;i++){
  b=LAY[i];x=k*LP+b.x-off;if(x>W||x+b.w<0)continue;
  if(b.t==="fb")shop(x,y,b.w);else if(b.t==="br")brick(x,y,b.w,250,b,i+k*8);else if(b.t==="bak")bakery(x,y,b.w);else if(b.t==="cafe")cafe(x,y,b.w);else pharma(x,y,b.w);
 }
 drawStreet();
}
function spk(x,y,r){ctx.save();ctx.globalCompositeOperation="lighter";ctx.fillStyle="rgba(255,255,255,.95)";ctx.shadowColor="#9be6ff";ctx.shadowBlur=8;
 ctx.beginPath();ctx.moveTo(x,y-r);ctx.lineTo(x+r*.18,y-r*.18);ctx.lineTo(x+r,y);ctx.lineTo(x+r*.18,y+r*.18);ctx.lineTo(x,y+r);ctx.lineTo(x-r*.18,y+r*.18);ctx.lineTo(x-r,y);ctx.lineTo(x-r*.18,y-r*.18);ctx.fill();ctx.restore()}
// Dégradés constants : créés une seule fois (avant : recréés à chaque image).
var GR=(function(){
 function L(y0,y1,st){var g=ctx.createLinearGradient(0,y0,0,y1);st.forEach(function(a){g.addColorStop(a[0],a[1])});return g}
 function R(x,y,r0,r1,st){var g=ctx.createRadialGradient(x,y,r0,x,y,r1);st.forEach(function(a){g.addColorStop(a[0],a[1])});return g}
 return{
  sky:L(0,H,[[0,"#070b25"],[.6,"#1a2f7a"],[1,"#4a7fd0"]]),
  tint:L(0,H,[[0,"rgba(40,90,255,.34)"],[1,"rgba(0,190,255,.2)"]]),
  pink:R(0,H-G,0,190,[[0,"rgba(255,70,190,.2)"],[1,"rgba(255,70,190,0)"]]),
  cyan:R(W,H-G-30,0,210,[[0,"rgba(40,210,255,.24)"],[1,"rgba(40,210,255,0)"]]),
  ov:L(0,H,[[0,"rgba(6,12,40,.5)"],[1,"rgba(6,12,40,.32)"]]),
  vig:R(W/2,H*.5,H*.25,H*.78,[[0,"rgba(0,0,0,0)"],[1,"rgba(2,6,24,.45)"]]),
  hz:L(H-G-120,H-G,[[0,"rgba(150,195,255,0)"],[1,"rgba(150,195,255,.16)"]])
 };
})();
function grade(){
 var i,sh;ctx.save();ctx.globalCompositeOperation="overlay";ctx.fillStyle=GR.tint;ctx.fillRect(0,0,W,H);
 ctx.globalCompositeOperation="lighter";
 for(i=0;i<3;i++){sh=((t*.25+i*130)%(W+260))-130;ctx.fillStyle="rgba(150,215,255,"+(.035+i*.012)+")";ctx.beginPath();ctx.moveTo(sh,0);ctx.lineTo(sh+46,0);ctx.lineTo(sh-80,H-G);ctx.lineTo(sh-126,H-G);ctx.fill()}
 ctx.fillStyle=GR.pink;ctx.fillRect(0,0,W,H);
 ctx.fillStyle=GR.cyan;ctx.fillRect(0,0,W,H);
 ctx.restore();
}
function col(x,y,w,h){
 if(h<=0)return;
 var bw=w-7,BH=38,k,yy,r0,g,a,cx,bg;
 g=ctx.createLinearGradient(x,0,x+bw,0);
 g.addColorStop(0,"rgba(10,48,120,.94)");g.addColorStop(.22,"rgba(64,150,230,.9)");g.addColorStop(.5,"rgba(120,206,252,.88)");g.addColorStop(.82,"rgba(28,100,196,.92)");g.addColorStop(1,"rgba(8,40,104,.96)");
 ctx.save();ctx.shadowColor="rgba(70,185,255,.7)";ctx.shadowBlur=22;ctx.fillStyle=g;ctx.fillRect(x,y,bw,h);ctx.restore();
 ctx.fillStyle="rgba(6,28,78,.97)";ctx.beginPath();ctx.moveTo(x+bw,y);ctx.lineTo(x+w,y+5);ctx.lineTo(x+w,y+h+5);ctx.lineTo(x+bw,y+h);ctx.fill();
 ctx.save();ctx.beginPath();ctx.rect(x,y,bw,h);ctx.clip();
 for(yy=Math.floor(y/BH)*BH,r0=Math.round(yy/BH);yy<y+h;yy+=BH,r0++){
  bg=ctx.createLinearGradient(0,yy,0,yy+BH);bg.addColorStop(0,"rgba(255,255,255,.2)");bg.addColorStop(.18,"rgba(255,255,255,.05)");bg.addColorStop(1,"rgba(2,20,64,.28)");
  ctx.fillStyle=bg;ctx.fillRect(x,yy,bw,BH);
  ctx.fillStyle="rgba(255,255,255,.55)";ctx.fillRect(x,yy,bw,1.2);
  ctx.fillStyle="rgba(2,18,58,.6)";ctx.fillRect(x,yy+BH-2,bw,2);
  ctx.fillStyle="rgba(255,255,255,"+(.05+(r0&1)*.04)+")";ctx.beginPath();ctx.moveTo(x+6,yy+3);ctx.lineTo(x+22,yy+3);ctx.lineTo(x+8,yy+BH-4);ctx.lineTo(x+4,yy+BH-4);ctx.fill();
  cx=x+10+((r0*29)%Math.max(1,bw-24));
  ctx.fillStyle="rgba(255,255,255,.28)";ctx.beginPath();ctx.moveTo(cx,yy+11);ctx.lineTo(cx+4,yy+17);ctx.lineTo(cx,yy+23);ctx.lineTo(cx-4,yy+17);ctx.fill();
 }
 ctx.fillStyle="rgba(255,255,255,.5)";ctx.fillRect(x+4,y,2.5,h);ctx.fillStyle="rgba(255,255,255,.18)";ctx.fillRect(x+10,y,1.2,h);
 ctx.fillStyle="rgba(2,20,62,.3)";ctx.fillRect(x+bw-9,y,9,h);
 ctx.restore();
 ctx.strokeStyle="rgba(180,236,255,.92)";ctx.lineWidth=1.3;ctx.strokeRect(x+.65,y,bw-1.3,h);
 for(k=0,yy=y+30;yy<y+h;yy+=97,k++){a=Math.sin(t/14+k*2.1);if(a>.35)spk(x+10+(k*23)%(bw-20),yy+(k%3)*11,3+a*4)}
}
function cap(x,y,w,h,down){
 var g=ctx.createLinearGradient(x,0,x+w,0),i,s,sx,sh,bv;
 g.addColorStop(0,"#0f3f8c");g.addColorStop(.28,"#9fdcff");g.addColorStop(.6,"#3f9be6");g.addColorStop(1,"#0c3578");
 ctx.save();ctx.shadowColor="rgba(90,200,255,.85)";ctx.shadowBlur=16;ctx.fillStyle=g;rr(x,y,w,h,4);ctx.fill();ctx.restore();
 bv=ctx.createLinearGradient(0,y,0,y+h);bv.addColorStop(0,"rgba(255,255,255,.55)");bv.addColorStop(.5,"rgba(255,255,255,0)");bv.addColorStop(1,"rgba(4,30,90,.4)");ctx.fillStyle=bv;rr(x,y,w,h,4);ctx.fill();
 ctx.fillStyle="rgba(242,178,28,.95)";ctx.fillRect(x+4,down?y+h-3.5:y+1.5,w-8,2);
 ctx.save();rr(x,y,w,h,4);ctx.clip();sh=((t*1.1+x*.7)%(w+60))-30;ctx.fillStyle="rgba(255,255,255,.35)";ctx.beginPath();ctx.moveTo(x+sh,y);ctx.lineTo(x+sh+9,y);ctx.lineTo(x+sh+3,y+h);ctx.lineTo(x+sh-6,y+h);ctx.fill();ctx.restore();
 for(i=0;i<2;i++){sx=x+w*(i?.7:.3);s=down?y+h:y-3;ctx.fillStyle="#7cc4f5";rr(sx-5,s,10,3,1.2);ctx.fill();ctx.fillStyle="rgba(255,255,255,.6)";ctx.fillRect(sx-3.5,s+(down?2:0),5,1)}
 ctx.strokeStyle="rgba(210,246,255,.95)";ctx.lineWidth=1.4;rr(x,y,w,h,4);ctx.stroke();
}
function drawPipe(p){var gb=p.gy+p.g,y=H-G;col(p.x,0,PW,p.gy);col(p.x,gb,PW,y-gb);cap(p.x-3,p.gy-18,PW+6,18,true);cap(p.x-3,gb,PW+6,18,false);var mg=ctx.createLinearGradient(0,y-90,0,y);mg.addColorStop(0,"rgba(160,230,255,0)");mg.addColorStop(1,"rgba(160,230,255,.42)");ctx.fillStyle=mg;ctx.fillRect(p.x-16,y-90,PW+32,90)}
function drawGround(){
 var y=H-G,off=gx%76,i,sx,sy,M=W+40,gr=ctx.createLinearGradient(0,y,0,H);
 gr.addColorStop(0,"#34363f");gr.addColorStop(1,"#1b1c23");
 ctx.fillStyle=gr;ctx.fillRect(0,y,W,G);
 ctx.fillStyle="rgba(255,255,255,.08)";
 for(i=0;i<90;i++){sx=(((i*83)%M-gx)%M+M)%M-20;sy=y+14+(i*37)%(G-16);ctx.fillRect(sx,sy,1+(i%3)*.6,1)}
 ctx.fillStyle="rgba(0,0,0,.25)";
 for(i=0;i<60;i++){sx=(((i*61+17)%M-gx)%M+M)%M-20;sy=y+13+(i*29)%(G-14);ctx.fillRect(sx,sy,2,1.2)}
 var rg=ctx.createLinearGradient(0,y+11,0,H);rg.addColorStop(0,"rgba(80,160,255,.24)");rg.addColorStop(1,"rgba(80,160,255,0)");ctx.fillStyle=rg;ctx.fillRect(0,y+11,W,G-11);
 ctx.strokeStyle="rgba(190,225,255,.09)";ctx.lineWidth=1;for(i=0;i<16;i++){sx=((i*97-gx*(1.5+(i%3)*.5))%(W+90)+(W+90))%(W+90)-45;sy=y+16+(i*29)%(G-18);ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+30+(i%4)*28,sy);ctx.stroke()}
 ctx.fillStyle="rgba(236,236,230,.9)";for(i=-1;i<6;i++)ctx.fillRect(i*76-off,y+26,40,22);
 ctx.fillStyle="rgba(30,30,36,.35)";for(i=-1;i<6;i++){ctx.fillRect(i*76-off+6,y+30,5,2);ctx.fillRect(i*76-off+22,y+40,7,2)}
 var pv=ctx.createLinearGradient(0,y,0,y+11);pv.addColorStop(0,"#dcd1b6");pv.addColorStop(1,"#b3a584");
 ctx.fillStyle=pv;ctx.fillRect(0,y,W,11);
 ctx.strokeStyle="rgba(90,75,50,.45)";ctx.lineWidth=1;var o2=gx%28;for(i=-1;i<13;i++){ctx.beginPath();ctx.moveTo(i*28-o2,y);ctx.lineTo(i*28-o2,y+11);ctx.stroke()}
 ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(0,y,W,1);
 var cs=ctx.createLinearGradient(0,y+11,0,y+19);cs.addColorStop(0,"rgba(0,0,0,.5)");cs.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=cs;ctx.fillRect(0,y+11,W,8);
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=8;ctx.fillStyle="#4db3ff";ctx.fillRect(0,y+11,W,2);ctx.restore();
}
function drawRider(){
 var gy=H-G,hh=Math.max(0,Math.min(1,(gy-by)/gy)),spin=gx*.25,i,w,wx;
 ctx.save();ctx.globalCompositeOperation="lighter";var ug=ctx.createRadialGradient(BX,by+16,0,BX,by+16,36);ug.addColorStop(0,"rgba(70,190,255,.5)");ug.addColorStop(1,"rgba(70,190,255,0)");ctx.fillStyle=ug;ctx.fillRect(BX-36,by-20,72,72);ctx.restore();
 ctx.save();ctx.globalAlpha=.4-.25*hh;ctx.fillStyle="#000";ctx.beginPath();ctx.ellipse(BX,gy+7,20-9*hh,3.2,0,0,TAU);ctx.fill();ctx.restore();
 ctx.save();ctx.translate(BX,by);ctx.rotate(tilt*.6);
 if(PILOT){var pw=64,ph=pw*PILOT.naturalHeight/PILOT.naturalWidth;ctx.drawImage(PILOT,-pw/2,-ph/2,pw,ph);ctx.restore();return}
 if(wing>0){ctx.fillStyle="rgba(190,235,255,.85)";ctx.beginPath();ctx.moveTo(-18,10);ctx.lineTo(-34-wing,14);ctx.lineTo(-18,18);ctx.fill();ctx.fillStyle="rgba(255,255,255,.9)";ctx.beginPath();ctx.moveTo(-18,12);ctx.lineTo(-27-wing/2,14);ctx.lineTo(-18,16);ctx.fill()}
 var hl=ctx.createRadialGradient(17,9,1,22,9,16);hl.addColorStop(0,"rgba(255,244,200,.55)");hl.addColorStop(1,"rgba(255,244,200,0)");ctx.fillStyle=hl;ctx.fillRect(10,-6,30,30);
 var dk=ctx.createLinearGradient(0,8,0,13);dk.addColorStop(0,"#3b86e6");dk.addColorStop(1,"#14408a");
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=8;ctx.fillStyle=dk;rr(-19,8,34,5,2.5);ctx.fill();ctx.restore();
 ctx.fillStyle="#0f1424";ctx.fillRect(-15,8,24,1.6);
 ctx.strokeStyle="#9fbfe2";ctx.lineWidth=3.2;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(13,12);ctx.lineTo(10,-9);ctx.stroke();
 ctx.strokeStyle="#d8ecff";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(12,11);ctx.lineTo(9.2,-8);ctx.stroke();
 ctx.strokeStyle="#15203a";ctx.lineWidth=3.4;ctx.beginPath();ctx.moveTo(5,-9);ctx.lineTo(16,-9);ctx.stroke();ctx.lineCap="butt";
 ctx.strokeStyle="#1a4fae";ctx.lineWidth=2;ctx.beginPath();ctx.arc(-14,15,8,3.4,5.6);ctx.stroke();
 for(w=0;w<2;w++){
  wx=w?13:-14;
  ctx.fillStyle="#0b0d14";ctx.beginPath();ctx.arc(wx,15,6.3,0,TAU);ctx.fill();
  ctx.strokeStyle="rgba(120,140,170,.6)";ctx.lineWidth=1;ctx.beginPath();ctx.arc(wx,15,5.6,3.6,5.2);ctx.stroke();
  ctx.fillStyle="#a9c8e8";ctx.beginPath();ctx.arc(wx,15,3.8,0,TAU);ctx.fill();
  ctx.strokeStyle="#44587a";ctx.lineWidth=1;
  for(i=0;i<3;i++){var an=spin+i*1.047;ctx.beginPath();ctx.moveTo(wx+Math.cos(an)*3.6,15+Math.sin(an)*3.6);ctx.lineTo(wx-Math.cos(an)*3.6,15-Math.sin(an)*3.6);ctx.stroke()}
  ctx.fillStyle="#15203a";ctx.beginPath();ctx.arc(wx,15,1.4,0,TAU);ctx.fill();
 }
 ctx.fillStyle="#6fb7f0";ctx.fillRect(-3,-1,5,9);ctx.fillStyle="#f2f7ff";rr(-6,6.5,10,3.2,1.6);ctx.fill();
 ctx.strokeStyle="#6fb7f0";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(4,-8);ctx.lineTo(10,-9);ctx.stroke();
 ctx.fillStyle="#15203a";ctx.beginPath();ctx.arc(11,-9,2.2,0,TAU);ctx.fill();
 var fl=Math.sin(t/4)*3,sg=ctx.createLinearGradient(-22,-7,-8,-4);sg.addColorStop(0,"#1f6fd6");sg.addColorStop(1,"#5db8f5");
 ctx.fillStyle=sg;ctx.beginPath();ctx.moveTo(-8,-9);ctx.quadraticCurveTo(-15,-9+fl/2,-22,-7+fl);ctx.lineTo(-20,-2+fl);ctx.quadraticCurveTo(-14,-3+fl/2,-8,-4);ctx.fill();
 ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(-18,-5+fl*.8,6,1.5);
 var g=ctx.createLinearGradient(-10,-21,10,-1);g.addColorStop(0,"#ffffff");g.addColorStop(.35,"#d4f1ff");g.addColorStop(.7,"#86c8f2");g.addColorStop(1,"#4f9be0");
 ctx.save();ctx.shadowColor="rgba(127,208,255,.9)";ctx.shadowBlur=12;rr(-10,-21,20,20,5);ctx.fillStyle=g;ctx.fill();ctx.restore();
 ctx.fillStyle="rgba(255,255,255,.55)";ctx.beginPath();ctx.moveTo(-8,-20);ctx.lineTo(6,-20);ctx.lineTo(2,-15);ctx.lineTo(-9,-15);ctx.fill();
 ctx.fillStyle="rgba(30,90,170,.25)";ctx.beginPath();ctx.moveTo(10,-16);ctx.lineTo(10,-3);ctx.lineTo(3,-1);ctx.lineTo(6,-13);ctx.fill();
 ctx.strokeStyle="rgba(255,255,255,.5)";ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(-6,-7);ctx.lineTo(0,-3);ctx.lineTo(3,-8);ctx.stroke();
 ctx.strokeStyle="#2b6fc4";ctx.lineWidth=1.8;rr(-10,-21,20,20,5);ctx.stroke();
 ctx.fillStyle="rgba(255,255,255,.9)";ctx.fillRect(-7,-18,6,2);
 ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(4,-13,4.2,0,TAU);ctx.fill();ctx.fillStyle="#0a1030";ctx.beginPath();ctx.arc(5.3,-13,2.1,0,TAU);ctx.fill();ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(5.9,-13.8,.8,0,TAU);ctx.fill();
 ctx.fillStyle="#3aa0ff";ctx.fillRect(-10,-6,20,3);
 ctx.restore();
}
function medalGfx(cx,cy,lv){
 var cols=["#4b5a7a","#cd7f32","#c0c8d6","#ffd24a","#7fe8ff"];
 ctx.save();ctx.shadowColor=cols[lv];ctx.shadowBlur=lv?14:0;ctx.fillStyle=cols[lv];ctx.beginPath();ctx.arc(cx,cy,26,0,TAU);ctx.fill();ctx.restore();
 ctx.strokeStyle="rgba(255,255,255,.7)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,20,0,TAU);ctx.stroke();
 tx(lv?"★":"❄",cx,cy+8,22,"#ffffff");
}
function drawPhoto(im,a){
 var sc=H/im.naturalHeight,sw=W/sc,span=Math.max(0,im.naturalWidth-sw),u=span?(gx*.12/sc)%(2*span):0,off=u<span?u:2*span-u;
 ctx.globalAlpha=a;ctx.drawImage(im,off,0,sw,im.naturalHeight,0,0,W,H);ctx.globalAlpha=1;
}
function draw(){
 ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.save();
 if(shake>.5)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
 ctx.fillStyle=GR.sky;ctx.fillRect(-10,-10,W+20,H+20);
 var i;
 if(photoOK()){
  var a=okP(bgI)?bgI:firstP();
  if(bgT<1&&okP(bgJ)&&bgJ!==a){drawPhoto(PH[bgJ],1);drawPhoto(PH[a],bgT)}else drawPhoto(PH[a],1);
  ctx.fillStyle=GR.ov;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=GR.vig;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=GR.hz;ctx.fillRect(0,H-G-120,W,120);
 }else{
  for(i=0;i<stars.length;i++){var s=stars[i];ctx.globalAlpha=.4+.6*Math.abs(Math.sin(t/40+s.p));ctx.fillStyle="#fff";ctx.fillRect(s.x,s.y,s.r,s.r)}
  ctx.globalAlpha=1;
  ctx.save();ctx.shadowColor="#bfeaff";ctx.shadowBlur=22;ctx.fillStyle="#eaf6ff";ctx.beginPath();ctx.arc(250,78,22,0,TAU);ctx.fill();ctx.restore();
  ctx.fillStyle="rgba(10,16,48,.55)";ctx.beginPath();ctx.arc(256,72,22,0,TAU);ctx.fill();
  drawCity();
 }
 grade();
 for(i=0;i<pipes.length;i++)drawPipe(pipes[i]);
 drawGround();
 for(i=0;i<flakes.length;i++){var f=flakes[i];if(i%7===0){var bg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*6);bg.addColorStop(0,"rgba(255,255,255,.3)");bg.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=bg;ctx.fillRect(f.x-f.r*6,f.y-f.r*6,f.r*12,f.r*12)}else{ctx.save();ctx.shadowColor="#bfeaff";ctx.shadowBlur=f.r>1.5?6:0;ctx.globalAlpha=.5+f.r/4;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,TAU);ctx.fill();ctx.restore()}}
 ctx.globalAlpha=1;
 ctx.save();ctx.globalCompositeOperation="lighter";for(i=0;i<trail.length;i++){var q=trail[i],qx=q.x-(20-q.l)*1.6,qr=5+(20-q.l)*.5,tg=ctx.createRadialGradient(qx,q.y,0,qx,q.y,qr);tg.addColorStop(0,"rgba(190,240,255,"+Math.min(.7,q.l/26)+")");tg.addColorStop(1,"rgba(60,170,255,0)");ctx.fillStyle=tg;ctx.fillRect(qx-qr,q.y-qr,qr*2,qr*2)}ctx.restore();
 ctx.globalAlpha=1;
 drawRider();
 for(i=0;i<parts.length;i++){var p=parts[i];ctx.globalAlpha=Math.min(1,p.l/16);ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,p.s,p.s)}
 ctx.globalAlpha=1;
 if(state==="play"||state==="dead"||state==="over"){
  ctx.save();ctx.translate(W/2,78);var sc=1+pop*.035;ctx.scale(sc,sc);ctx.fillStyle="rgba(8,22,64,.4)";rr(-40,-44,80,62,18);ctx.fill();ctx.strokeStyle="rgba(150,215,255,.45)";ctx.lineWidth=1.2;rr(-40,-44,80,62,18);ctx.stroke();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=16;tx(String(score),0,0,42,"#fff","#0a1f5c");tx("NIVEAU "+(1+(score/10|0)),0,34,11,"#9bd8ff");ctx.restore();
  if(state==="play"&&score>0&&t-lvT<90)tx("NIVEAU "+(1+(score/10|0))+" ! Ça accélère",160,150,20,"#ffd24a","#0a1f5c",Math.min(1,(90-(t-lvT))/30));
 }
 if(state==="ready"){
  if(!photoOK()){ctx.save();ctx.fillStyle="#070d2a";rr(50,96,220,70,10);ctx.fill();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=14;ctx.strokeStyle="#4db3ff";ctx.lineWidth=2.5;rr(50,96,220,70,10);ctx.stroke();ctx.restore();
  ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=12;tx("FROZEN BLOCKS",160,130,21,"#ffffff");ctx.restore();
  tx("L I S I E U X",160,152,12,"#7fd0ff");tx("❄",70,156,15,"#bfeaff");tx("❄",250,156,15,"#bfeaff")}
  tx(left()>0?(nameMsg()?"✏️ Pseudo d’abord !":"Touche pour booster"):"Plus d’essai pour l’instant",160,photoOK()?150:205,21,"#ffffff","#0a1f5c",.6+.4*Math.abs(Math.sin(t/20)));
 }
 if(state==="over"){
  var pr=Math.min(1,(Date.now()-overAt)/350);pr=1-Math.pow(1-pr,3);var y0=135+(1-pr)*50;
  ctx.globalAlpha=pr;
  var cg=ctx.createLinearGradient(0,y0,0,y0+214);cg.addColorStop(0,"rgba(26,54,128,.94)");cg.addColorStop(1,"rgba(6,12,38,.96)");ctx.fillStyle=cg;rr(40,y0,240,214,20);ctx.fill();ctx.fillStyle="rgba(255,255,255,.07)";rr(40,y0,240,70,20);ctx.fill();ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=20;ctx.strokeStyle="#8fd6ff";ctx.lineWidth=1.5;rr(40,y0,240,214,20);ctx.stroke();ctx.restore();
  tx("PERDU !",160,y0+40,28,"#ffffff","#0a1f5c");
  medalGfx(92,y0+108,medal);
  tx("SCORE",208,y0+86,12,"#7fd0ff");tx(String(score),208,y0+124,40,"#ffffff");tx("Record : "+best,208,y0+150,14,"#cfe8ff");
  if(newBest&&score>0)tx("★ NOUVEAU RECORD ★",160,y0+190,15,"#ffd24a",null,.7+.3*Math.abs(Math.sin(t/12)));
  else tx(left()>0?"Touche pour rejouer":"Reviens plus tard !",160,y0+190,14,"#9db7e8");
  ctx.globalAlpha=1;
 }
 if(paused){ctx.fillStyle="rgba(6,14,40,.72)";ctx.fillRect(0,0,W,H);tx("PAUSE",160,225,34,"#ffffff","#0a1f5c");tx("Touche pour reprendre",160,258,15,"#9db7e8")}
 ctx.restore();
 if(flash>.03){ctx.fillStyle="rgba(255,255,255,"+(flash*.55)+")";ctx.fillRect(0,0,W,H)}
}
// Photos des boutiques (shop1.jpg ... shop4.jpg). Sans elles, le décor dessiné est utilisé.
SHOPS.forEach(function(n,i){var im=new Image();im.onload=function(){PH[i]=im};im.src=BASE+n});
// Pilote : image détourée pilote.png (ou .webp / .jpg) à côté de jeu.js. Sans elle, le scooter dessiné d’origine est utilisé.
var PILOT=null;
(function nx(k){var L=(typeof PILOT_SRC!=="undefined")?[PILOT_SRC]:["data:image/png;base64,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"];if(k>=L.length)return;var im=new Image();im.onload=function(){PILOT=im};im.onerror=function(){nx(k+1)};im.src=L[k]})(0);
function loop(ts){
 if(ov.style.display!=="block"){raf=0;return}
 if(last)acc+=Math.min(100,ts-last);last=ts;
 if(paused)acc=0;else while(acc>=STEP){step();acc-=STEP}
 draw();raf=requestAnimationFrame(loop);
}
// ---------- Roue de la fortune (1 tour toutes les 25 h) ----------
var WP=[{t:"🥶 Perdu",c:"#24356b",w:29},{t:"🔥 Un BIC",c:"#2b7be0",w:6,v:1,img:"bic"},{t:"❄️ -10 %",c:"#4db3ff",w:16,v:1},{t:"🥶 Perdu",c:"#1b2a5c",w:29},{t:"📦 Paquet OCB",c:"#1f5fc0",w:10,v:1,img:"bob"},{t:"💎 1 € de réduc",c:"#6fb7f0",w:10,v:1,img:["-1€","euro"]}];
var WN=WP.length,WA=2*Math.PI/WN,WD=25*36e5,wrot=0,wspin=false;
var wfab=document.createElement("button");wfab.id="wfab";wfab.textContent="❄️ Roue";
var wov=document.createElement("div");wov.id="wov";
wov.innerHTML='<button id="wcl" aria-label="Fermer">✕</button><h2 class="titre">❄️ Roue Glacée</h2><div class="gsub">FROZEN BLOCKS · LISIEUX</div><div class="gm"><p>Fais tourner la roue givrée : 1 tour toutes les 25 h !</p><canvas id="wc" width="300" height="320" style="width:100%;max-width:300px;display:block;margin:0 auto 12px;transform:perspective(650px) rotateX(24deg);filter:drop-shadow(0 0 14px rgba(58,160,255,.55))"></canvas><button id="wgo">🎡 Tourner la roue</button><div id="wres"></div></div>';
document.body.appendChild(wfab);document.body.appendChild(wov);
var st2=document.createElement("style");
st2.textContent="#wfab{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));left:12px;z-index:5;box-shadow:0 0 12px rgba(58,160,255,.6);font-weight:800}#wov{display:none;position:fixed;inset:0;z-index:22;background:linear-gradient(#050814,#0c1637 60%,#123079);overflow:auto;padding:60px 14px 30px}#wov::before{content:\"\";position:fixed;inset:0;pointer-events:none;background-image:radial-gradient(2px 2px at 20px 30px,#fff,transparent),radial-gradient(3px 3px at 80px 90px,#cfefff,transparent),radial-gradient(2px 2px at 140px 20px,#fff,transparent),radial-gradient(2px 2px at 60px 150px,#bfeaff,transparent);background-size:170px 170px;opacity:.7;animation:wsn 9s linear infinite}@keyframes wsn{to{background-position:-40px 170px}}#wov>*{position:relative}#wov>#wcl{position:fixed}#wcl{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:12px;z-index:23;width:40px;height:40px;padding:0;border-radius:50%}#wov .titre{color:#fff;text-align:center;margin:0 0 2px;text-shadow:0 0 12px #3aa0ff}#wov .gsub{color:#7fd0ff;text-align:center;font-size:.72rem;letter-spacing:3px;font-weight:800;margin-bottom:12px}#wgo{display:block;width:100%;box-sizing:border-box;border:0;border-radius:10px;padding:12px;font-weight:800;background:#f2b21c;color:#3a2f1f}#wgo:disabled{opacity:.7}#wov .gm{box-shadow:0 0 26px rgba(58,160,255,.35)}#wres{margin-top:12px;font-weight:800;color:#cfe8ff;line-height:1.5}";
document.head.appendChild(st2);
function wGet(){var raw=ldC("ff_wh"),o=null;if(!raw)return null;try{o=JSON.parse(raw)}catch(e){}if(o&&o.g===hs(o.t+","+o.p+SALT))return o;return {t:Date.now(),p:-1,g:""}}
function wLeft(){var o=wGet();return o?Math.max(0,o.t+WD-Date.now()):0}
var wt=0,wPar=[],wTick=-1,wFlick=0,wWin=0,wS=null,wraf=0;
st2.textContent+="@keyframes wpop{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}@keyframes wpl{50%{transform:scale(1.05);box-shadow:0 0 18px rgba(242,178,28,.8)}}#wgo:not(:disabled){animation:wpl 1.3s ease-in-out infinite}";
function wDraw(){var c=$("wc").getContext("2d"),i,r=136,g,L=wS?80:320;c.clearRect(0,0,300,320);
 c.fillStyle="rgba(0,0,0,.35)";c.beginPath();c.ellipse(150,306,118,9,0,0,TAU);c.fill();
 for(i=14;i>0;i--){c.fillStyle=i>7?"#0a1d52":"#123079";c.beginPath();c.arc(150,150+i,146,0,TAU);c.fill()}
 c.save();c.translate(150,150);
 c.shadowColor="#3aa0ff";c.shadowBlur=16+wWin*24;c.fillStyle="#bfeaff";c.beginPath();c.arc(0,0,146,0,TAU);c.fill();c.shadowBlur=0;
 c.fillStyle="#0a1a4a";c.beginPath();c.arc(0,0,141,0,TAU);c.fill();
 c.rotate(wrot);
 for(i=0;i<WN;i++){c.beginPath();c.moveTo(0,0);c.arc(0,0,r,i*WA-Math.PI/2,(i+1)*WA-Math.PI/2);c.closePath();c.fillStyle=WP[i].c;c.fill();
  g=c.createRadialGradient(0,0,10,0,0,r);g.addColorStop(0,"rgba(255,255,255,.4)");g.addColorStop(1,"rgba(255,255,255,0)");c.fillStyle=g;c.fill();
  c.strokeStyle="rgba(207,239,255,.85)";c.lineWidth=2;c.stroke();
  c.save();c.rotate((i+.5)*WA-Math.PI/2);c.shadowColor="rgba(5,20,60,.9)";c.shadowBlur=4;c.fillStyle="#fff";c.font="800 13px system-ui,sans-serif";c.textAlign="right";c.fillText(WP[i].t,r-12,5);c.restore()}
 c.restore();
 for(i=0;i<24;i++){var a=i*Math.PI/12,on=(Math.floor(wt/L)+i)%2===0;c.save();c.shadowColor="#9be6ff";c.shadowBlur=on?10:0;c.fillStyle=on?"#ffffff":"#4a6fb5";c.beginPath();c.arc(150+Math.cos(a)*141,150+Math.sin(a)*141,3,0,TAU);c.fill();c.restore()}
 c.save();c.translate(150,150);c.shadowColor="#3aa0ff";c.shadowBlur=10;g=c.createLinearGradient(-17,-17,17,17);g.addColorStop(0,"#ffffff");g.addColorStop(1,"#6fb7f0");c.fillStyle=g;c.beginPath();c.arc(0,0,18,0,TAU);c.fill();c.restore();
 c.fillStyle="#1a4fae";c.font="800 19px system-ui,sans-serif";c.textAlign="center";c.fillText("❄",150,157);
 c.save();c.translate(150,14);c.rotate(-wFlick*.5);c.translate(-150,-14);c.shadowColor="#3aa0ff";c.shadowBlur=10;c.fillStyle="#e8f7ff";c.strokeStyle="#2b6fc4";c.lineWidth=2;c.beginPath();c.moveTo(137,1);c.lineTo(163,1);c.lineTo(150,32);c.closePath();c.fill();c.stroke();c.restore();
 for(i=0;i<wPar.length;i++){var q=wPar[i];c.globalAlpha=Math.min(1,q.l/25);c.fillStyle=q.c;c.fillRect(q.x,q.y,q.s,q.s*.6)}c.globalAlpha=1}
function wShow(){var o=wGet(),l=wLeft(),b=$("wgo");b.disabled=wspin||l>0;b.textContent=wspin?"❄️ …":l>0?"⏳ Prochain tour dans "+fmt(l):"❄️ Tourner la roue";
 if(wspin||!o||o.p<0||o.p>=WN)return;var p=WP[o.p];
 $("wres").innerHTML="Dernier tirage : "+esc(p.t)+(p.v?"<br>📸 Garde une capture d’écran pour ta boutique<br>Code : <b>"+hs(o.t+"|"+TOK+"|"+o.p).slice(0,6).toUpperCase()+"</b><br><small>"+new Date(o.t).toLocaleString("fr-FR")+"</small>":"")}
var wpe=document.createElement("div");wpe.id="wpop";wov.appendChild(wpe);
st2.textContent+="#wpop{display:none;position:fixed;inset:0;z-index:24;background:rgba(3,8,26,.8);align-items:center;justify-content:center;padding:20px}#wov>#wpop{position:fixed}#wpop.on{display:flex}#wpop .cd{background:linear-gradient(#123079,#0a1a4a);border:2px solid #7fd0ff;border-radius:20px;padding:24px 20px;text-align:center;color:#fff;max-width:320px;width:100%;box-shadow:0 0 40px rgba(58,160,255,.7);animation:wzoom .7s cubic-bezier(.2,1.4,.4,1)}#wpop .em{font-size:84px;line-height:1.1;filter:drop-shadow(0 0 18px #7fd0ff);animation:wbig 1.2s ease-in-out infinite}#wpop h3{margin:6px 0 0;font-size:1.6rem;text-shadow:0 0 12px #3aa0ff}#wok{display:block;width:100%;margin-top:16px;border:0;border-radius:10px;padding:12px;font-weight:800;background:#f2b21c;color:#3a2f1f}@keyframes wzoom{0%{transform:scale(0) rotate(-20deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}@keyframes wbig{50%{transform:scale(1.14)}}";
WP.forEach(function(p){if(!p.img)return;var L=[],k=0;[].concat(p.img).forEach(function(b){[".jpg",".png",".jpeg",".webp",".JPG",".PNG"].forEach(function(x){L.push(b+x)})});(function nx(){if(k>=L.length)return;var im=new Image();im.onload=function(){p.im=im};im.onerror=nx;im.src=BASE+encodeURIComponent(L[k++])})()});
function wPop(w){var o=wGet(),p=WP[w],em,nm;if(!o||!p)return;em=p.t.split(" ")[0];nm=p.t.slice(em.length+1);
 wpe.innerHTML='<div class="cd">'+(p.im?'<img src="'+p.im.src+'" alt="" style="width:150px;height:150px;object-fit:cover;border-radius:18px;border:2px solid #7fd0ff;box-shadow:0 0 22px rgba(58,160,255,.8);animation:wbig 1.2s ease-in-out infinite">':'<div class="em">'+em+'</div>')+'<h3>'+(p.v?"BRAVO !":"Dommage…")+'</h3><div style="font-size:1.2rem;font-weight:800;margin:6px 0">'+esc(nm)+'</div>'+(p.v?'<div>Code à montrer en boutique</div><div style="font-size:1.8rem;font-weight:800;letter-spacing:4px;color:#ffd24a">'+hs(o.t+"|"+TOK+"|"+o.p).slice(0,6).toUpperCase()+'</div><div style="font-size:.8rem;margin-top:4px;color:#cfe8ff">'+esc(ld("fb_pseudo")||"")+' · '+new Date(o.t).toLocaleString("fr-FR")+'</div><div style="margin-top:12px;padding:8px;border-radius:10px;background:rgba(242,178,28,.18);border:1px solid #f2b21c;font-weight:800;font-size:.9rem">📸 Fais une capture d’écran de cet écran et montre-la en boutique pour récupérer ton lot !</div>':'<div>Reviens dans 25 h !</div>')+'<button id="wok">OK</button></div>';
 wpe.className="on";$("wok").onclick=function(){wpe.className=""}}
function wLoop(ts){
 if(wov.style.display!=="block"){wraf=0;return}
 var P=2*Math.PI,i,q;wt=ts;
 if(wS){var p=Math.min(1,(ts-wS.t0)/5200),idx;wrot=wS.r0+(wS.fin-wS.r0)*(1-Math.pow(1-p,4));
  idx=Math.floor((((-wrot)%P)+P)%P/WA);if(idx!==wTick){if(wTick>=0){wFlick=1;tone(1000,600,.04,"square",.03)}wTick=idx}
  if(p>=1){wrot=wS.fin%P;var w=wS.i;wS=null;wspin=false;wTick=-1;wShow();setTimeout(function(){wPop(w)},600);var rs=$("wres");rs.style.animation="none";void rs.offsetWidth;rs.style.animation="wpop .6s ease-out";
   if(WP[w].v){wWin=1;for(i=0;i<80;i++)wPar.push({x:150,y:150,vx:(Math.random()-.5)*11,vy:-Math.random()*10-2,l:60+Math.random()*50,s:4+Math.random()*5,c:["#ffffff","#bfeaff","#7fd0ff","#3aa0ff","#f2b21c"][i%5]});tone(660,1320,.35,"triangle",.07);setTimeout(function(){tone(880,1760,.3,"triangle",.06)},180)}else tone(300,120,.35,"sawtooth",.04)}}
 wFlick*=.8;wWin*=.97;
 for(i=0;i<wPar.length;i++){q=wPar[i];q.x+=q.vx;q.y+=q.vy;q.vy+=.28;q.l--}
 wPar=wPar.filter(function(q){return q.l>0});
 wDraw();wraf=requestAnimationFrame(wLoop);
}
$("wgo").onclick=function(){
 if(wspin||wLeft()>0)return;
 var tot=0,i,x,n=Date.now(),P=2*Math.PI;
 for(i=0;i<WN;i++)tot+=WP[i].w;x=rf()*tot;
 for(i=0;i<WN-1;i++){x-=WP[i].w;if(x<0)break}
 svC("ff_wh",JSON.stringify({t:n,p:i,g:hs(n+","+i+SALT)}));
 wspin=true;$("wres").textContent="";wShow();
 var r0=wrot%P,tg=-(i+.5)*WA+(Math.random()-.5)*WA*.7;
 wS={r0:r0,fin:r0+8*P+((((tg%P)+P)%P)-r0+P)%P,t0:performance.now(),i:i};
 if(!wraf)wraf=requestAnimationFrame(wLoop);
};
wfab.onclick=function(){wov.style.display="block";document.body.style.overflow="hidden";wShow();if(!wraf)wraf=requestAnimationFrame(wLoop)};
$("wcl").onclick=function(){wpe.className="";wov.style.display="none";document.body.style.overflow=""};
setInterval(function(){if(wov.style.display==="block")wShow()},1000);

reset();draw();loadLB();showTries();lockUI();
}catch(e){if(window.console)console.error("[Arcade]",e)}})();
