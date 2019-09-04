export class Board {
  id: number;
  name: string;
  lists: any;
  editMode: boolean;

  constructor(id: number, name: string, lists?: any) {
    this.id = id;
    this.name = name;
    this.lists = lists;
    this.editMode = false;
  }
}
