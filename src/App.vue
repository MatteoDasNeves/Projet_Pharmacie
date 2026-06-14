<script setup>
import { reactive, onMounted, computed } from 'vue';
import { MedicamentService } from './services/MedicamentService';

import Recherche from './components/Recherche.vue';
import Ajout from './components/Ajout.vue';
import Tableau from './components/Tableau.vue';

/**
 * État global de l'application.
 * On utilise 'reactive' pour regrouper les données liées à l'interface.
 */
const state = reactive({
  recherche: {
    nom: '',
    forme: '',
    qteMax: null
  },
  form: resetForm(),
  liste: []
});

// Chargement initial des données quand le composant est prêt
onMounted(loadMedicaments);

/**
 * Récupère la liste des médicaments depuis le service.
 */
async function loadMedicaments() {
  try {
    state.liste = await MedicamentService.getAll();
  } catch (error) {
    alert("Impossible de charger les médicaments. Vérifiez votre connexion.");
  }
}

/**
 * Enregistre un médicament (ajout ou modification).
 */
async function sauvegarder() {
  if (!state.form.denomination) {
    alert("Le nom du médicament est obligatoire.");
    return;
  }

  try {
    await MedicamentService.save(state.form);
    await loadMedicaments(); // Rafraîchir la liste
    annuler(); // Réinitialiser le formulaire
  } catch (error) {
    alert("Erreur lors de la sauvegarde.");
  }
}

/**
 * Supprime un médicament après confirmation.
 */
async function supprimer(id) {
  if (!confirm("Voulez-vous vraiment supprimer ce médicament ? Cette action est irréversible.")) return;
  
  try {
    await MedicamentService.delete(id);
    await loadMedicaments();
  } catch (error) {
    alert("Erreur lors de la suppression.");
  }
}

/**
 * Modifie la quantité d'un médicament (+1 ou -1).
 */
async function modifierQte(m, v) {
  try {
    await MedicamentService.updateQuantity(m, v);
    await loadMedicaments();
  } catch (error) {
    alert("Erreur lors de la mise à jour de la quantité.");
  }
}

/**
 * Remplit le formulaire avec les données d'un médicament pour modification.
 */
function editer(m) {
  state.form = { 
    id: m.id, 
    denomination: m.denomination, 
    formepharmaceutique: m.formepharmaceutique, 
    qte: m.qte,
    photo: m.photo
  };
}

/**
 * Réinitialise le formulaire.
 */
function annuler() {
  state.form = resetForm();
}

/**
 * Retourne un objet médicament vide.
 */
function resetForm() {
  return { id: '', denomination: '', formepharmaceutique: '', qte: 0, photo: null };
}

/**
 * Liste filtrée en fonction des critères de recherche (Nom, Forme, Quantité).
 */
const listeFiltrée = computed(() => {
  return state.liste.filter(m => {
    // Recherche par nom (insensible à la casse)
    const matchNom = m.denomination?.toLowerCase().includes(state.recherche.nom.toLowerCase());
    // Recherche par forme (insensible à la casse)
    const matchForme = m.formepharmaceutique?.toLowerCase().includes(state.recherche.forme.toLowerCase());
    // Recherche par quantité maximum
    const matchQte = state.recherche.qteMax === null || state.recherche.qteMax === '' || m.qte <= state.recherche.qteMax;
    
    return matchNom && matchForme && matchQte;
  });
});

/**
 * Calcul du stock total de tous les médicaments affichés.
 */
const stockTotal = computed(() => {
  return state.liste.reduce((total, m) => total + (parseInt(m.qte) || 0), 0);
});
</script>

<template>
  <div class="container">
    <header>
      <h1>Ma Pharmacie</h1>
      <p>Gestion simplifiée de votre inventaire de médicaments.</p>
    </header>

    <main>
      <!-- Zone de recherche -->
      <section class="card">
        <h2>Recherche</h2>
        <Recherche v-model="state.recherche" />
      </section>

      <!-- Zone d'ajout / modification -->
      <section class="card">
        <h2>{{ state.form.id ? 'Modifier' : 'Ajouter' }} un produit</h2>
        <Ajout 
          :form="state.form" 
          @sauvegarder="sauvegarder" 
          @annuler="annuler" 
        />
      </section>

      <!-- Liste des produits -->
      <section class="card">
        <h2>Inventaire</h2>
        <Tableau 
          :liste="listeFiltrée" 
          @modifier-qte="modifierQte" 
          @editer="editer" 
          @supprimer="supprimer" 
        />
        
        <div v-if="listeFiltrée.length === 0" class="empty-msg">
          Aucun médicament ne correspond à votre recherche.
        </div>
      </section>

      <!-- Statistiques -->
      <footer class="stats card">
        <strong>Total en stock : {{ stockTotal }} unités</strong>
      </footer>
    </main>
  </div>
</template>

<style>
/* Styles globaux simples et propres */
body {
  background-color: #f0f2f5;
  color: #333;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #34495e;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.stats {
  text-align: center;
  background-color: #e8f4fd;
  border: 1px solid #b3d7ff;
}

.empty-msg {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
  font-style: italic;
}

/* Styles pour les boutons (utilisabilité) */
button {
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.8;
}

button:active {
  transform: translateY(1px);
}
</style>
