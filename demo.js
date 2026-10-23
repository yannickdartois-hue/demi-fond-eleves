/* =====================================================================
   demo.js — mode démo : visiter l'appli sans QR de classe ni code (pour les collègues).
   Un groupe fictif pré-rempli, gardé en mémoire seulement : rien n'est enregistré ni envoyé.
   Ouverture : boutons « Démo » à l'accueil, ou adresse …/?demo (Seconde) et …/?demo=T (Terminale).
   ===================================================================== */
'use strict';
function demoRnd(seed){let s=seed;return ()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}}
function demoSplit(d){const t=Math.floor(d/200);return [String(t),String(Math.round((d-t*200)/10)*10)]}
function demoSeance(sid,v,rnd,sx){const d={},J=(a)=>a[Math.floor(rnd()*a.length)],E=(n)=>Math.round((rnd()*2-1)*n);
  const pile=n=>Array.from({length:n},()=>rnd()<.62?'P':(rnd()<.5?'T':'L'));
  const c3=(pct)=>{const vise=Math.round(dist(180,v)/10)*10,real=Math.round(dist(180,v*pct)/10)*10,half=Math.round((real/2+E(15))/10)*10;const [mt,mp]=demoSplit(half),[ft,fp]=demoSplit(real);
    const laps=[];let t=0;for(let k=0;k<Math.floor(real/200);k++){const l=Math.round(200*3.6/(v*pct)+E(3));laps.push(l);t+=l}return {v:String(vise),mt,mp,ft,fp,lt:laps}};
  const p130=(ref)=>{const proj=Math.round((ref||dist(90,v*1.04))/5)*5;const e=E(14);return {proj:String(proj),sd:e<0?'av':'ap',mg:String(Math.abs(e)),ec:e}};
  const ser=rows=>rows.map(r=>({tr:fT(tSec(r[0],v*r[1]/100)+E(3))}));
  const s=SBY[sid];
  s.blocks.forEach(b=>{const [ty,a1,a2,a3]=bk(b);
    if(ty==='al4')d.al=[5,8,10,Math.round(v*2)/2].map((x,i)=>({an:String(x),re:String(i===3?x:x+J([0,0,1,-1]))}));
    if(ty==='ct')d.ct=[{c:'12',r:'12'},{c:'13',r:String(12+J([0,1]))}];
    if(ty==='grp')d.grp=v<10?'G1':v<12?'G2':v<14?'G3':'G4';
    if(ty==='i36'||ty==='i36m')d.i36=pile(ty==='i36'?a2:6);
    if(ty==='ra')d.ra=String(Math.round(v*0.7*2)/2);
    if(ty==='m130'){const [t,p]=demoSplit(Math.round(dist(90,v*1.05)/10)*10);d.m130={t,p}}
    if(ty==='c3')d[a1]=c3(0.97+rnd()*0.06);
    if(ty==='p130')d[a1]=p130(null);
    if(ty==='ser')d[a1]=ser(a3);
    if(ty==='ra2')d.ra2=String(Math.round(dist(a2,v*a1/100)/10)*10);
    if(ty==='i112')d.c112=Array.from({length:a2},()=>String(Math.round((v*a1/100+E(1))*2)/2));
    if(ty==='rel5'){const vis=1380+Math.round(rnd()*240);d.rlv=fT(vis);d.rlt=fT(vis+E(40))}
    if(ty==='c500'){const tp=Math.round(tSec(500,v*(s.eval?1.08:1.02)));const t=tp+E(4);d[a1]={tp:fT(tp),ps:fT(Math.round(t/2-1+E(2))),t:fT(t)}}
    if(ty==='tours')d.tr=[8,10,12,14,15,16].map((x,i)=>Object.assign({t:fT(tSec(200,x)+E(3))},i>3?{v:String(x)}:{}));
    if(ty==='t3624')d.ts=Array.from({length:10},(_,i)=>String(Math.round((v+E(1)-(i>7?0.5:0))*2)/2));
    if(ty==='rt')d.rt=Array.from({length:10},()=>String(Math.round((v+0.5+E(1))*2)/2));
    if(ty==='warm'||ty==='warmT')d.wc=['f','tf','mg','ch','ge','ga','sq','sk','ac','al'];
    if(ty==='pf'||ty==='pfT')d.pf=[ty==='pf'?J(['dep','zone','chute']):J(['d1','d2','z'])];
    if(ty==='situe')d.situe={a2:String(J([2,3,3,4])),a3:String(J([2,3,3]))};
    if(ty==='rep')d.rep=J(['4/4','6/2','4/4']);
  });
  d.bl={cr:['1',rnd()<.6?'1':'','1'],reu:J(['Départ bien géré','Régulier sur les tours','Plot pile au sifflet','Bonne relance à la fin']),
    con:J(['Pars moins vite sur le 1er tour','Regarde ton plot cible','Garde tes bras actifs à la fin','Relance dans la dernière ligne droite']),
    nx:J(['Je pars à l’allure de la fin','Je vise 10 m de plus','Je respire plus calmement']),rpe:String(J([5,6,6,7,7,8])),du:'60',aide:rnd()<.8?'1':'0',role:'coach'};
  const tg=pronoTarget(s);if(tg){const r=pronoReal(tg,d);if(r)d.bl.pr=tg[0]==='c500'?fT(r+E(4)):String(Math.round((r+E(20))/5)*5)}
  return d}
