<script setup>
/**
 * Composant pour l'ajout ou la modification d'un médicament.
 */
defineProps(['form']);
defineEmits(['sauvegarder', 'annuler']);
</script>

<template>
  <div class="form-container">
    <div class="form-group">
      <label>Nom du médicament :</label>
      <input v-model="form.denomination" placeholder="Ex: Paracétamol">
    </div>

    <div class="form-group">
      <label>Forme pharmaceutique :</label>
      <input v-model="form.formepharmaceutique" placeholder="Ex: Gélule, Comprimé">
    </div>

    <div class="form-group">
      <label>Quantité :</label>
      <input v-model.number="form.qte" type="number" placeholder="0">
    </div>

    <div class="form-group">
      <label>Nom de l'image (optionnel) :</label>
      <input v-model="form.photo" placeholder="Ex: medicament_1.jpg">
      <small>Note: L'image doit être présente sur le serveur.</small>
    </div>
    
    <div class="actions">
      <button @click="$emit('sauvegarder')" class="btn-primary">
        {{ form.id ? 'Enregistrer les modifications' : 'Ajouter au stock' }}
      </button>
      <button v-if="form.id" @click="$emit('annuler')" class="btn-secondary">
        Annuler la modification
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

small {
  color: #666;
  font-size: 0.8rem;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #27ae60;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}
</style>
