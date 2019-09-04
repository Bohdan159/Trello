export class List {
  id: number;
  name: string;
  items: any;
  editMode: boolean;

  constructor(id: number, name: string, items?: any) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.editMode = false;
  }
}
