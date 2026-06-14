import { Medicament } from '../Medicament';

// URL de base de l'API fournie par le professeur
const API_URL = "https://apipharmacie.pecatte.fr/api/2/medicaments";

/**
 * Le Service Medicament gère toutes les interactions avec le serveur (API).
 * Il permet de séparer la logique de récupération des données de l'affichage (Vue).
 */
export const MedicamentService = {
  
  /**
   * Récupère la liste de tous les médicaments.
   * On transforme chaque objet JSON reçu en une instance de la classe 'Medicament'.
   */
  async getAll() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      const data = await response.json();
      // On utilise .map pour transformer chaque élément du tableau
      return data.map(m => new Medicament(m));
    } catch (error) {
      console.error("Erreur getAll:", error);
      throw error;
    }
  },

  /**
   * Enregistre un médicament sur le serveur.
   * Si l'objet possède un 'id', on fait une mise à jour (PUT).
   * Sinon, on crée un nouveau médicament (POST).
   */
  async save(medicamentData) {
    const isUpdate = !!medicamentData.id;
    const method = isUpdate ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(API_URL, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicamentData)
      });
      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');
      return await response.json();
    } catch (error) {
      console.error("Erreur save:", error);
      throw error;
    }
  },

  /**
   * Supprime définitivement un médicament via son identifiant unique (id).
   */
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      return true;
    } catch (error) {
      console.error("Erreur delete:", error);
      throw error;
    }
  },

  /**
   * Met à jour uniquement la quantité d'un médicament.
   * Pratique pour les boutons +1 / -1 dans le tableau.
   */
  async updateQuantity(medicament, change) {
    // Calcul de la nouvelle quantité (sans descendre en dessous de 0)
    const newQuantity = parseInt(medicament.qte) + change;
    if (newQuantity < 0) return;

    // On prépare les données complètes car l'API demande l'objet entier pour une mise à jour
    const updatedData = {
      id: medicament.id,
      denomination: medicament.denomination,
      formepharmaceutique: medicament.formepharmaceutique,
      qte: newQuantity,
      photo: medicament.photo
    };

    return this.save(updatedData);
  }
};
