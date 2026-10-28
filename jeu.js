// Frozen Scooter v2 : Arcade FrozenBlocks Lisieux. Le bouton "Arcade" ouvre le jeu par-dessus la boutique.
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
document.head.appendChild(st);
host.innerHTML='<h2 class="titre">❄️ Frozen Scooter</h2><div class="gsub">FROZEN BLOCKS · LISIEUX</div><div class="gm"><p>Touche l’écran pour booster ton scooter entre les blocs de glace. 1 point par passage, 3 essais toutes les 20 h !</p>'+
'<div class="gp">Top 10 de la semaine : 🥇 10 € · 🥈🥉 5 € · 4e à 10e 2 €</div>'+
'<canvas id="gc" width="320" height="480"></canvas>'+
'<div class="gi"><span>Score : <b id="gsc">0</b></span><span>Record : <b id="gbs">0</b></span><span>Essais : <b id="gtr">3</b>/3</span><button id="gmt" aria-label="Son">🔊</button></div>'+
'<input id="gpn" type="text" maxlength="16" placeholder="Ton pseudo" aria-label="Pseudo" enterkeyhint="done" autocomplete="off">'+
'<button id="gbtn">▶ Touche l’écran pour jouer</button><a id="gsend" href="#" target="_blank" rel="noopener">📨 Envoyer mon score</a><h3 style="margin:14px 0 4px">🏆 Classement de la semaine</h3><div id="grk"></div><ol id="glb"></ol></div>';

