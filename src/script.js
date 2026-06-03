const API_URL = "https://apipharmacie.pecatte.fr/api/2/medicaments";

export default {
  data() {
    return {
      recherche: '',
      form: { id: '', denomination: '', formepharmaceutique: '', qte: 0 },
      liste: []
    }
  },
  mounted() {
    this.getMedicaments();
  },
  methods: {
    async getMedicaments() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erreur réseau');
        this.liste = await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    },

    async sauvegarder() {
      if (!this.form.denomination) return;

      const isUpdate = !!this.form.id;
      const method = isUpdate ? 'PUT' : 'POST';

      try {
        const response = await fetch(API_URL, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });

        if (!response.ok) throw new Error('Erreur lors de la sauvegarde');
        
        await this.getMedicaments();
        this.annuler();
      } catch (error) {
        console.error("Erreur sauvegarde :", error);
      }
    },

    async supprimer(id) {
      if (!confirm("Supprimer ce médicament ?")) return;
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erreur suppression');
        await this.getMedicaments();
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    },

    async modifierQte(m, v) {
      const nouvelleQte = parseInt(m.qte) + v;
      if (nouvelleQte < 0) return;

      const medModifie = { ...m, qte: nouvelleQte };

      try {
        const response = await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medModifie)
        });
        if (!response.ok) throw new Error('Erreur mise à jour quantité');
        await this.getMedicaments();
      } catch (error) {
        console.error("Erreur Qte :", error);
      }
    },

    editer(m) {
      this.form = { ...m };
    },

    annuler() {
      this.form = { id: '', denomination: '', formepharmaceutique: '', qte: 0 };
    }
  },
  computed: {
    listeFiltrée() {
      return this.liste.filter(m => 
        m.denomination && m.denomination.toLowerCase().includes(this.recherche.toLowerCase())
      );
    },
    stockTotal() {
      return this.liste.reduce((acc, m) => acc + parseInt(m.qte || 0), 0);
    }
  }
}
