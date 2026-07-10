(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ i18n ============ */
var NL={
 "nav.about":"over","nav.work":"werk","nav.xp":"ervaring","nav.skills":"skills","nav.contact":"contact",
 "hero.tag":"Full-stack van PCB tot cloud.","hero.scroll":"scroll",
 "cap1":"Een signaal begint op silicium.",
 "cap2":"Het volgt de sporen. Via&rsquo;s, een bus, een protocol dat iemand moest ontwerpen. Meestal ben ik die iemand.",
 "cap3":"Firmware geeft het door aan een OS. Het OS geeft het door aan het netwerk.",
 "cap4":"Het eindigt in de cloud. Een database, een API, een scherm.",
 "cap5":"Ik werk over het hele pad.",
 "cap5s":"Je scrolde net door de pitch. De rest is detail. &darr;",
 "ey.about":"over","ey.work":"geselecteerd werk","ey.nda":"klantenwerk &mdash; namen weggelaten",
 "ey.xp":"ervaring","ey.edu":"opleiding","ey.vol":"vrijwilligerswerk","ey.skills":"skills","ey.contact":"contact",
 "about.body":"Vlaamse maker en founder, gevestigd in Zulte. Ik bouw wat ik zelf wou dat bestond &mdash; en ik stop niet bij &eacute;&eacute;n laag. Firmware, apps, web, en de behuizing waarin het verscheept. Howest MCT, juni 2026, dubbele minor in <em>AI Engineering</em> en <em>XR Development</em>. Uitwisselingssemester in Portsmouth. Stage bij Granstudio, Turijn. Elke build staat publiek op <em>The Bryce Byte</em> &mdash; van soldeerrook tot broncode.",
 "f.loc":"WOONPLAATS","f.edu":"OPLEIDING","f.min":"MINORS","f.co":"BEDRIJF",
 "sp.desc":"Een Linux-gedreven touchscreen macro deck. Arduino UNO Q &mdash; Qualcomm Dragonwing QRB2210 met een STM32U585-brug &mdash; op Yocto Linux, UI in LVGL, communicatie met de host via SHIDP, een zelf ontworpen serieel HID-protocol, door een XIAO RP2040-dongle op TinyUSB. Grid van 60 knoppen, virtueel toetsenbord, precisie-touchpad, webconfiguratie.",
 "sp.press":"Featured door <a href=\"https://blog.arduino.cc/2026/02/01/this-stream-deck-alternative-runs-on-an-arduino-uno-q/\" target=\"_blank\" rel=\"noopener\"><b>Arduino</b></a>, <a href=\"https://www.hackster.io/news/starkpad-is-a-gorgeous-stream-deck-alternative-you-can-build-yourself-76cfc961c5f0\" target=\"_blank\" rel=\"noopener\"><b>Hackster.io</b></a> en <a href=\"https://www.linkedin.com/posts/lvglgui_lvgl-ui-embedded-activity-7427329212585328641-je0Q\" target=\"_blank\" rel=\"noopener\"><b>LVGL</b></a>.<br>Verdedigd als bachelorproef &mdash; 8 juni 2026.",
 "p.orbital":"Een open-source XR-hardwarecontroller. Firmware staat online.",
 "p.shaker":"Een IoT-cocktailshaker. Ja, echt.",
 "p.nmbs":"Runner-up. Gebouwd voor de NMBS in &eacute;&eacute;n sprint.",
 "nda.note":"Gebouwd tijdens een stage bij Granstudio, Turijn &mdash; een studio voor automotive &amp; mobility design, opgericht door Lowie Vermeersch. Klanten en projectnamen blijven off the record. De stacks niet.",
 "nda1.t":"Vertaal- &amp; transcriptieplatform",
 "nda1.d":"Gecontaineriseerde AI-pijplijn: Whisper-transcriptie, lokale LLM-vertaling, self-hosted auth. Dertien containers. Later: SRT/WebVTT-export, tweetalige gestapelde ondertitels, een burn-in-renderpijplijn voor ondertitels.",
 "nda2.t":"Analytics- &amp; rapporteringsplatform",
 "nda2.d":"AI-ondersteunde rapportering voor niet-technische stakeholders: chatinterface, grafiekenbouwer, geautomatiseerde exports. Een MCP-server gekoppeld aan een lokale LLM.",
 "nda3.t":"Systeem voor eventinstallatie",
 "nda3.d":"Raspberry Pi-server, kiosk-display onder systemd, offline databuffering, real-time Unreal Engine front-end.",
 "x1.t":"Founder &amp; CEO <span class=\"org\">&mdash; <a href=\"https://itsbryce.com\" target=\"_blank\" rel=\"noopener\">itsBryce</a></span>",
 "x1.d":"Full-stack van PCB tot cloud, &eacute;&eacute;n aanspreekpunt: hardware, software, AI, XR, design, systeemintegratie.",
 "x2.t":"Stagiair <span class=\"org\">&mdash; <a href=\"https://www.granstudio.com/\" target=\"_blank\" rel=\"noopener\">Granstudio, Turijn</a></span>",
 "x2.d":"Full-stack tooling en AI-integratie voor een automotive-designstudio.",
 "x3.t":"Barman &amp; IT-support <span class=\"org\">&mdash; <a href=\"https://www.detreffer.be/\" target=\"_blank\" rel=\"noopener\">De Treffer Bar</a></span>",
 "x3.d":"Tapt en patcht.",
 "x4.t":"Technical Partner <span class=\"org\">&mdash; <a href=\"https://jbsigns.be\" target=\"_blank\" rel=\"noopener\">JB-Signs</a></span>",
 "x4.d":"Slimme technologie in signalisatie- en productieworkflows.",
 "e1.d":"Dubbele minor: AI Engineering &amp; XR Development. Bachelorproef: Starkpad.",
 "e2.t":"<a href=\"https://www.port.ac.uk/\" target=\"_blank\" rel=\"noopener\">University of Portsmouth</a> <span class=\"org\">&mdash; uitwisselingssemester</span>",
 "e2.d":"Faculty of Creative and Cultural Industries.",
 "v1.t":"Socialmediabeheerder &amp; contentcreator <span class=\"org\">&mdash; @weekmenuhhc</span>",
 "v1.d":"Beheerde zeven jaar lang het menukanaal van de school. 1.182 volgers.",
 "sk.lang":"PROGRAMMEERTALEN","sk.spoken":"GESPROKEN",
 "p.manim":"Een Figma-achtige visuele animatie-editor op Manim. Sleep vormen, schrijf LaTeX, render MP4.",
 "p.manim.m":"Twee modi: een drag-and-drop canvas &mdash; 16 vormtypes, LaTeX-wiskunde, een multi-track tijdlijn, morphing met 17 easingfuncties &mdash; of pure Manim-Python met volledige librarytoegang. Vue 2.7 + Konva.js front-end, Node/Express API, Redis-renderqueue, Manim-worker &mdash; alles in Docker, rendert MP4 van 480p tot 4K. MIT-licentie.",
 "p.orbital.m":"Eigen C++-firmware op een Seeed XIAO RP2040. Open hardware, open firmware &mdash; gebouwd om XR-input hackbaar te maken.",
 "p.shaker.m":"Raspberry Pi 4 + Python: sensorgestuurd mixen, connected bediening. Een oefening in compute plaatsen waar het niet hoort &mdash; bewust.",
 "p.nmbs.m":"Een snel gebouwde interne app op het Power Platform. Bewijs dat iets bruikbaars shippen op &eacute;&eacute;n dag beter is dan iets denkbeeldigs polijsten.",
 "p.op":"Marketingsite voor een horeca-automatiseringsbedrijf. E&eacute;n HTML-bestand.",
 "p.op.m":"E&eacute;n zelfstandig HTML-bestand: een WebGL-shaderachtergrond, een filterbare catalogus &mdash; 48 producten, 14 categorie&euml;n &mdash; en een offertewizard. Donkere premium look volgens de JB-Signs-briefing. Geleverd via itsBryce.",
 "x1.m":"Diensten: hardware engineering, softwareontwikkeling, AI &amp; computer vision, XR &amp; interactie, design &amp; UX, systeemintegratie, data &amp; analytics, R&amp;D. Uitgelicht: de volledige <a href=\"https://jbsigns.be\" target=\"_blank\" rel=\"noopener\">JB-Signs</a>-rebrand en -website, de OrderPoint-marketingsite.",
 "x2.m":"Drie interne systemen, hierboven beschreven onder klantenwerk: een AI-vertaalpijplijn met 13 containers, een MCP-gedreven analytics- &amp; rapporteringsplatform, en een eventinstallatie met Raspberry Pi + Unreal Engine.",
 "e1.m":"Starkpad: verdedigd op 8 juni 2026, geselecteerd voor de schoolexpo, featured door Arduino en LVGL. Minortrajecten: AI Engineering (ML, computer vision) en XR Development (Unity, Android XR, WebXR).",
 "l.nl":"Nederlands","l.en":"Engels","l.fr":"Frans","l.de":"Duits","l.it":"Italiaans",
 "l.native":"MOEDERTAAL","l.native2":"NATIVE","l.good":"GOED","l.basic":"BASIS","l.basic2":"BASIS",
 "c.say":"Geen formulier. E-mail werkt.",
 "footer":"&copy; 2026 Jan Blomme &middot; Zulte, Belgi&euml; &middot; geen framework, met de hand gebouwd."
};
function setLang(l){
  $$('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n');
    if(el.dataset.en===undefined)el.dataset.en=el.innerHTML;
    el.innerHTML=(l==='nl'&&NL[k]!==undefined)?NL[k]:el.dataset.en;
  });
  document.documentElement.lang=l;
  $('#lang-en').classList.toggle('on',l==='en');
  $('#lang-nl').classList.toggle('on',l==='nl');
  $('#lang-en').setAttribute('aria-pressed',l==='en');
  $('#lang-nl').setAttribute('aria-pressed',l==='nl');
}
$('#lang-en').addEventListener('click',function(){setLang('en')});
$('#lang-nl').addEventListener('click',function(){setLang('nl')});

