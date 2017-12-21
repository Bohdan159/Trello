export class Item {
  idItem: number;
  nameItem: string;
  editMode: boolean;

  constructor(id: number, name: string) {
    this.idItem = id;
    this.nameItem = name;
    this.editMode = false;
  }
}
