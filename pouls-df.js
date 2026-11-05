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

  /* Raccourci « Sur la piste » : la FC de fin de série (bl.fc) se prend juste après la série, pas au bilan
     (après les étirements, le pouls est redescendu). Même champ que dans le bilan : rien n'est dupliqué. */
  function raccourciPiste(){
    try{if(!G||V.tab!=='seance'||V.ph==='fin'||!V.sid)return}catch(e){return}
    const s=SBY[V.sid],d=donnees();if(!s||!d||d.st||!voit('fc',s))return;
    const fin=main.querySelector('button.btn.big.full[data-ph="fin"]');if(!fin||main.querySelector('.pouls-piste'))return;
    const fc=num(getPath(d,'bl.fc')),rec=num(getPath(d,'bl.fcr'));
    const c=document.createElement('section');c.className='card thin pouls-piste';
    c.innerHTML=`<p><b>❤ Ma FC en fin de série</b> <span class="muted small">(facultatif) · juste après la dernière série, avant de récupérer</span></p>
      ${fc!=null?`<p class="small">FC notée : <b>${fc} /min</b>${rec!=null?` · récupération 1 min : ${fc} → ${rec} (−${Math.max(0,fc-rec)}, ${EPSPouls.appreciation(fc-rec)})`:''}</p>`:''}
      <button type="button" class="eps-pouls-bt" data-pouls-p="bl.fc"><span aria-hidden="true">❤</span> ${fc!=null?'Reprendre mon pouls':'Prendre mon pouls'}</button>`;
    fin.insertAdjacentElement('beforebegin',c)}

  main.addEventListener('click',e=>{const bt=e.target.closest('.eps-pouls-bt');if(!bt)return;e.preventDefault();e.stopPropagation();
    const p=bt.dataset.poulsP;const bilan=p==='bl.fc';
    EPSPouls.ouvrir({
      titre:bilan?'FC en fin de série':'FC après cette allure',
      note:'Mesure tout de suite après l’effort : le pouls baisse vite.',
      recup:true,
      onFC:v=>{const d=donnees();if(!d)return;
        const o=getPath(d,p.replace(/\.fc$/,''));if(o&&typeof o==='object')delete o.fcr;   /* nouvelle mesure : l'ancienne récupération ne vaut plus */
        const inp=main.querySelector(`input[data-p="${p}"]`);
        if(inp){inp.value=String(v);inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}));return}
        setPath(d,p,String(v));saveS();keepScroll(render)},
      onRecup:v=>{const d=donnees();if(!d)return;setPath(d,p+'r',String(v));saveS();keepScroll(render)}
    })},true);

  const tout=()=>{poser();raccourciPiste()};
  new MutationObserver(tout).observe(main,{childList:true,subtree:true});
  tout();
})();
