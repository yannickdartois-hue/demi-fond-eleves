/* pouls-df.js · Branche la prise de pouls assistée (eps-pouls.js) sur les cases de FC du demi-fond.
   Ne modifie ni les séances ni vues.js : ajoute un bouton « Prendre mon pouls » à côté de chaque case de FC
   (défi des 4 allures : al.N.fc ; bilan : bl.fc). La FC validée remplit la case, comme une saisie à la main.
   FC de récupération à 1 min : enregistrée à côté (al.N.fcr, bl.fcr), dans les données de la séance. */
(function(){
  'use strict';
  if(!window.EPSPouls)return;
  const CHAMP=/^(?:al\.\d+\.fc|bl\.fc)$/;
  const main=document.getElementById('main');if(!main)return;
  const donnees=()=>{try{if(!G||V.tab!=='seance'||!V.sid)return null;return sd(G.runners[V.ri||0],V.sid)}catch(e){return null}};

  function poser(){
    main.querySelectorAll('input[data-p]').forEach(inp=>{
      const p=inp.dataset.p;if(!CHAMP.test(p))return;
      const stp=inp.closest('.stp')||inp;if(stp.dataset.pouls)return;stp.dataset.pouls='1';
      const bt=document.createElement('button');bt.type='button';bt.className='eps-pouls-bt';bt.dataset.poulsP=p;
      bt.innerHTML='<span aria-hidden="true">❤</span> Prendre mon pouls';
      let apres=stp.nextElementSibling&&stp.nextElementSibling.classList.contains('vw')?stp.nextElementSibling:stp;
      apres.insertAdjacentElement('afterend',bt);
      const d=donnees(),fc=d&&num(getPath(d,p)),rec=d&&num(getPath(d,p+'r'));
      if(fc!=null&&rec!=null){const i=document.createElement('span');i.className='eps-pouls-info';
        i.textContent=`Récupération 1 min : ${fc} → ${rec} · −${Math.max(0,fc-rec)} (${EPSPouls.appreciation(fc-rec)})`;bt.insertAdjacentElement('afterend',i)}
    })}

  main.addEventListener('click',e=>{const bt=e.target.closest('.eps-pouls-bt');if(!bt)return;e.preventDefault();e.stopPropagation();
    const p=bt.dataset.poulsP;const bilan=p==='bl.fc';
    EPSPouls.ouvrir({
      titre:bilan?'FC en fin de série':'FC après cette allure',
      note:'Mesure tout de suite après l’effort : le pouls baisse vite.',
      recup:true,
      onFC:v=>{const inp=main.querySelector(`input[data-p="${p}"]`);if(!inp)return;inp.value=String(v);
        inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}))},
      onRecup:v=>{const d=donnees();if(!d)return;setPath(d,p+'r',String(v));saveS();keepScroll(render)}
    })},true);

  new MutationObserver(poser).observe(main,{childList:true,subtree:true});
  poser();
})();
