<template>
  <div>
    <h3>{{ form.id ? 'Modifier' : 'Ajouter' }} un médicament</h3>
    <input v-model="form.denomination" placeholder="Nom (Dénomination)">
    <input v-model="form.formepharmaceutique" placeholder="Forme (ex: Gélule)">
    <input v-model.number="form.qte" type="number" placeholder="Quantité">
    
    <button @click="$emit('sauvegarder')">
      {{ form.id ? 'Mettre à jour' : 'Ajouter' }}
    </button>
    <button v-if="form.id" @click="$emit('annuler')">Annuler</button>
    <br><br>
  </div>
</template>

<script>
export default {
  props: ['form'],
  emits: ['sauvegarder', 'annuler']
}
</script>
