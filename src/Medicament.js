export class Medicament {
  constructor(medJSON) {
    this._id = medJSON.id;
    this._denomination = medJSON.denomination;
    this._formepharmaceutique = medJSON.formepharmaceutique;
    this._qte = medJSON.qte || 0;
  }

  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get formepharmaceutique() {
    return this._formepharmaceutique;
  }

  get qte() {
    return this._qte;
  }

  set qte(value) {
    this._qte = value;
  }
}
