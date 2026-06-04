<script setup>
import { reactive, onMounted, computed } from 'vue';
import { Medicament } from './Medicament';
import Recherche from './components/Recherche.vue';
import Ajout from './components/Ajout.vue';
import Tableau from './components/Tableau.vue';

const API_URL = "https://apipharmacie.pecatte.fr/api/2/medicaments";

const state = reactive({
  recherche: '',
  form: { id: '', denomination: '', formepharmaceutique: '', qte: 0 },
  liste: []
});

// Charger les médicaments au démarrage
onMounted(() => {
  getMedicaments();
});

function getMedicaments() {
  fetch(API_URL)
    .then(response => response.json())
    .then(dataJSON => {
      state.liste = dataJSON.map(m => new Medicament(m));
    })
    .catch(error => console.error("Erreur récupération :", error));
}

function sauvegarder() {
  if (!state.form.denomination) return;

  const method = state.form.id ? 'PUT' : 'POST';
  
  fetch(API_URL, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.form)
  })
    .then(response => {
      if (!response.ok) throw new Error('Erreur sauvegarde');
      getMedicaments();
      annuler();
    })
    .catch(error => console.error("Erreur sauvegarde :", error));
}

function supprimer(id) {
  if (!confirm("Supprimer ce médicament ?")) return;
  
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) throw new Error('Erreur suppression');
      getMedicaments();
    })
    .catch(error => console.error("Erreur suppression :", error));
}

function modifierQte(m, v) {
  const nouvelleQte = parseInt(m.qte) + v;
  if (nouvelleQte < 0) return;

  // On crée un objet simple pour l'API à partir de l'entité
  const medModifie = {
    id: m.id,
    denomination: m.denomination,
    formepharmaceutique: m.formepharmaceutique,
    qte: nouvelleQte
  };

  fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medModifie)
  })
    .then(response => {
      if (!response.ok) throw new Error('Erreur quantité');
      getMedicaments();
    })
    .catch(error => console.error("Erreur Qte :", error));
}

function editer(m) {
  state.form = { 
    id: m.id, 
    denomination: m.denomination, 
    formepharmaceutique: m.formepharmaceutique, 
    qte: m.qte 
  };
}

function annuler() {
  state.form = { id: '', denomination: '', formepharmaceutique: '', qte: 0 };
}

// Propriétés calculées
const listeFiltrée = computed(() => {
  return state.liste.filter(m => 
    m.denomination && m.denomination.toLowerCase().includes(state.recherche.toLowerCase())
  );
});

const stockTotal = computed(() => {
  return state.liste.reduce((acc, m) => acc + parseInt(m.qte || 0), 0);
});
</script>

<template>
  <div>
    <h1>Ma Pharmacie</h1>

    <Recherche v-model="state.recherche" />

    <Ajout 
      :form="state.form" 
      @sauvegarder="sauvegarder" 
      @annuler="annuler" 
    />

    <Tableau 
      :liste="listeFiltrée" 
      @modifier-qte="modifierQte" 
      @editer="editer" 
      @supprimer="supprimer" 
    />

    <p><strong>Nombre total d'articles en stock : {{ stockTotal }}</strong></p>
  </div>
</template>
