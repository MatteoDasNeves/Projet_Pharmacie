<template>
  <div>
    <h1>Ma Pharmacie (SFC Vue.js)</h1>

    <!-- Barre de recherche -->
    <input v-model="recherche" placeholder="Rechercher...">
    <hr>

    <!-- Formulaire -->
    <h3>Ajouter un médicament</h3>
    <input v-model="nouveauNom" placeholder="Nom">
    <input v-model.number="nouvelleQte" type="number" placeholder="Qté">
    <input v-model.number="nouveauPrix" type="number" placeholder="Prix">
    <button @click="ajouter">Ajouter</button>

    <br><br>

    <!-- Tableau -->
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Quantité</th>
          <th>Prix</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in listeFiltrée" :key="m.id">
          <td>{{ m.nom }}</td>
          <td>{{ m.qte }}</td>
          <td>{{ m.prix }} €</td>
          <td>{{ (m.qte * m.prix).toFixed(2) }} €</td>
          <td>
            <button @click="modifier(m, 1)">+1</button>
            <button @click="modifier(m, -1)">-1</button>
            <button @click="supprimer(m.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Calcul Global -->
    <p><strong>Valeur totale de la pharmacie : {{ valeurTotalePharmacie }} €</strong></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recherche: '',
      nouveauNom: '',
      nouvelleQte: 0,
      nouveauPrix: 0,
      liste: [
        { id: 1, nom: "Paracétamol", qte: 10, prix: 5.50 },
        { id: 2, nom: "Ibuprofène", qte: 5, prix: 7.20 }
      ]
    }
  },
  methods: {
    ajouter() {
      if (!this.nouveauNom) return;
      this.liste.push({
        id: Date.now(),
        nom: this.nouveauNom,
        qte: this.nouvelleQte,
        prix: this.nouveauPrix
      });
      this.nouveauNom = ''; this.nouvelleQte = 0; this.nouveauPrix = 0;
    },
    supprimer(id) {
      this.liste = this.liste.filter(m => m.id !== id);
    },
    modifier(m, v) {
      if (m.qte + v >= 0) m.qte += v;
    }
  },
  computed: {
    listeFiltrée() {
      return this.liste.filter(m => 
        m.nom.toLowerCase().includes(this.recherche.toLowerCase())
      );
    },
    valeurTotalePharmacie() {
      let total = 0;
      this.liste.forEach(m => {
        total += (m.qte * m.prix);
      });
      return total.toFixed(2);
    }
  }
}
</script>
