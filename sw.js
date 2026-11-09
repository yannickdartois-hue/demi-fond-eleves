/* Hors ligne : l'appli est gardée sur la tablette après la 1re ouverture.
   Après une modification, augmenter VERSION (dfe-v1 → dfe-v8…). */
const VERSION='demi-fond-eleves-v42';
// Toutes les applis partagent le même stockage (même adresse github.io) : on n'efface QUE les anciennes versions de CETTE appli.
const MES_CACHES=/^(?:demi\-fond\-eleves\-v|dfe\-v)\d+$/;

const FICHIERS=['img/echauffement/etir-hanche.jpg','img/echauffement/etir-ischios.jpg','img/echauffement/etir-mollets.jpg','img/echauffement/etir-quadriceps.jpg','img/echauffement/gamme-acceleration.jpg','img/echauffement/gamme-balances.jpg','img/echauffement/gamme-ralenti.jpg','img/echauffement/gamme-coordination.jpg','img/echauffement/gamme-rythme-foulee.jpg','img/echauffement/gamme-batonnet.jpg','img/echauffement/gamme-bondissantes.jpg','img/echauffement/gamme-cloche-pied.jpg','img/echauffement/gamme-course-arriere.jpg','img/echauffement/gamme-fentes-marchees.jpg','img/echauffement/gamme-genou-extension.jpg','img/echauffement/gamme-genoux-lateral.jpg','img/echauffement/gamme-griffe.jpg','img/echauffement/gamme-jambes-tendues.jpg','img/echauffement/gamme-montees-genoux.jpg','img/echauffement/gamme-pas-chasses.jpg','img/echauffement/gamme-pas-croises.jpg','img/echauffement/gamme-pas-sautilles.jpg','img/echauffement/gamme-plante-pieds.jpg','img/echauffement/gamme-rebonds.jpg','img/echauffement/gamme-skipping-bas.jpg','img/echauffement/gamme-skipping-marche.jpg','img/echauffement/gamme-talons-fesses.jpg','img/echauffement/gamme-tension-pied.jpg','./','eps-rappel.js','eps-code.js','eps-maj.js','eps-avatars.js','img/avatars/stop.webp','img/avatars/bravo.webp','img/avatars/envoyer.webp','img/avatars/blesse.webp','index.html','eps-charte-v1.css','polices/archivo.woff2','polices/atkinson-400.woff2','polices/atkinson-700.woff2','style.css','donnees.js','logique.js','qrcode.js','jsqr.js','scan.js','vues.js','chrono.js','app.js','demo.js','manifest.webmanifest','aide.js','eps-aide.js','eps-pouls.js','pouls-df.js',
  'icon-32.png','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FICHIERS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>MES_CACHES.test(k)&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Tablette d'abord : l'appli s'ouvre tout de suite depuis la tablette, même sans réseau sur la piste ;
// la version en ligne est récupérée en arrière-plan (nouvelle version : bandeau « Recharger » au prochain changement de sw.js).
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(VERSION).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    return (await net)||Response.error()}));
});
