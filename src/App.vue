<script setup>
import { reactive, onMounted, computed } from 'vue';
import { MedicamentService } from './services/MedicamentService';

import Recherche from './components/Recherche.vue';
import Ajout from './components/Ajout.vue';
import Tableau from './components/Tableau.vue';

// État de l'application (Centralisé dans un objet reactive pour plus de clarté)
const state = reactive({
  recherche: '',
  form: resetForm(),
  liste: []
});

// --- Initialisation ---
onMounted(loadMedicaments);

// --- Actions (Logique métier déléguée au Service) ---

async function loadMedicaments() {
  try {
    state.liste = await MedicamentService.getAll();
  } catch (error) {
    alert("Impossible de charger les médicaments.");
  }
}

async function sauvegarder() {
  if (!state.form.denomination) return;

  try {
    await MedicamentService.save(state.form);
    await loadMedicaments();
    annuler();
  } catch (error) {
    alert("Erreur lors de la sauvegarde.");
  }
}

async function supprimer(id) {
  if (!confirm("Voulez-vous vraiment supprimer ce médicament ?")) return;
  
  try {
    await MedicamentService.delete(id);
    await loadMedicaments();
  } catch (error) {
    alert("Erreur lors de la suppression.");
  }
}

async function modifierQte(m, v) {
  try {
    await MedicamentService.updateQuantity(m, v);
    await loadMedicaments();
  } catch (error) {
    alert("Erreur lors de la mise à jour de la quantité.");
  }
}

// --- Gestion du Formulaire ---

function editer(m) {
  state.form = { 
    id: m.id, 
    denomination: m.denomination, 
    formepharmaceutique: m.formepharmaceutique, 
    qte: m.qte 
  };
}

function annuler() {
  state.form = resetForm();
}

function resetForm() {
  return { id: '', denomination: '', formepharmaceutique: '', qte: 0 };
}

// --- Propriétés calculées (Logique d'affichage) ---

const listeFiltrée = computed(() => {
  const query = state.recherche.toLowerCase();
  return state.liste.filter(m => 
    m.denomination?.toLowerCase().includes(query)
  );
});

const stockTotal = computed(() => {
  return state.liste.reduce((total, m) => total + (parseInt(m.qte) || 0), 0);
});
</script>

<template>
  <div class="container">
    <h1>Ma Pharmacie</h1>

    <!-- Composant de recherche -->
    <Recherche v-model="state.recherche" />

    <!-- Composant d'ajout/modification -->
    <Ajout 
      :form="state.form" 
      @sauvegarder="sauvegarder" 
      @annuler="annuler" 
    />

    <!-- Tableau des médicaments -->
    <Tableau 
      :liste="listeFiltrée" 
      @modifier-qte="modifierQte" 
      @editer="editer" 
      @supprimer="supprimer" 
    />

    <!-- Statistiques simples -->
    <p class="stats">
      <strong>Nombre total d'articles en stock : {{ stockTotal }}</strong>
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}
.stats {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