/* expandable cards & rows */
$$('.exp').forEach(function(el){
  function toggle(){
    var open=el.classList.toggle('open');
    el.setAttribute('aria-expanded',open?'true':'false');
  }
  el.addEventListener('click',function(e){
    if(e.target.closest('a'))return;
    toggle();
  });
  el.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}
  });
});

/* ============ scroll-scrubbed canvas: PCB -> cloud ============ */
var cv=$('#pipe'),ctx=cv.getContext('2d');
var W=0,H=0,dpr=1;
var COL={
  bg:'#0a0b0a', line:'#1e2420', faint:'#535b55', dim:'#8b948d',
  acc:'#5fd38a', accDim:'rgba(95,211,138,.32)', accGlow:'rgba(95,211,138,.16)'
};
var MONO="'IBM Plex Mono',monospace";

/* --- world geometry (y up = negative) --- */
var PTS=[
  [0,40],[0,-90],[90,-180],[90,-320],[0,-410],   // chip pin -> traces (45deg bends)
  [0,-1000],                                      // long run through bus + firmware
  [-150,-1150],[70,-1330],[0,-1560]               // network hops -> cloud endpoint
];
var SEG=[],LEN=0;
(function(){
  for(var i=0;i<PTS.length-1;i++){
    var dx=PTS[i+1][0]-PTS[i][0],dy=PTS[i+1][1]-PTS[i][1];
    var l=Math.sqrt(dx*dx+dy*dy);
    SEG.push({a:PTS[i],b:PTS[i+1],l:l,s0:LEN});
    LEN+=l;
  }
})();
function ptAt(s){
  s=Math.max(0,Math.min(LEN,s));
  for(var i=0;i<SEG.length;i++){
    var g=SEG[i];
    if(s<=g.s0+g.l||i===SEG.length-1){
      var f=(s-g.s0)/g.l;
      return [g.a[0]+(g.b[0]-g.a[0])*f, g.a[1]+(g.b[1]-g.a[1])*f];
    }
  }
}
function sNear(x,y){ // approx s of a world point (nearest vertex projection)
  var best=0,bd=1e9;
  for(var s=0;s<=LEN;s+=12){
    var p=ptAt(s),d=(p[0]-x)*(p[0]-x)+(p[1]-y)*(p[1]-y);
    if(d<bd){bd=d;best=s;}
  }
  return best;
}

