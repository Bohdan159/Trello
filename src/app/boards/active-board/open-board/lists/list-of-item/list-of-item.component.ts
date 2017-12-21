import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataForListOfItemService } from '../../../../../services/data-for-list-of-item.service';
import { Item } from '../../../../../classes/item';
import { StorageItemsService } from '../../../../../services/storage-items.service';
import { StorageBoardsService } from '../../../../../services/storage-boards.service';
import { List } from '../../../../../classes/list';
import { BoardService } from "../../../../../services/board.service";
import { AddList } from "../../../../../services/add-list.service";

@Component({
  selector: 'app-list-of-item',
  templateUrl: './list-of-item.component.html',
  styleUrls: ['./list-of-item.component.css']
})
// export class ListOfItemComponent {
export class ListOfItemComponent implements OnInit, OnDestroy {
  private list: List;
  private items: Item[] = [];
  private idBoard: number;
  private idNewList: number;

  constructor(private dataForItem: DataForListOfItemService,
              private storageOfItems: StorageItemsService,
              private boardService: BoardService,
              private storageOfBord: StorageBoardsService,
              private dataForList: AddList) {
  }

  ngOnInit() {
    this.boardService.currentValueBoard
      .subscribe((board) => {
        this.idBoard = board.id;
        // debugger
      }).unsubscribe();

    this.dataForList.currentList
      .subscribe(({id, listName}) => {
        this.idNewList = id;
        // debugger
      }).unsubscribe();

    // if (this.dataForItem.getDataForReset()) {
    //   this.storageOfItems.resetIdItem();
    //   this.dataForItem.resetItem();
    //   console.log("reset");
    //   console.log(this.items);
    //   debugger;
    //   this.dataForItem.setDataForReset(false);
    // }
    // debugger

    this.dataForItem.currentItem
      .subscribe(({idItem, nameItem}) => {
        // debugger
        // this.list = this.storageOfBord.getList(this.idBoard, this.dataForItem.getIdList());
        // debugger
        // if (this.list.items == undefined) {
        //   this.items = this.storageOfItems.getItems();  // this.storageOfItems.getItems();
        // } else {
        //   this.items = this.list.items;
        // }
        // debugger

        // if (nameItem != '') {
        //   this.addItem(idItem, nameItem);
        //   // debugger
        //   this.storageOfItems.setItems(this.items);   //trouble
        //   this.list.items = this.items;
        //   this.storageOfBord.setList(this.idBoard, this.dataForItem.getIdList(), this.list); // this.storageOfItems.getItems()
        //   // this.items = [];
        //   if (this.dataForItem.getResetMode()) {
        //     this.storageOfItems.resetIdItem();
        //     this.dataForItem.resetItem();
        //     this.dataForItem.currentItem.subscribe(({}) => {
        //     }).unsubscribe();
        //   }
      });

  }

  ngOnDestroy() {
    this.storageOfItems.resetIdItem();
    this.dataForItem.resetItem();
    this.boardService.currentValueBoard.subscribe(() => {
    }).unsubscribe();
    this.dataForItem.currentItem.subscribe(({}) => {
    }).unsubscribe();
  }

  public addItem(id: number, nameItem: string) {
    this.items.push(new Item(id, nameItem));
  }

  //
  // public deleteItem(id) {
  //   this.items.splice(id, 1);
  // }
  //
  // public workWithItem() {
  //   this.storageOfItems.setItems(this.items);
  //   this.list.items = this.items;
  //   this.storageOfBord.setList(this.idBoard, this.idList, this.list);
  // }
  //
  // public checkToEditMode(idItem) {
  //   // this.list[idItem].editMode = true
  //   console.log(this.list[idItem]);
  //   debugger
  // }
  //
  // public defMode($event, idItem) {
  //   if ($event.keyCode == '13' || $event.type == 'blur') {
  //     this.items[idItem].editMode = false;
  //     this.items[idItem].nameItem = $event.target.value;
  //     this.workWithItem();
  //   }
  // }
}

