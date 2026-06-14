<script setup>
defineProps(['liste']);
defineEmits(['modifier-qte', 'editer', 'supprimer']);
</script>

<template>
  <table border="1" width="100%">
    <thead>
      <tr>
        <th>Image</th>
        <th>Nom</th>
        <th>Forme</th>
        <th>Quantité</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in liste" :key="m.id">
        <td>
          <img 
            v-if="m.photo" 
            :src="'https://apipharmacie.pecatte.fr/images/' + m.photo" 
            :alt="m.denomination"
            class="med-image"
          >
          <span v-else>Pas d'image</span>
        </td>
        <td>{{ m.denomination }}</td>
        <td>{{ m.formepharmaceutique }}</td>
        <td>{{ m.qte }}</td>
        <td>
          <button @click="$emit('modifier-qte', m, 1)">+1</button>
          <button @click="$emit('modifier-qte', m, -1)">-1</button>
          <button @click="$emit('editer', m)">Modifier</button>
          <button @click="$emit('supprimer', m.id)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.med-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

table {
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 8px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
  cursor: pointer;
}
</style>
