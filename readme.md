# Mini Trello – Application Kanban

## 1. Objectif du projet
Ce projet consiste à développer une mini application web inspirée de Trello.  
Elle permet de gérer des tâches à l’aide d’un tableau Kanban composé de plusieurs colonnes.  
L'utilisateur peut créer, déplacer et supprimer des tâches de manière intuitive.

---

## 2. Fonctionnalités
- Ajouter une tâche via un formulaire (titre + description)
- Affichage automatique de l’heure de création
- Déplacement des tâches entre les colonnes grâce au **drag and drop**
- Suppression d'une tâche via un bouton dédié
- Sauvegarde automatique dans le **localStorage** (les tâches restent après rechargement)
- Interface dynamique sans rechargement de page

---

## 3. Technologies utilisées
- **HTML**
- **CSS**
- **JavaScript (Vanilla)**

---

## 4. Fonctionnement général
1. L’utilisateur clique sur **“Ajouter une tâche”**
2. Un formulaire s’ouvre et demande :
   - un **titre**
   - une **description**
3. Une carte est générée dans la colonne choisie
4. L’utilisateur peut :
   - **déplacer** cette carte dans une autre colonne (drag & drop)
   - **supprimer** la carte via le bouton 🗑️
5. Le tableau est **enregistré dans le localStorage**, ce qui permet de conserver les données même après fermeture ou rechargement du navigateur