const API_URL = "https://apipharmacie.pecatte.fr/api/2/medicaments";

export default {
  data() {
    return {
      recherche: '',
      form: { id: null, nom: '', qte: 0, prix: 0 },
      liste: []
    }
  },
  mounted() {
    this.getMedicaments();
  },
  methods: {
    // Lire
    async getMedicaments() {
      try {
        const response = await fetch(API_URL);
        this.liste = await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    },
    // Créer ou Modifier
    async sauvegarder() {
      if (!this.form.nom) return;

      const options = {
        method: this.form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      };

      try {
        await fetch(API_URL, options);
        this.getMedicaments(); // Rafraîchir la liste
        this.annuler();
      } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
      }
    },
    // Supprimer
    async supprimer(id) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        this.getMedicaments(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    },
    // Modifier la quantité (+1 / -1)
    async modifierQte(m, v) {
      if (m.qte + v < 0) return;
      m.qte += v;
      
      try {
        await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(m)
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la quantité :", error);
      }
    },
    editer(m) { this.form = { ...m } },
    annuler() { this.form = { id: null, nom: '', qte: 0, prix: 0 } }
  },
  computed: {
    listeFiltrée() {
      return this.liste.filter(m => 
        m.nom.toLowerCase().includes(this.recherche.toLowerCase())
      );
    },
    total() {
      return this.liste.reduce((acc, m) => acc + (m.qte * m.prix), 0).toFixed(2);
    }
  }
}
