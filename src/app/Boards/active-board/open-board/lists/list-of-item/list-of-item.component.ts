import { Component, OnInit } from '@angular/core';
import { DataForListOfItemService } from '../../../../../Services/data-for-list-of-item.service';

export class Item{
  id: number;
  name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}


@Component({
  selector: 'app-list-of-item',
  templateUrl: './list-of-item.component.html',
  styleUrls: ['./list-of-item.component.css']
})
export class ListOfItemComponent implements OnInit {
  private itemss: Item[] = [];

  constructor( private dataForItem: DataForListOfItemService) {}

  ngOnInit() {
    this.dataForItem.currentItem
      .subscribe( ({idItem, nameItem}) => {
        if (nameItem != '') {
          this.addItem(idItem, nameItem);
        }
    });
  }

  public addItem(id: number, nameList: string){
    this.itemss.push(new Item(id, nameList));
  }

  public deleteList(id){
    this.itemss.splice(id, 1);
  }
}

