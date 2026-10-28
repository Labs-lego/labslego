// Arcade FrozenBlocks : Memory des briques. Un bouton "Arcade" ouvre le jeu par-dessus la boutique.
(function(){try{
var C=(typeof CONTACT!=="undefined")?CONTACT:"Frozen_blokcNormandy16";
var fab=document.createElement("button");fab.id="gfab";fab.textContent="\ud83d\udd79\ufe0f Arcade";
var ov=document.createElement("div");ov.id="gov";
var host=document.createElement("div");host.id="jeu";
var cl=document.createElement("button");cl.id="gcl";cl.textContent="\u2715";cl.setAttribute("aria-label","Fermer");
ov.appendChild(cl);ov.appendChild(host);
document.body.appendChild(fab);document.body.appendChild(ov);
fab.onclick=function(){ov.style.display="block"};
cl.onclick=function(){ov.style.display="none"};
var st=document.createElement("style");
st.textContent="#gfab{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:12px;z-index:5;box-shadow:0 0 12px rgba(242,178,28,.6);font-weight:800}#gov{display:none;position:fixed;inset:0;z-index:20;background:#0a0a0a;overflow:auto;padding:60px 14px 30px}#gcl{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:12px;z-index:21;width:40px;height:40px;padding:0;border-radius:50%}#gov .titre{color:#fff;text-align:center}"+
".gm{max-width:420px;margin:0 auto;background:#fffdf8;border:1px solid #eadfc6;border-radius:16px;padding:14px;box-shadow:0 9px 0 #8a6a12;text-align:center;color:#3a2f1f}"+
".gm p{margin:0 0 6px;font-weight:800}.gp{background:#fdeccb;border-radius:8px;padding:6px;font-size:.85rem;font-weight:800;margin-bottom:10px}"+
".mg{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px}"+
".mc{aspect-ratio:1;border-radius:10px;border:2px solid #f2b21c;background:#2b1640;font-size:1.9rem;display:grid;place-items:center;padding:0;color:#fff}"+
".mc.f{background:#fff}.mc.m{background:#d9f5df;border-color:#2f9e4f}"+
".gi{display:flex;justify-content:space-around;margin-bottom:8px;font-weight:800}"+
"#gpn{width:100%;border:1px solid #d8c9a6;border-radius:10px;padding:10px;font:inherit;text-align:center;margin-bottom:8px}"+
"#gbtn,#gsend{display:block;width:100%;margin-top:6px;text-decoration:none;text-align:center;box-sizing:border-box;border-radius:10px;padding:12px;font-weight:800}"+
"#gsend{display:none;background:#2f9e4f;color:#fff}"+"#glb{text-align:left;margin:0;padding-left:26px;font-weight:800;font-size:.95rem}";
document.head.appendChild(st);
host.innerHTML='<h2 class="titre">\ud83c\udfae Memory des briques</h2><div class="gm"><p>Trouve les 8 paires en 23 coups max. Si tu gagnes, tu peux rejouer ; si tu perds, reviens dans 24 h !</p>'+
'<div class="gp">Top 10 de la semaine : \ud83e\udd47 10 \u20ac \u00b7 \ud83e\udd48\ud83e\udd49 5 \u20ac \u00b7 4e \u00e0 10e 2 \u20ac</div>'+
'<div class="mg" id="gg"></div>'+
'<div class="gi"><span>Coups : <b id="gmv">0</b>/23</span><span>Temps : <b id="gtm">0</b> s</span><span>Record : <b id="gbs">0</b></span></div>'+
'<input id="gpn" type="text" maxlength="16" placeholder="Ton pseudo" aria-label="Pseudo">'+
'<button id="gbtn">\u25b6 Nouvelle partie</button><a id="gsend" href="#" target="_blank" rel="noopener">\ud83d\udce8 Envoyer mon score</a><h3 style="margin:14px 0 4px">\ud83c\udfc6 Classement de la semaine</h3><ol id="glb"></ol></div>';

function $(i){return document.getElementById(i)}
function wk(){var d=new Date();d=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var j=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-j);var y=new Date(Date.UTC(d.getUTCFullYear(),0,1));return d.getUTCFullYear()+"-S"+Math.ceil(((d-y)/864e5+1)/7)}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var w0=wk(),best=0;
try{var b0=JSON.parse(ld("fb_best")||"{}");if(b0.w===w0)best=b0.b||0}catch(e){}
$("gbs").textContent=best;$("gpn").value=ld("fb_pseudo")||"";

var FACES=["\ud83d\udfe5","\ud83d\udfe8","\ud83d\udfe6","\ud83d\udfe9","\u2b1c","\ud83d\udfeb","\ud83d\udfe7","\ud83d\udfea"];
var PRIZE=["10 \u20ac","5 \u20ac","5 \u20ac","2 \u20ac","2 \u20ac","2 \u20ac","2 \u20ac","2 \u20ac","2 \u20ac","2 \u20ac"];
// Classement partag\u00e9 : colle ici l'adresse de ta base Firebase Realtime Database (sinon classement local seulement)
var LB_URL="https://frozenblocks-arcade-default-rtdb.europe-west1.firebasedatabase.app";
var cards,open,lock,moves,found,t0,timer,score=0,done=false,locked=false,MAXM=23;
function today(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function esc(x){return String(x).replace(/[&<>"']/g,function(c){return "&#"+c.charCodeAt(0)+";"})}
function secs(){return t0?Math.floor((Date.now()-t0)/1000):0}
function pseudo(){var p=($("gpn").value||"").trim()||"Anonyme";sv("fb_pseudo",p);return p}
function link(){var p=pseudo();$("gsend").href="https://t.me/"+C+"?text="+encodeURIComponent("\ud83c\udfc6 Score FrozenBlocks (Memory)\nPseudo : "+p+"\nScore : "+score+"\nCoups : "+moves+"\nTemps : "+secs()+" s\nSemaine : "+w0)}
function showLB(rows){
 var m={};rows.forEach(function(r){if(r&&r.p&&(m[r.p]===undefined||r.s>m[r.p]))m[r.p]=r.s});
 var a=Object.keys(m).map(function(p){return {p:p,s:m[p]}}).sort(function(x,y){return y.s-x.s}).slice(0,10);
 $("glb").innerHTML=a.length?a.map(function(r,i){return "<li>"+esc(r.p)+" \u2014 "+r.s+" pts <small>("+PRIZE[i]+")</small></li>"}).join(""):"<li style='list-style:none'>Personne pour l\u2019instant, sois le premier !</li>";
}
function localRows(){try{var o=JSON.parse(ld("fb_loc")||"{}");return o.w===w0?o.r:[]}catch(e){return []}}
function lbU(){return LB_URL.replace(/\/$/,"")+"/scores/"+w0+".json"}
function loadLB(){
 if(!LB_URL){showLB(localRows());return}
 fetch(lbU()).then(function(r){return r.json()}).then(function(o){showLB(Object.keys(o||{}).map(function(k){return o[k]}))}).catch(function(){showLB(localRows())});
}
function postLB(p,sc){
 if(!LB_URL){var r=localRows();r.push({p:p,s:sc});sv("fb_loc",JSON.stringify({w:w0,r:r}));showLB(r);return}
 fetch(lbU(),{method:"POST",body:JSON.stringify({p:p,s:sc,t:Date.now()})}).then(loadLB).catch(function(){});
}
var endMsg="";
function nextT(){return +ld("fb_next")||0}
function fmt(ms){var s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60);s%=60;return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s}
function tick(){
 if(!locked)return;
 var left=nextT()-Date.now();
 if(left<=0){locked=false;endMsg="";start();return}
 $("gbtn").textContent=(endMsg?endMsg+" \u00b7 ":"")+"\u23f3 Prochain essai dans "+fmt(left);
}
setInterval(tick,1000);
function end(msg){clearInterval(timer);done=true;locked=true;endMsg=msg;tick()}
function win(){
 var s=secs();score=Math.max(10,1000-moves*20-s*5);$("gtm").textContent=s;
 clearInterval(timer);done=true;sv("fb_next",0);$("gbtn").textContent="\u2705 Bravo ! \ud83d\udd04 Rejouer";
 if(score>best){best=score;sv("fb_best",JSON.stringify({w:w0,b:best}));$("gbs").textContent=best}
 link();$("gsend").style.display="block";postLB(pseudo(),score);
}
function check(){if(found===8)win();else if(moves>=MAXM)end("\ud83d\ude22 Perdu ! Reviens demain")}
function flip(i){
 if(lock||done||locked)return;var c=cards[i];if(c.f||c.m)return;
 if(!t0){
  if(!($("gpn").value||"").trim()){$("gpn").focus();$("gbtn").textContent="\u270f\ufe0f Entre ton pseudo d\u2019abord";return}
  pseudo();sv("fb_next",Date.now()+864e5);t0=Date.now();timer=setInterval(function(){$("gtm").textContent=secs()},500);
 }
 c.f=true;open.push(i);draw();
 if(open.length===2){
  moves++;$("gmv").textContent=moves;
  var a=cards[open[0]],b=cards[open[1]];
  if(a.v===b.v){a.m=b.m=true;open=[];found++;draw();check()}
  else{lock=true;setTimeout(function(){a.f=b.f=false;open=[];lock=false;draw();check()},700)}
 }
}
function draw(){
 $("gg").innerHTML=cards.map(function(c,i){return '<button class="mc'+(c.m?' m':c.f?' f':'')+'" data-i="'+i+'" aria-label="Carte">'+(c.f||c.m?FACES[c.v]:"\ud83e\uddf1")+'</button>'}).join("");
}
function start(){
 var used=Date.now()<nextT();
 if(cards&&used)return;
 clearInterval(timer);t0=0;moves=0;found=0;open=[];lock=false;done=false;score=0;locked=used;
 var v=[];for(var i=0;i<8;i++)v.push(i,i);
 for(var j=v.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),t=v[j];v[j]=v[k];v[k]=t}
 cards=v.map(function(x){return {v:x,f:false,m:false}});
 $("gmv").textContent=0;$("gtm").textContent=0;$("gsend").style.display="none";
 $("gbtn").textContent="\ud83d\udd00 M\u00e9langer";
 draw();if(used)tick();
}
$("gg").addEventListener("click",function(e){var b=e.target.closest("[data-i]");if(b)flip(+b.dataset.i)});
$("gbtn").onclick=start;
$("gpn").addEventListener("input",function(){if(done)link()});
start();loadLB();
}catch(e){}})();