function ouvrirDemo(cy){
  cy=cy==='T'?'T':'S';const rnd=demoRnd(cy==='T'?20261023:20261022);const L=sessOf(cy);
  const N=cy==='T'?[['Manon GARCIA','F',12],['Lucas ROUX','G',15]]:[['Léa MARTIN','F',11.5],['Hugo BERNARD','G',13.5]];
  const autres=['Inès PETIT','Tom DURAND','Zoé LEROY','Yanis ROBERT','Chloé MOREAU','Nathan BLANC','Sarah FAURE','Max GIRARD','Nina ROUX'];
  const classe=cy==='T'?'Tle Démo':'2nde Démo',nb=cy==='T'?6:5;
  const g=vide(classe,cy);g.cfg={classe,cy,eleves:N.map(x=>x[0]).concat(autres).sort(),lien:'',k:''};
  g.runners=N.map(([full,sx])=>({id:uid(),full,prenom:prenomDe(full),nom:nomDe(full),sexe:sx,vmaManuelle:'',seances:{}}));
  const jour0=Date.now()-(nb+1)*7*864e5;
  L.slice(0,nb).forEach((s,i)=>{g.runners.forEach((r,k)=>{r.seances[s.id]=demoSeance(s.id,N[k][2],rnd,r.sexe)});const t=jour0+i*7*864e5;g.dates[s.id]=jour(t);g.mod[s.id]=t;if(i<nb-1)g.sent[s.id]=t+3600e3});
  /* situations à montrer : absence et coach remplaçant, pratique adaptée, VMA du jour modifiée */
  if(cy==='S'){g.runners[1].seances.s3={st:'abs'};g.runners[0].seances.s3.cx={n:'Tom D.',why:'abs'};g.runners[0].seances.s4.ad='1';g.runners[1].seances.s4.vj='14'}
  else{g.runners[0].seances.t4.ad='1'}
  DEMO=true;G=null;ACTIF=null;CLEF=null;attacher(g);V.sid=L[nb-1].id;V.tab='envoi';
  closeModal();render();window.scrollTo(0,0);toast('Mode démo : explore librement, rien n’est enregistré.');
}
function bandeauDemo(){return `<div class="demo-bandeau"><span>👀 <b>Mode démo</b><i> · groupe fictif, rien n’est enregistré ni envoyé</i></span><button class="btn sm" data-act="demo" data-v="${G&&G.cy==='T'?'S':'T'}">Voir ${G&&G.cy==='T'?'la Seconde':'la Terminale'}</button><a class="btn sm" href="../demi-fond-prof/?demo">Voir l’outil prof</a><button class="btn sm" data-act="demoQuitter">Quitter la démo</button></div>`}
function quitterDemoUrl(){try{if(/[?&]demo\b/.test(location.search))history.replaceState(null,'',location.pathname)}catch(e){}}
{const m=/[?&]demo(?:=(\w))?/.exec(location.search);if(m)ouvrirDemo((m[1]||'S').toUpperCase());else render()}
