import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddList } from '../../../../Services/add-list.service';
import { DataForListOfItemService } from '../../../../Services/data-for-list-of-item.service';
import { List } from "../../../../Classes/list";
import { StorageService } from '../../../../Services/storage.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy{
  private lists: List[] = [];
  private idItem: number = 0;
  private nameItem: string = '';

  constructor(private dataForList: AddList, private dataForItem: DataForListOfItemService, private storageOfList: StorageService) {
  }

  ngOnInit() {
    this.lists = this.storageOfList.getLists();
    this.dataForList.currentList
      .subscribe(({id, listName}) => {
        if (listName != '') {
          this.addItemList(id, listName);
          this.storageOfList.setLists(this.lists);
        }
      });
  }

  ngOnDestroy() {
    this.dataForList.currentList.subscribe(() => {
    }).unsubscribe();
  }

  public press($event, id) {
    // this.nameItem = $event.target.value;
    const validName: boolean = $event.target.value.trim() !== ''; // this.nameItem.trim() !== '';

    if ($event.keyCode == '13' && validName) {
      this.idItem++;

      this.dataForItem.addItem(this.idItem, $event.target.value);
      $event.target.value = '';
    }

  }

  public addItemList(id: number, nameList: string) {
    this.lists.push(new List(id, nameList));
  }

  public deleteList(id) {
    this.storageOfList.decreaseIdList();
    this.lists.splice(id, 1);
    this.storageOfList.setLists(this.lists);
    debugger;
  }
}
