# Demi-fond · appli élève (Lycée G. Pompidou)

Carnet de demi-fond pour les élèves de **Seconde (S1-S8)** et de **Terminale (T1-T9)**, sur le modèle de l'appli de tennis de table : une tablette sert à plusieurs groupes (binômes ou trinômes) et plusieurs classes.

Adresse : https://yannickdartois-hue.github.io/demi-fond-eleves/ · démo : `?demo` (Seconde, trinôme) ou `?demo=T` (Terminale, binôme).

## Déroulé
1. **Premier cours** : le professeur affiche le *QR de démarrage* de la classe (outil prof → Classes). Il donne la liste Pronote, le niveau, le lien de dépôt du Nuage et la clé des copies de secours.
2. **Chaque groupe** choisit son code secret (4 chiffres), puis ses noms dans la liste (et fille / garçon : les barèmes diffèrent).
3. **En séance, deux temps** : *Sur la piste*, le coach note l'essentiel de chaque course (quelques secondes, une étape à la fois) ; *Fin de séance · 5 min*, après les étirements, chacun remplit sa réflexion et son bilan. Le temps moteur n'est pas entamé par la saisie.
   Groupes : **binômes**. Un 3e élève seulement à titre exceptionnel (élève seul ou partenaire blessé) : A coache B, B coache C, C coache A.
4. **Fin de séance** (onglet Envoyer) : *Envoyer en ligne* (un fichier par élève + copie de secours chiffrée, puis dépôt sur le Nuage) ou *Montrer les QR codes* (un QR par élève). Une séance non envoyée reste signalée (bandeau, onglet qui clignote, accueil).

## Cas particuliers
- **Un élève change de groupe** : Groupe → « … part » affiche son QR (toutes ses séances) ; le nouveau groupe le scanne (« Scanner le QR de l'élève »).
- **Code oublié** : « Code oublié ? » affiche un QR que le professeur scanne (outil prof → Recevoir) ; il répond par un QR de déverrouillage et le groupe choisit un nouveau code. Possible dès que le QR de classe a été scanné.
- **Tablette perdue** : le professeur affiche le *QR de reprise* de l'élève (fiche élève) ou télécharge la *copie de secours* du groupe ; Groupe → « Reprendre un carnet ».
- **Changer de tablette** : Groupe → « Enregistrer le carnet du groupe », puis « Reprendre un carnet » sur l'autre tablette.
- **Ancien carnet numérique** : les binômes trouvés sur la tablette sont proposés à l'accueil (même site, même tablette).

## Données (RGPD)
Les carnets sont **chiffrés** sur la tablette (AES-GCM, clé tirée du code du groupe) : un autre groupe ne peut ni les ouvrir ni les lire. La clé du carnet est aussi chiffrée pour la clé publique du professeur (déverrouillage en cas de code oublié). Verrouillage automatique après 20 min sans activité, ou quand la tablette reste en veille plus de 2 min. Rien ne part sans l'action du groupe (QR ou dépôt). Le lien du Nuage n'est jamais affiché.

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html`, `style.css` | Page et présentation |
| `donnees.js`, `logique.js`, `scan.js` | **Communs avec l'outil prof** (séances, barèmes, calculs, format des QR « DFE ») : garder la même version dans les deux dépôts |
| `vues.js` | Écrans de séance repris du carnet numérique v12 (aussi utilisé par l'outil prof pour les courbes) |
| `app.js` | Groupes, code secret, chiffrement, envoi, changement de groupe |
| `chrono.js` | Chrono de classe (onglet Chrono, commun avec l'outil prof) |
| `demo.js` | Mode démo (en mémoire seulement) |
| `qrcode.js`, `jsqr.js` | Bibliothèques QR (création, lecture caméra) |
| `sw.js` | Hors ligne : **augmenter `VERSION`** à chaque modification |

## Formats
- QR de séance : `DFE1:` + JSON compressé `{a:'DFE',v:1,t:'S',y,c,e,x,s,d,ts,m,gr,co,cr,D}` (≈ 500 caractères).
- QR d'élève (changement de groupe, reprise) : `t:'T'` ; QR de classe : `t:'C'`. Au-delà de 1 400 caractères, le QR défile en morceaux `DFEP|…`.
- Fichier : `Classe_NOMP_S3.json` → `{app:'demi-fond-eleves',version:1,cycle,classe,eleve,sexe,seance,date,groupe,coach,resume,donnees}`.
- Copie de secours : `secours_….json` → `{app:'df-secours',…}` chiffrée pour la clé publique du professeur (ECDH P-256).
