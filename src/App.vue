<template>
  <div>
    <h1>Ma Pharmacie</h1>

    <Recherche v-model="recherche" />

    <Ajout 
      :form="form" 
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

<script>
import Recherche from './components/Recherche.vue'
import Ajout from './components/Ajout.vue'
import Tableau from './components/Tableau.vue'
import scriptLogic from './script.js'

export default {
  components: { Recherche, Ajout, Tableau },
  // On réutilise la logique du fichier script.js
  ...scriptLogic
}
</script>
