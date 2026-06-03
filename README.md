# Ma Pharmacie - Gestionnaire de Médicaments

Une application web moderne et légère pour gérer le stock d'une pharmacie, construite avec **Vue.js 3** et **Vite**. L'application est connectée à une API externe pour la persistance des données.

## 🚀 Fonctionnalités

- **Affichage en temps réel** : Liste complète des médicaments récupérée depuis l'API.
- **Recherche dynamique** : Filtrage instantané par dénomination.
- **Gestion du stock** :
  - Ajouter de nouveaux médicaments (Dénomination, Forme, Quantité).
  - Modifier les informations d'un médicament existant.
  - Ajuster rapidement les quantités (+1 / -1).
  - Supprimer des articles.
- **Calcul automatique** : Affichage du nombre total d'articles en stock.

## 🛠️ Architecture

L'application suit une structure modulaire en composants Vue :

- `App.vue` : Composant parent (orchestrateur).
- `Recherche.vue` : Barre de recherche.
- `Ajout.vue` : Formulaire d'ajout et de modification.
- `Tableau.vue` : Affichage de la liste et actions.
- `script.js` : Logique métier et appels API centralisés.

## 📦 Installation et Lancement

### Prérequis
- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)

### Étapes
1. **Extraire le projet** ou cloner le dépôt.
2. Ouvrir un terminal dans le dossier `Projet_Pharmacie`.
3. Installer les dépendances :
   ```bash
   npm install
   ```
4. Lancer l'application en mode développement :
   ```bash
   npm run dev
   ```
5. Ouvrir l'URL affichée dans le terminal (généralement `http://localhost:5173`).

## 📖 Guide d'utilisation

### 1. Ajouter un médicament
Remplissez les champs "Nom", "Forme" et "Quantité" dans le formulaire en haut de la page, puis cliquez sur **Ajouter**.

### 2. Modifier un médicament
Cliquez sur le bouton **Modifier** dans la ligne correspondante du tableau. Le formulaire se remplira automatiquement. Modifiez les champs et cliquez sur **Mettre à jour**. Vous pouvez cliquer sur **Annuler** pour sortir du mode édition.

### 3. Ajuster les quantités
Utilisez les boutons **+1** et **-1** directement dans le tableau pour mettre à jour le stock instantanément sur le serveur.

### 4. Rechercher
Tapez le nom d'un médicament dans la barre de recherche pour filtrer la liste affichée dans le tableau.

## 🌐 API Utilisée
L'application communique avec l'API suivante :
`https://apipharmacie.pecatte.fr/api/2/medicaments`
