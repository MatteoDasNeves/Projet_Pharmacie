<template>
  <div>
    <h1>Ma Pharmacie</h1>

    <input v-model="recherche" placeholder="Rechercher par nom...">
    <hr>

    <h3>{{ form.id ? 'Modifier' : 'Ajouter' }} un médicament</h3>
    <input v-model="form.denomination" placeholder="Nom (Dénomination)">
    <input v-model="form.formepharmaceutique" placeholder="Forme (ex: Gélule)">
    <input v-model.number="form.qte" type="number" placeholder="Quantité">
    
    <button @click="sauvegarder">{{ form.id ? 'Mettre à jour' : 'Ajouter' }}</button>
    <button v-if="form.id" @click="annuler">Annuler</button>

    <br><br>

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
        <tr v-for="m in listeFiltrée" :key="m.id">
          <td>{{ m.denomination }}</td>
          <td>{{ m.formepharmaceutique }}</td>
          <td>{{ m.qte }}</td>
          <td>
            <button @click="modifierQte(m, 1)">+1</button>
            <button @click="modifierQte(m, -1)">-1</button>
            <button @click="editer(m)">Modifier</button>
            <button @click="supprimer(m.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p><strong>Nombre total d'articles en stock : {{ stockTotal }}</strong></p>
  </div>
</template>

<script src="./script.js"></script>