function $(i){return document.getElementById(i)}
function wk(){var d=new Date();d=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var j=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-j);var y=new Date(Date.UTC(d.getUTCFullYear(),0,1));return d.getUTCFullYear()+"-S"+Math.ceil(((d-y)/864e5+1)/7)}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function esc(x){return String(x).replace(/[&<>"']/g,function(c){return "&#"+c.charCodeAt(0)+";"})}
function hs(s){var h1=0xdeadbeef,h2=0x41c6ce57,i,c;for(i=0;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^h1>>>16,2246822507)^Math.imul(h2^h2>>>13,3266489909);h2=Math.imul(h2^h2>>>16,2246822507)^Math.imul(h1^h1>>>13,3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(36)}
var PCH="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
function pt(id){var t=0;for(var i=0;i<8;i++)t=t*64+PCH.indexOf(id.charAt(i));return t}
var w0=wk(),best=0;
var TOK=ld("ff_tok");if(!TOK){TOK=Math.random().toString(36).slice(2)+Date.now().toString(36)+Math.random().toString(36).slice(2);sv("ff_tok",TOK)}
var K=hs(TOK+"|key");
var PRIZE=["10 €","5 €","5 €","2 €","2 €","2 €","2 €","2 €","2 €","2 €"];
var RANK=["🥇","🥈","🥉"];
function bk(p){return w0+"|"+p.toLowerCase()}
function loadBest(){var p=($("gpn").value||"").trim().slice(0,16),o;best=0;try{o=JSON.parse(ld("ff_best2")||"{}");if(p&&o[bk(p)])best=o[bk(p)]}catch(e){}$("gbs").textContent=best}
function saveBest(p,b){var n={},k;try{var o=JSON.parse(ld("ff_best2")||"{}");for(k in o)if(k.indexOf(w0+"|")===0)n[k]=o[k]}catch(e){}n[bk(p)]=b;sv("ff_best2",JSON.stringify(n))}
$("gpn").value=ld("fb_pseudo")||"";loadBest();

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
var D={s0:2.2,sMax:3.3,sInc:.025,g0:150,gMin:118,gDec:.8,jit:100,dist:190};
function mk(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function hit(y,rx,ry,rw,rh){var cx=Math.max(rx,Math.min(BX,rx+rw)),cy=Math.max(ry,Math.min(y,ry+rh)),dx=BX-cx,dy=y-cy;return dx*dx+dy*dy<R*R}
function Core(seed){this.rnd=mk(seed);this.by=230;this.bv=0;this.pipes=[];this.score=0;this.spd=D.s0;this.gap=D.g0;this.f=0}
Core.prototype.tick=function(fl){
 var s=this,i,p,gb,lp;
 if(fl)s.bv=-6.9;
 s.bv+=.42;s.by+=s.bv;s.f++;
 s.spd=Math.min(D.sMax,D.s0+s.score*D.sInc);s.gap=Math.max(D.gMin,D.g0-s.score*D.gDec);
 lp=s.pipes[s.pipes.length-1];
 for(i=0;i<s.pipes.length;i++)s.pipes[i].x-=s.spd;
 if(!lp||lp.x<W-D.dist){
  var cmin=58+s.gap/2,cmax=H-G-58-s.gap/2,c=lp?Math.max(cmin,Math.min(cmax,lp.gy+lp.g/2+(s.rnd()*2-1)*D.jit)):(cmin+cmax)/2;
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
var OWN={};
function pseudo(){var p=($("gpn").value||"").trim().slice(0,16)||"Anonyme";sv("fb_pseudo",p);return p}
function link(){$("gsend").href="https://t.me/"+C+"?text="+encodeURIComponent("🏆 Score Frozen Scooter\nPseudo : "+curP+"\nScore : "+score+"\nDurée : "+runT+" s\nSemaine : "+w0+"\nRéf : "+seed)}
function showLB(rows){
 var m={},me=(ld("fb_pseudo")||"").trim().toLowerCase(),ix=-1;
 rows.forEach(function(r){if(!r||!r.p)return;var k=String(r.p).toLowerCase();if(!m[k]||r.s>m[k].s)m[k]={p:String(r.p).slice(0,16),s:r.s}});
 var all=Object.keys(m).map(function(k){return m[k]}).sort(function(x,y){return y.s-x.s}),a=all.slice(0,10);
 all.forEach(function(r,i){if(r.p.toLowerCase()===me)ix=i});
 $("grk").textContent=all.length?(ix>=0?"Ta place : "+(ix+1)+"e sur ":"")+all.length+" joueur"+(all.length>1?"s":"")+(ix>=0?"":" cette semaine"):"";
 $("glb").innerHTML=a.length?a.map(function(r,i){return "<li"+(r.p.toLowerCase()===me?" class='me'":"")+"><span>"+(RANK[i]||(i+1)+".")+" "+esc(r.p)+"</span><span>"+r.s+" pts <small>("+PRIZE[i]+")</small></span></li>"}).join(""):"<li>Personne pour l’instant, sois le premier !</li>";
}
function localRows(){try{var o=JSON.parse(ld("ff_loc")||"{}");return o.w===w0?o.r:[]}catch(e){return []}}
function cacheRows(){try{var o=JSON.parse(ld("ff_lbc")||"{}");return o.w===w0?o.r:[]}catch(e){return []}}
function lbU(w){return LB_URL.replace(/\/$/,"")+"/scores/"+w+"-flappy.json"}
// Ne garde que les scores dont la partie rejouée donne exactement le score annoncé, jouée en temps réel,
// avec un seul score par ticket et un pseudo réservé au premier appareil qui l'a utilisé.
function verify(o){
 var ks=Object.keys(o).sort(),owner={},used={},bst={},out=[],i,e,pk;
 for(i=0;i<ks.length;i++){
  e=o[ks[i]];
  if(!e||typeof e.p!=="string"||typeof e.s!=="number"||typeof e.r!=="string"||typeof e.k!=="string"||typeof e.tk!=="string"||typeof e.sd!=="number"||typeof e.n!=="number")continue;
  pk=e.p.trim().slice(0,16).toLowerCase();
  if(!pk||e.s<1||e.tk.length!==20||used[e.tk])continue;
  if(!(pt(ks[i])-pt(e.tk)>=e.n*STEP*.9-2500))continue;
  var v=sim(e.sd,e.r);
  if(!v||v.s!==e.s||v.n!==e.n)continue;
  used[e.tk]=1;
  if(owner[pk]===undefined)owner[pk]=e.k;else if(owner[pk]!==e.k)continue;
  if(!bst[pk]||e.s>bst[pk].s)bst[pk]={p:e.p.trim().slice(0,16),s:e.s};
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
var state,by,bv,pipes,score,spd,gap,t=0,wing,tilt,shake,flash,parts,trail,pop,overAt=0,newBest,medal,startT,runT=0,acc=0,gx=0,raf=0,last=0;
var core=null,flaps=[],pend=false,lastF=0,seed=0,runN=0,curP="",tkP=null,paused=false;
var PH=[],bgI=SHOPS.length-1,bgJ=0,bgT=1;
var stars=[],flakes=[],i0;
for(i0=0;i0<48;i0++)stars.push({x:Math.random()*W,y:Math.random()*(H-G-120),r:Math.random()*1.3+.3,p:Math.random()*6});
for(i0=0;i0<46;i0++)flakes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.7,v:Math.random()*.6+.3,d:Math.random()*1000});

function openG(){w0=wk();loadBest();ov.style.display="block";document.body.style.overflow="hidden";last=0;acc=0;if(!raf)raf=requestAnimationFrame(loop);loadLB();flushPend()}
function closeG(){if(state==="play"||state==="dead")paused=true;ov.style.display="none";document.body.style.overflow=""}

// 3 essais toutes les 20 h (fenêtre glissante), enregistrés avec une signature : un stockage modifié à la main = 3 essais perdus.
var MAXT=3,WIN=20*36e5;
function saveT(a){sv("ff_att",JSON.stringify({a:a,g:hs(a.join(",")+SALT)}))}
function tries(){
 var lim=Date.now()-WIN,raw=ld("ff_att"),o,a,n;
 if(!raw)return [];
 try{o=JSON.parse(raw)}catch(e){o=null}
 if(Array.isArray(o))a=o;
 else if(o&&Array.isArray(o.a)&&o.g===hs(o.a.join(",")+SALT))a=o.a;
 else{n=Date.now();a=[n,n,n];saveT(a)}
 return a.filter(function(x){return typeof x==="number"&&x>lim});
}
function used(){return tries().length}
function left(){return Math.max(0,MAXT-used())}
function showTries(){$("gtr").textContent=left()}
function addTry(){var a=tries();a.push(Date.now());saveT(a);showTries()}
function fmt(ms){var s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60);s%=60;return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s}
function untilNext(){var a=tries();return a.length?Math.min.apply(null,a)+WIN-Date.now():0}
function btnTxt(){
 var l=left();
 if(l<=0)return "⏳ Prochain essai dans "+fmt(untilNext());
 return state==="over"?"🔄 Rejouer ("+l+" essai"+(l>1?"s":"")+" restant"+(l>1?"s":"")+")":"▶ Touche l’écran pour jouer";
}
setInterval(function(){showTries();if(state==="ready"||state==="over"){var s=btnTxt(),b=$("gbtn");if(b.textContent!==s&&b.textContent.indexOf("pseudo")<0)b.textContent=s}},1000);
function okP(i){return !!(PH[i]&&PH[i].naturalWidth>0)}
function firstP(){for(var i=0;i<PH.length;i++)if(okP(i))return i;return -1}
function photoOK(){return firstP()>=0}
function nextBG(){var n=SHOPS.length,k,j;bgJ=bgI;for(k=1;k<=n;k++){j=(bgI+k)%n;if(okP(j)||k===n){bgI=j;break}}bgT=0}
function reset(){
 state="ready";paused=false;core=null;by=230;bv=0;pipes=[];score=0;spd=D.s0;gap=D.g0;wing=0;tilt=0;shake=0;flash=0;parts=[];trail=[];pop=0;newBest=false;medal=0;acc=0;pend=false;
 nextBG();
 $("gsc").textContent=0;$("gsend").style.display="none";$("gpn").disabled=false;$("gbtn").textContent=btnTxt();
}
function burst(x,y,n,cols){for(var i=0;i<n;i++)parts.push({x:x,y:y,vx:(Math.random()-.5)*7,vy:(Math.random()-.85)*6,l:28+Math.random()*22,s:2+Math.random()*3,c:cols[i%cols.length]})}
function finish(){
 var tp=tkP;
 state="over";overAt=Date.now();runT=Math.max(1,Math.round((Date.now()-startT)/1000));
 score=core?core.score:score;
 newBest=score>best;
 if(newBest){best=score;saveBest(curP,best);$("gbs").textContent=best}
 medal=score>=50?4:score>=30?3:score>=15?2:score>=5?1:0;
 $("gpn").disabled=false;
 $("gbtn").textContent=btnTxt();
 if(score>0){link();$("gsend").style.display="block"}
 if(newBest&&score>0)postLB({p:curP,s:score,k:K,sd:seed,n:runN,r:flaps.join(","),tk:""},tp);
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
  if(document.activeElement===$("gpn")||Date.now()-blurAt<600){$("gpn").blur();return}
  var pn=($("gpn").value||"").trim().slice(0,16);
  if(!pn){$("gpn").focus();$("gbtn").textContent="✏️ Entre ton pseudo d’abord";return}
  if(OWN[pn.toLowerCase()]&&OWN[pn.toLowerCase()]!==K){$("gbtn").textContent="⚠️ Ce pseudo est déjà pris, change-le";return}
  w0=wk();loadBest();curP=pseudo();addTry();
  seed=(Math.random()*4294967296)>>>0;core=new Core(seed);by=core.by;bv=0;pipes=core.pipes;flaps=[];lastF=0;runN=0;
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
$("gpn").addEventListener("input",function(){loadBest();if(state==="ready")$("gbtn").textContent=btnTxt()});

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
 if(core.score>sb){score=core.score;pop=10;$("gsc").textContent=score;tone(880,1320,.12,"triangle",.05);if(score%10===0)nextBG()}
 if(s)die(s===2);
}

// ---------- Dessin ----------
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function tx(s,x,y,size,fill,stroke,al){
 ctx.font="800 "+size+"px system-ui,-apple-system,sans-serif";ctx.textAlign="center";ctx.lineJoin="round";
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
 ctx.fillStyle="#ffcf7a";ctx.fillRect(x+8,y-58,w-30,48);ctx.fillStyle="#c9893a";for(c=0;c<4;c++){ctx.beginPath();ctx.ellipse(x+18+c*12,y-24,7,3,0,0,6.3);ctx.fill()}
 ctx.fillStyle="#2a1f26";ctx.fillRect(x+w-18,y-54,13,54);
}
function cafe(x,y,w){
 var top=y-180,r,c;
 ctx.fillStyle="#1f3a4d";ctx.fillRect(x,top,w,180);ctx.fillStyle="#6a8a9a";ctx.fillRect(x-1,top,w+2,6);night(x,top,w,180);
 for(r=0;r<2;r++)for(c=0;c<3;c++){var wx=x+10+c*30,wy=top+14+r*40;ctx.fillStyle="#e6e0d2";ctx.fillRect(wx-1,wy-2,22,30);ctx.fillStyle=lit(9,r,c)?"#ffd98a":"#141a38";ctx.fillRect(wx+1,wy,18,26)}
 ctx.fillStyle="#10202c";rr(x+w/2-22,y-92,44,16,3);ctx.fill();tx("CAFÉ",x+w/2,y-80,11,"#ffd98a");
 awn(x+4,y-74,w-8,"#8e1f2b","#e9e2d0");
 ctx.fillStyle="#ffcf7a";ctx.fillRect(x+8,y-56,w-16,44);ctx.fillStyle="rgba(60,30,10,.55)";for(c=0;c<3;c++)ctx.fillRect(x+16+c*26,y-44,10,24);
 ctx.fillStyle="#2a2a2a";for(c=0;c<2;c++){var tx0=x+16+c*(w-34);ctx.beginPath();ctx.arc(tx0,y-11,6,0,6.3);ctx.fill();ctx.fillRect(tx0-1,y-6,2,6)}
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
  ctx.fillStyle="#174a2b";ctx.beginPath();ctx.arc(x,y-94,24,0,6.3);ctx.arc(x-15,y-78,16,0,6.3);ctx.arc(x+15,y-80,16,0,6.3);ctx.fill();
  ctx.fillStyle="#1d5a36";ctx.beginPath();ctx.arc(x+4,y-100,13,0,6.3);ctx.fill();
  x=k*P-off+135;
  ctx.fillStyle="#222a3c";ctx.fillRect(x-1.5,y-120,3,120);ctx.fillRect(x-1.5,y-120,14,3);
  ctx.save();ctx.shadowColor="#ffe9a8";ctx.shadowBlur=18;ctx.fillStyle="#fff3c4";ctx.beginPath();ctx.arc(x+12,y-115,4.5,0,6.3);ctx.fill();ctx.restore();
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
function col(x,y,w,h){
 if(h<=0)return;
 var g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,"#2b7be0");g.addColorStop(.35,"#8fe3ff");g.addColorStop(.6,"#5db8f5");g.addColorStop(1,"#1f5fc0");
 ctx.fillStyle=g;ctx.fillRect(x,y,w,h);
 ctx.strokeStyle="rgba(255,255,255,.28)";ctx.lineWidth=1.5;
 for(var yy=Math.ceil(y/36)*36;yy<y+h;yy+=36){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+w,yy);ctx.stroke()}
 ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(x+9,y,5,h);
 ctx.strokeStyle="#7fd0ff";ctx.lineWidth=2;ctx.strokeRect(x,y,w,h);
}
function cap(x,y,w,h,down){
 var g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,"#1f5fc0");g.addColorStop(.4,"#9be6ff");g.addColorStop(1,"#2b7be0");
 ctx.fillStyle=g;ctx.fillRect(x,y,w,h);ctx.strokeStyle="#bfeaff";ctx.lineWidth=2;ctx.strokeRect(x,y,w,h);
 ctx.fillStyle="#cfefff";
 for(var i=0;i<5;i++){var tx0=x+6+i*((w-12)/4),l=(i%2?6:10);ctx.beginPath();if(down){ctx.moveTo(tx0-5,y+h);ctx.lineTo(tx0+5,y+h);ctx.lineTo(tx0,y+h+l)}else{ctx.moveTo(tx0-5,y);ctx.lineTo(tx0+5,y);ctx.lineTo(tx0,y-l)}ctx.fill()}
}
function drawPipe(p){var gb=p.gy+p.g;col(p.x,0,PW,p.gy);col(p.x,gb,PW,H-G-gb);cap(p.x-3,p.gy-18,PW+6,18,true);cap(p.x-3,gb,PW+6,18,false)}
function drawGround(){
 var y=H-G,off=gx%76,i;
 ctx.fillStyle="#23252f";ctx.fillRect(0,y,W,G);
 ctx.fillStyle="#f1f1f1";for(i=-1;i<6;i++)ctx.fillRect(i*76-off,y+26,40,22);
 ctx.fillStyle="#cdbf9f";ctx.fillRect(0,y,W,11);
 ctx.strokeStyle="rgba(90,75,50,.45)";ctx.lineWidth=1;var o2=gx%28;for(i=-1;i<13;i++){ctx.beginPath();ctx.moveTo(i*28-o2,y);ctx.lineTo(i*28-o2,y+11);ctx.stroke()}
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=8;ctx.fillStyle="#4db3ff";ctx.fillRect(0,y+11,W,2);ctx.restore();
}
function drawRider(){
 ctx.save();ctx.translate(BX,by);ctx.rotate(tilt*.6);
 var spin=gx*.25,i;
 // boost
 if(wing>0){ctx.fillStyle="rgba(190,235,255,.85)";ctx.beginPath();ctx.moveTo(-18,10);ctx.lineTo(-34-wing,14);ctx.lineTo(-18,18);ctx.fill();ctx.fillStyle="rgba(255,255,255,.9)";ctx.beginPath();ctx.moveTo(-18,12);ctx.lineTo(-27-wing/2,14);ctx.lineTo(-18,16);ctx.fill()}
 // scooter
 ctx.strokeStyle="#1a4fae";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(12,12);ctx.lineTo(9,-9);ctx.lineTo(15,-9);ctx.stroke();
 ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=10;ctx.fillStyle="#2b7be0";rr(-18,8,32,5,2);ctx.fill();ctx.restore();
 for(var w=0;w<2;w++){var wx=w?13:-14;ctx.fillStyle="#10131f";ctx.beginPath();ctx.arc(wx,15,5.5,0,6.3);ctx.fill();ctx.strokeStyle="#bfeaff";ctx.lineWidth=1.2;ctx.stroke();ctx.beginPath();ctx.moveTo(wx+Math.cos(spin)*4,15+Math.sin(spin)*4);ctx.lineTo(wx-Math.cos(spin)*4,15-Math.sin(spin)*4);ctx.stroke()}
 // jambe + bras
 ctx.fillStyle="#6fb7f0";ctx.fillRect(-3,-1,5,10);ctx.strokeStyle="#6fb7f0";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(4,-8);ctx.lineTo(10,-9);ctx.stroke();
 // echarpe
 var fl=Math.sin(t/4)*3;ctx.fillStyle="#3aa0ff";ctx.beginPath();ctx.moveTo(-8,-9);ctx.lineTo(-22,-7+fl);ctx.lineTo(-20,-2+fl);ctx.lineTo(-8,-4);ctx.fill();
 // glacon
 var g=ctx.createLinearGradient(-9,-20,9,0);g.addColorStop(0,"#ffffff");g.addColorStop(.5,"#bfeaff");g.addColorStop(1,"#6fb7f0");
 ctx.save();ctx.shadowColor="rgba(127,208,255,.9)";ctx.shadowBlur=12;rr(-10,-21,20,20,5);ctx.fillStyle=g;ctx.fill();ctx.restore();
 ctx.strokeStyle="#2b6fc4";ctx.lineWidth=2;rr(-10,-21,20,20,5);ctx.stroke();
 ctx.fillStyle="rgba(255,255,255,.85)";ctx.fillRect(-7,-18,7,2.5);
 ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(4,-13,4.2,0,6.3);ctx.fill();ctx.fillStyle="#0a1030";ctx.beginPath();ctx.arc(5.3,-13,2,0,6.3);ctx.fill();
 ctx.fillStyle="#3aa0ff";ctx.fillRect(-10,-6,20,3);
 ctx.restore();
}
function medalGfx(cx,cy,lv){
 var cols=["#4b5a7a","#cd7f32","#c0c8d6","#ffd24a","#7fe8ff"];
 ctx.save();ctx.shadowColor=cols[lv];ctx.shadowBlur=lv?14:0;ctx.fillStyle=cols[lv];ctx.beginPath();ctx.arc(cx,cy,26,0,6.3);ctx.fill();ctx.restore();
 ctx.strokeStyle="rgba(255,255,255,.7)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,20,0,6.3);ctx.stroke();
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
 var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#070b25");g.addColorStop(.6,"#1a2f7a");g.addColorStop(1,"#4a7fd0");
 ctx.fillStyle=g;ctx.fillRect(-10,-10,W+20,H+20);
 var i;
 if(photoOK()){
  var a=okP(bgI)?bgI:firstP();
  if(bgT<1&&okP(bgJ)&&bgJ!==a){drawPhoto(PH[bgJ],1);drawPhoto(PH[a],bgT)}else drawPhoto(PH[a],1);
  var og=ctx.createLinearGradient(0,0,0,H);og.addColorStop(0,"rgba(6,12,40,.5)");og.addColorStop(1,"rgba(6,12,40,.32)");
  ctx.fillStyle=og;ctx.fillRect(0,0,W,H);
 }else{
  for(i=0;i<stars.length;i++){var s=stars[i];ctx.globalAlpha=.4+.6*Math.abs(Math.sin(t/40+s.p));ctx.fillStyle="#fff";ctx.fillRect(s.x,s.y,s.r,s.r)}
  ctx.globalAlpha=1;
  ctx.save();ctx.shadowColor="#bfeaff";ctx.shadowBlur=22;ctx.fillStyle="#eaf6ff";ctx.beginPath();ctx.arc(250,78,22,0,6.3);ctx.fill();ctx.restore();
  ctx.fillStyle="rgba(10,16,48,.55)";ctx.beginPath();ctx.arc(256,72,22,0,6.3);ctx.fill();
  drawCity();
 }
 for(i=0;i<pipes.length;i++)drawPipe(pipes[i]);
 drawGround();
 ctx.fillStyle="#fff";
 for(i=0;i<flakes.length;i++){var f=flakes[i];ctx.globalAlpha=.5+f.r/4;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.3);ctx.fill()}
 ctx.globalAlpha=1;
 for(i=0;i<trail.length;i++){var q=trail[i];ctx.globalAlpha=q.l/26;ctx.fillStyle="#bfeaff";ctx.beginPath();ctx.arc(q.x-(20-q.l)*1.6,q.y,3+(20-q.l)*.12,0,6.3);ctx.fill()}
 ctx.globalAlpha=1;
 drawRider();
 for(i=0;i<parts.length;i++){var p=parts[i];ctx.globalAlpha=Math.min(1,p.l/16);ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,p.s,p.s)}
 ctx.globalAlpha=1;
 if(state==="play"||state==="dead"||state==="over"){
  ctx.save();ctx.translate(W/2,78);var sc=1+pop*.035;ctx.scale(sc,sc);ctx.shadowColor="#3aa0ff";ctx.shadowBlur=14;tx(String(score),0,0,46,"#fff","#0a1f5c");ctx.restore();
 }
 if(state==="ready"){
  if(!photoOK()){ctx.save();ctx.fillStyle="#070d2a";rr(50,96,220,70,10);ctx.fill();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=14;ctx.strokeStyle="#4db3ff";ctx.lineWidth=2.5;rr(50,96,220,70,10);ctx.stroke();ctx.restore();
  ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=12;tx("FROZEN BLOCKS",160,130,21,"#ffffff");ctx.restore();
  tx("L I S I E U X",160,152,12,"#7fd0ff");tx("❄",70,156,15,"#bfeaff");tx("❄",250,156,15,"#bfeaff")}
  tx(left()>0?"Touche pour booster":"Plus d’essai pour l’instant",160,photoOK()?150:205,21,"#ffffff","#0a1f5c",.6+.4*Math.abs(Math.sin(t/20)));
 }
 if(state==="over"){
  var pr=Math.min(1,(Date.now()-overAt)/350);pr=1-Math.pow(1-pr,3);var y0=135+(1-pr)*50;
  ctx.globalAlpha=pr;
  ctx.fillStyle="rgba(6,14,40,.93)";rr(40,y0,240,214,16);ctx.fill();ctx.save();ctx.shadowColor="#3aa0ff";ctx.shadowBlur=14;ctx.strokeStyle="#3aa0ff";ctx.lineWidth=2;rr(40,y0,240,214,16);ctx.stroke();ctx.restore();
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
function loop(ts){
 if(ov.style.display!=="block"){raf=0;return}
 if(last)acc+=Math.min(100,ts-last);last=ts;
 if(paused)acc=0;else while(acc>=STEP){step();acc-=STEP}
 draw();raf=requestAnimationFrame(loop);
}
reset();draw();loadLB();showTries();
}catch(e){}})();
