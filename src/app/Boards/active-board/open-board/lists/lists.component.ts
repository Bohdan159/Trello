import { Component, OnInit } from '@angular/core';
import { AddList } from '../../../../Services/add-list.service';
import { DataForListOfItemService } from '../../../../Services/data-for-list-of-item.service';

export class Item {
  idItem: number;
  nameItem: string;

  constructor(id: number, name: string) {
    this.idItem = id;
    this.nameItem = name;
  }
}

export class List {
  id: number;
  name: string;

  constructor(id: number, name: string) {   //, item: Items
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  private lists: List[] = [];
  private idItem: number = 0;
  private nameItem: string = '';

  constructor(private dataForList: AddList, private dataForItem: DataForListOfItemService) {
  }

  ngOnInit() {
    this.dataForList.currentList
      .subscribe(({id, listName}) => {
        if (listName != '') {
          this.addItemList(id, listName);
        }
      });
  }

  public press($event) {
    const validName: boolean = this.nameItem.trim() !== '' ? true : false;
    if ($event.keyCode == '13' && validName) {
      this.idItem++;

      this.dataForItem.addItem(this.idItem, this.nameItem);
      this.nameItem = '';
    }

  }

  public addItemList(id: number, nameList: string) {
    this.lists.push(new List(id, nameList));
  }

  public deleteList(id) {
    this.idItem--;
    this.lists.splice(id, 1);
  }
}

