import { Medicament } from '../Medicament';

const API_URL = "https://apipharmacie.pecatte.fr/api/2/medicaments";

export const MedicamentService = {
  /**
   * Récupère tous les médicaments et les transforme en instances de Medicament.
   */
  async getAll() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      const data = await response.json();
      return data.map(m => new Medicament(m));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * Sauvegarde un médicament (Création ou Mise à jour).
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
      console.error(error);
      throw error;
    }
  },

  /**
   * Supprime un médicament par son ID.
   */
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * Met à jour la quantité d'un médicament spécifique.
   */
  async updateQuantity(medicament, change) {
    const newQuantity = parseInt(medicament.qte) + change;
    if (newQuantity < 0) return;

    const updatedData = {
      id: medicament.id,
      denomination: medicament.denomination,
      formepharmaceutique: medicament.formepharmaceutique,
      qte: newQuantity
    };

    return this.save(updatedData);
  }
};
