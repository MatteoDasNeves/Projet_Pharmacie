<script setup>
import { ref } from 'vue';

// On reçoit un objet { nom: '', forme: '', qteMax: null } via v-model
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

// État local pour afficher ou masquer la recherche avancée
const afficherAvance = ref(false);

/**
 * Met à jour un champ spécifique de la recherche et émet le changement vers le parent.
 */
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  });
}
</script>

<template>
  <div class="search-box">
    <!-- Recherche simple par nom -->
    <div class="field">
      <label for="search-nom">Rechercher par nom :</label>
      <input 
        id="search-nom"
        :value="modelValue.nom" 
        @input="updateField('nom', $event.target.value)" 
        placeholder="Ex: Doliprane..."
      >
      <button @click="afficherAvance = !afficherAvance" class="btn-toggle">
        {{ afficherAvance ? 'Masquer' : 'Recherche avancée' }}
      </button>
    </div>

    <!-- Champs de recherche avancée -->
    <div v-if="afficherAvance" class="advanced-fields">
      <div class="field">
        <label for="search-forme">Forme :</label>
        <input 
          id="search-forme"
          :value="modelValue.forme" 
          @input="updateField('forme', $event.target.value)" 
          placeholder="Ex: Gélule, Sirop..."
        >
      </div>
      <div class="field">
        <label for="search-qte">Quantité max en stock :</label>
        <input 
          id="search-qte"
          type="number"
          :value="modelValue.qteMax" 
          @input="updateField('qteMax', $event.target.value)" 
          placeholder="Ex: 50"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

label {
  font-weight: bold;
  min-width: 150px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
}

.btn-toggle {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.advanced-fields {
  margin-top: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-left: 4px solid #3498db;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
