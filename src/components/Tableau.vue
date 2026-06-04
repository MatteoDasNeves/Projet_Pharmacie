<script setup>
defineProps(['liste']);
defineEmits(['modifier-qte', 'editer', 'supprimer']);
</script>

<template>
  <table border="1" width="100%">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Forme</th>
        <th>Quantité</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in liste" :key="m.id">
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
