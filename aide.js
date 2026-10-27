/* aide.js — mode d'emploi de l'appli élève demi-fond (lu par eps-aide.js) */
window.EPS_AIDE={appli:'Demi-fond · Élève',bouton:false,publics:[
{id:'eleve',titre:'Élève',chapitres:[
{t:'Commencer (premier cours)',html:`<ol>
<li>Touche <span class="bouton">Scanner le QR de la classe</span> et vise le QR que le professeur affiche.</li>
<li>Choisis un <b>code secret à 4 chiffres</b> pour ton binôme et retiens-le : il sera demandé à chaque cours. Personne d’autre ne peut ouvrir ton carnet.</li>
<li>Dans <b>Groupe</b>, choisis vos deux noms dans la liste, et fille ou garçon (les barèmes sont différents). Un 3e élève seulement si le professeur le demande (élève seul, partenaire blessé).</li>
</ol><p class="astuce">Aux cours suivants : touche le nom de ton binôme sur l’accueil, puis votre code.</p>`},
{t:'Pendant la séance : « Sur la piste »',html:`<ul>
<li>La séance du jour s’ouvre toute seule. Pour en changer : le bouton <span class="bouton">S4 ▾</span> en haut.</li>
<li>Touche le prénom de celui qui court. Le <b>coach</b> (l’autre élève) tient la tablette, chronomètre et note : quelques secondes par course.</li>
<li>Remplissez <b>une étape à la fois</b> : les numéros en haut montrent où vous en êtes (✓ = remplie). Glisse le doigt à gauche ou à droite pour changer d’étape.</li>
<li>Les boutons <span class="bouton">−</span> et <span class="bouton">+</span> évitent le clavier. <span class="bouton">⏱ Compter en direct</span> compte les tours et bipe à mi-course.</li>
<li>Absent, blessé, pratique adaptée : touche <i>Absent, blessé, adapté ?</i> sous le titre de la séance.</li>
</ul>`},
{t:'Fin de séance : bilan et envoi (5 min)',html:`<ol>
<li>Après les étirements, touche <span class="bouton">Fin de séance · 5 min</span> : chacun remplit son bilan (ce que le coach a vu, réussite, conseil, effort ressenti…).</li>
<li>Onglet <b>Envoyer</b> : <span class="bouton">Envoyer la séance en ligne</span> (fichiers déposés sur le Nuage du professeur) <b>ou</b> <span class="bouton">Montrer les QR codes</span> au professeur (un seul QR pour le binôme).</li>
</ol><p class="attention">Une séance pas encore envoyée est signalée par un <b>!</b> orange (bouton de séance, onglet Envoyer). Elle reste sur la tablette : envoyez-la au cours suivant.</p>`},
{t:'Mon projet, mes zones',html:`<ul>
<li>Un projet compte comme <b>tenu</b> s’il est atteint <b>et ambitieux</b> (au moins 95 % de ce que permet ta VMA, ou de ta dernière distance). Un projet trop prudent s’affiche « tenu, mais trop prudent : ne compte pas ».</li>
<li>Au 1’30 : la <b>zone</b> dépend de l’écart entre ton plot et la ligne au coup de sifflet.</li>
<li>En Seconde, les notions arrivent séance après séance : l’étiquette <b>nouveau</b> signale ce qui apparaît aujourd’hui.</li>
<li>Onglet <b>Moi</b> : tes courbes de progression et tes cibles calculées avec ta VMA.</li>
</ul>`},
{t:'Changer de groupe, de tablette, code oublié',html:`<ul>
<li><b>Un élève change de groupe</b> : Groupe → « … part » affiche son QR ; le nouveau groupe le scanne (« Scanner le QR de l’élève »). Toutes ses séances le suivent.</li>
<li><b>Changer de tablette</b> : Groupe → « Enregistrer le carnet du groupe », puis « Reprendre un carnet » sur l’autre tablette.</li>
<li><b>Code oublié</b> : touche « Code oublié ? », montre le QR au professeur, scanne sa réponse et choisis un nouveau code.</li>
<li>Le carnet se ferme seul après 20 min sans toucher l’écran, ou si la tablette reste en veille. Touche <span class="bouton">Fermer</span> en partant.</li>
</ul>`},
{t:'Chrono, lecture facilitée',html:`<ul><li>Onglet <b>Chrono</b> : un chrono avec bips et voix pour le coach (36"/36", 3’, 1’30…).</li>
<li><b>Lecture facilitée</b> (case en haut de ce mode d’emploi) : la même police partout, titres compris, avec des lettres et des lignes plus espacées, utile en cas de dyslexie. Le choix vaut pour toutes les applis EPS de la tablette.</li></ul>`}]},
{id:'prof',titre:'Professeur',chapitres:[
{t:'Mettre en place la classe',html:`<ol>
<li>Dans l’<b>outil prof</b> (Classes) : importez la liste Pronote, choisissez le niveau, collez le lien de dépôt du Nuage (« Demande de fichier »).</li>
<li>Au premier cours, affichez le <b>QR de démarrage</b> : chaque binôme le scanne sur sa tablette. Il apporte la liste, le niveau, le lien (jamais affiché aux élèves) et votre clé de copie de secours.</li>
<li>Une tablette sert à plusieurs binômes et plusieurs classes : chaque carnet est chiffré par le code de son binôme.</li></ol>`},
{t:'Récupérer les séances',html:`<ul><li><b>QR</b> : en fin de cours, chaque binôme montre un seul QR ; outil prof → Recevoir → Scanner (la caméra reste ouverte).</li>
<li><b>En ligne</b> : les élèves déposent leurs fichiers sur le Nuage ; téléchargez le dossier (.zip) et importez-le dans l’outil prof. Une copie de secours chiffrée de chaque carnet arrive aussi.</li>
<li>Code oublié par un binôme : scannez le QR « code oublié » de sa tablette dans l’outil prof, il affiche le QR de déverrouillage.</li></ul>`},
{t:'Montrer l’appli à un collègue',html:`<p>Lien de démonstration (groupe fictif, rien n’est enregistré) : <b>…/demi-fond-eleves/?demo</b> (Seconde) ou <b>?demo=T</b> (Terminale). Sur l’accueil : « Démo Seconde » / « Démo Terminale ».</p>`},
{t:'Sur la piste : conseils pratiques',html:`<ul><li>Ouvrez l’appli une fois avec du réseau avant le cours : ensuite elle s’ouvre même sans réseau.</li>
<li>Un bandeau « Recharger » signale une nouvelle version : touchez-le quand les tablettes sont au calme.</li>
<li>Prévoyez une caisse pour les tablettes au bord de la piste.</li></ul>`}]}
]};