/* decorative side traces */
var DECO=[
  [[-60,40],[-60,-70],[-150,-160],[-150,-330]],
  [[60,40],[60,-60],[150,-150],[150,-300]]
];
var VIAS=[[90,-320],[0,-410]];
/* network graph (extra, off-path) */
var NNODES=[[0,-1000],[-150,-1150],[70,-1330],[-230,-1280],[180,-1120],[220,-1300]];
var NLINKS=[[0,4],[1,3],[4,5],[2,5],[3,2],[0,1],[1,2]];

/* anchors */
var A={
  bus:sNear(0,-487), fw:sNear(0,-700), net:sNear(0,-1000), cloud:LEN
};

function resize(){
  dpr=Math.min(window.devicePixelRatio||1,2);
  W=window.innerWidth;H=window.innerHeight;
  cv.width=W*dpr;cv.height=H*dpr;
  cv.style.width=W+'px';cv.style.height=H+'px';
  drawn=-1;
}
window.addEventListener('resize',resize);
resize();

function ease(u){return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function smooth(v){v=clamp(v,0,1);return v*v*(3-2*v)}
function reveal(s,anchor,span){return smooth((s-anchor+span)/span)} // 0 before, 1 at/after anchor

function strokeRange(a,b){
  a=clamp(a,0,LEN);b=clamp(b,0,LEN);
  if(b-a<0.5)return;
  ctx.beginPath();
  var p=ptAt(a);ctx.moveTo(p[0],p[1]);
  for(var i=0;i<SEG.length;i++){
    var g=SEG[i],end=g.s0+g.l;
    if(end<=a)continue;
    if(g.s0>=b)break;
    var q=(end<=b)?g.b:ptAt(b);
    ctx.lineTo(q[0],q[1]);
  }
  ctx.stroke();
}
function poly(pts){
  ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
  for(var i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
  ctx.stroke();
}
function label(txt,x,y,size,color,align){
  ctx.font=size+'px '+MONO;
  ctx.fillStyle=color;
  ctx.textAlign=align||'center';
  ctx.textBaseline='middle';
  ctx.fillText(txt,x,y);
}
function box(x,y,w,h,alpha,dash){
  if(alpha<=0)return;
  ctx.globalAlpha=alpha;
  ctx.strokeStyle=COL.line;ctx.lineWidth=1.2;
  if(dash)ctx.setLineDash([6,7]);
  ctx.strokeRect(x,y,w,h);
  ctx.setLineDash([]);
  ctx.globalAlpha=1;
}

var stages=$$('.hud .st'),pctEl=$('#pct'),hint=$('#hint');
var caps=[
  {el:$('#c0'),a:-0.02,b:0.09},
  {el:$('#c1'),a:0.12,b:0.25},
  {el:$('#c2'),a:0.28,b:0.44},
  {el:$('#c3'),a:0.47,b:0.60},
  {el:$('#c4'),a:0.63,b:0.77},
  {el:$('#c5'),a:0.87,b:1.10}
];

function draw(t){
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.fillStyle=COL.bg;ctx.fillRect(0,0,W,H);

  var tp=clamp(t/0.86,0,1);          // path phase
  var s=ease(tp)*LEN;                // pulse position
  var zo=smooth((t-0.86)/0.14);      // final zoom-out phase

  /* camera */
  var k=Math.min(W,H)/820;
  var followScale=(1.6-0.72*tp)*k;
  var fitScale=Math.min(W/620,H/1900)*0.92;
  var scale=followScale+(fitScale-followScale)*zo;
  var lead=ptAt(Math.min(LEN,s+90));
  var cx=lead[0],cy=lead[1];
  var fx=0,fy=-760; // fit-all center
  cx=cx+(fx-cx)*zo; cy=cy+(fy-cy)*zo;
  ctx.translate(W/2,H/2);
  ctx.scale(scale,scale);
  ctx.translate(-cx,-cy);

  /* dot grid */
  ctx.fillStyle='rgba(139,148,141,.06)';
  var step=60,vw=W/scale/2+step,vh=H/scale/2+step;
  var gx0=Math.floor((cx-vw)/step)*step,gy0=Math.floor((cy-vh)/step)*step;
  for(var gx=gx0;gx<cx+vw;gx+=step)
    for(var gy=gy0;gy<cy+vh;gy+=step)
      ctx.fillRect(gx-0.75,gy-0.75,1.5,1.5);

  /* chip */
  ctx.globalAlpha=1;
  ctx.strokeStyle=COL.line;ctx.lineWidth=1.4;
  ctx.strokeRect(-120,60,240,130);
  ctx.fillStyle=COL.faint;
  for(var px=-90;px<=90;px+=30)ctx.fillRect(px-4,52,8,8); // pins
  label('QRB2210 · STM32U585',0,128,13,COL.faint);
  label('L0 — SILICON',0,164,10,'rgba(83,91,85,.75)');

  /* decorative traces */
  var da=reveal(s,180,260);
  if(da>0){
    ctx.globalAlpha=da*0.85;
    ctx.strokeStyle=COL.line;ctx.lineWidth=2;
    DECO.forEach(poly);
    ctx.globalAlpha=1;
  }

  /* main path — passed / live / lookahead */
  ctx.lineJoin='round';ctx.lineCap='round';
  ctx.strokeStyle=COL.line;ctx.lineWidth=2;
  strokeRange(s,Math.min(LEN,s+150));            // faint lookahead
  ctx.strokeStyle=COL.accDim;ctx.lineWidth=2;
  strokeRange(0,s);                              // passed, dim accent
  ctx.strokeStyle=COL.accGlow;ctx.lineWidth=7;
  strokeRange(Math.max(0,s-110),s);              // glow trail
  ctx.strokeStyle=COL.acc;ctx.lineWidth=2.4;
  strokeRange(Math.max(0,s-110),s);              // hot trail

  /* vias */
  VIAS.forEach(function(v){
    var va=reveal(s,sNear(v[0],v[1]),160);
    if(va<=0)return;
    ctx.globalAlpha=va;
    ctx.strokeStyle=COL.faint;ctx.lineWidth=1.3;
    ctx.beginPath();ctx.arc(v[0],v[1],7,0,6.2832);ctx.stroke();
    if(s>sNear(v[0],v[1])){ctx.fillStyle=COL.acc;ctx.beginPath();ctx.arc(v[0],v[1],2.2,0,6.2832);ctx.fill();}
    ctx.globalAlpha=1;
  });

  /* bus bar */
  var ba=reveal(s,A.bus,200);
  box(-150,-505,300,38,ba);
  if(ba>0){ctx.globalAlpha=ba;label('SHIDP → USB-HID',0,-486,12,COL.dim);ctx.globalAlpha=1;}

  /* firmware block */
  var fa=reveal(s,A.fw,220);
  box(-170,-780,340,160,fa);
  if(fa>0){
    ctx.globalAlpha=fa;
    label('YOCTO LINUX',0,-712,14,COL.dim);
    label('LVGL · FIRMWARE',0,-688,10,COL.faint);
    ctx.globalAlpha=1;
  }

  /* network */
  var na=reveal(s,A.net,240);
  if(na>0){
    ctx.globalAlpha=na*0.9;
    ctx.strokeStyle=COL.line;ctx.lineWidth=1.3;
    NLINKS.forEach(function(lk){
      var a=NNODES[lk[0]],b=NNODES[lk[1]];
      ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
    });
    NNODES.forEach(function(n){
      var onPath=(n[0]===0&&n[1]===-1000)||(n[0]===-150)||(n[0]===70&&n[1]===-1330);
      ctx.beginPath();ctx.arc(n[0],n[1],6,0,6.2832);
      ctx.fillStyle=COL.bg;ctx.fill();
      ctx.strokeStyle=(onPath&&s>sNear(n[0],n[1]))?COL.acc:COL.faint;
      ctx.lineWidth=1.4;ctx.stroke();
    });
    label('L3 — NETWORK',250,-1210,10,'rgba(83,91,85,'+(na*0.75)+')','left');
    ctx.globalAlpha=1;
  }

  /* cloud */
  var ca=reveal(s,LEN,260);
  box(-130,-1640,260,140,ca,true);
  if(ca>0){
    ctx.globalAlpha=ca;
    label('CLOUD',0,-1664,11,COL.faint);
    label('DB · API · UI',0,-1596,11,COL.dim);
    ctx.globalAlpha=1;
  }

  /* pulse head */
  if(tp<1||zo<1){
    var hp=ptAt(s);
    ctx.fillStyle=COL.accGlow;
    ctx.beginPath();ctx.arc(hp[0],hp[1],11,0,6.2832);ctx.fill();
    ctx.fillStyle=COL.acc;
    ctx.beginPath();ctx.arc(hp[0],hp[1],3.6,0,6.2832);ctx.fill();
  }

  /* ACK at arrival */
  var ka=smooth((s-LEN*0.985)/(LEN*0.015));
  if(ka>0){
    ctx.globalAlpha=ka;
    ctx.fillStyle=COL.acc;
    ctx.beginPath();ctx.arc(0,-1560,4.5,0,6.2832);ctx.fill();
    label('ACK · 200 OK',22,-1560,12,COL.acc,'left');
    ctx.globalAlpha=1;
  }

  /* full-path light-up on zoom-out */
  if(zo>0){
    ctx.strokeStyle='rgba(95,211,138,'+(0.75*zo)+')';
    ctx.lineWidth=2.2;
    strokeRange(0,LEN);
  }

  /* ---- DOM overlays ---- */
  var st=s/LEN;
  var idx=st<0.16?0:st<0.40?1:st<0.62?2:st<0.87?3:4;
  stages.forEach(function(el,i){el.classList.toggle('on',i===idx)});
  pctEl.textContent=String(Math.round(clamp(t,0,1)*100)).padStart(3,'0')+'%';
  if(t<0.03){hint.style.animation='';hint.style.opacity='';}else{hint.style.animation='none';hint.style.transition='opacity .3s';hint.style.opacity='0';}

  caps.forEach(function(c){
    var f=0.03; // fade width
    var o=smooth((t-c.a)/f)*(1-smooth((t-c.b)/f));
    c.el.style.opacity=o;
    if(!reduced)c.el.style.transform='translateY(calc(-50% + '+((1-o)*14)+'px))';
  });
}

/* scroll -> t */
var hero=$('.hero'),target=0,cur=-1,drawn=-1;
function computeT(){
  var r=hero.getBoundingClientRect();
  var total=r.height-window.innerHeight;
  target=clamp(-r.top/total,0,1);
}
window.addEventListener('scroll',computeT,{passive:true});
computeT();

function frame(){
  if(reduced)cur=target;
  else{
    if(cur<0)cur=target;
    cur+=(target-cur)*0.14;
    if(Math.abs(target-cur)<0.0004)cur=target;
  }
  if(cur!==drawn){draw(cur);drawn=cur;}
  requestAnimationFrame(frame);
}
document.fonts&&document.fonts.ready.then(function(){drawn=-1});
requestAnimationFrame(frame);
})();