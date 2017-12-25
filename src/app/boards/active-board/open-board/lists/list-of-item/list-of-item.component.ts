import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataForListOfItemService } from '../../../../../services/data-for-list-of-item.service';
import { Item } from '../../../../../classes/item';
import { StorageItemsService } from '../../../../../services/storage-items.service';
import { StorageBoardsService } from '../../../../../services/storage-boards.service';
import { List } from '../../../../../classes/list';
import { BoardService } from "../../../../../services/board.service";
import { AddList } from "../../../../../services/add-list.service";
import { Board } from "../../../../../classes/board";

@Component({
  selector: 'app-list-of-item',
  templateUrl: './list-of-item.component.html',
  styleUrls: ['./list-of-item.component.css']
})

export class ListOfItemComponent implements OnInit, OnDestroy {
  private board: Board;
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
    console.log(this.dataForItem.getResetMode());
    if (this.dataForItem.getResetMode()) {
      // this.storageOfItems.resetIdItem()
      // debugger
      this.items = [];
      this.storageOfItems.resetItem();
      console.log(this.storageOfItems.getItems());
      this.dataForItem.resetItem();

      this.dataForItem.currentItem.subscribe(({}) => {
      }).unsubscribe();
    }
    debugger
    this.list = this.storageOfBord.getList(this.idBoard, this.dataForItem.getIdList());

    if (this.list.items == undefined) {   // !!!! остановка здесь из-за ошибки -- при добавлении item-а интерпретатор
      // сюда не заходит и из-за "items" не инициализируется "[]". Из-за этого не правильная запись в localStorage и не
      // правильное отображение.
      this.items = this.storageOfItems.getItems();  // this.storageOfItems.getItems();
    } else {
      this.items = this.list.items;
    }

    this.dataForItem.currentItem
      .subscribe(({idItem, nameItem}) => {
        // debugger
        // this.list = this.storageOfBord.getList(this.idBoard, this.dataForItem.getIdList());
        // debugger

        // debugger
        console.log(this.storageOfItems.getItems());
        console.log('просмотр items');
        console.log(this.items);
        if (nameItem != '') {
          this.addItem(idItem, nameItem);
          // debugger
          // this.storageOfItems.getItems()
          //
          // debugger
          this.storageOfItems.setItems(this.items);
          console.log(this.storageOfItems.getItems());
          // console.log(this.storageOfItems.getIdItem());

          this.board = this.storageOfBord.getBoard(this.idBoard);
          console.log(this.board.lists[this.dataForItem.getIdList()].items);
          this.board.lists[this.dataForItem.getIdList()].items = this.items;
          this.storageOfBord.setBoard(this.idBoard, this.board);
        }
      });

    // debugger
    // this.storageOfItems.setItems(this.items);   //troubleee
    // this.board = this.storageOfBord.getBoard(this.idBoard);
    // console.log(this.board.lists[this.dataForItem.getIdList()].items);
    // this.storageOfBord.setBoard(this.idBoard, this.board);

    // this.board.lists[this.dataForItem.getIdList()].items = this.items;
    // this.list.items = this.items;
    // this.storageOfBord.setList(this.idBoard, this.dataForItem.getIdList(), this.list);

  }

  ngOnDestroy() {
    // this.storageOfItems.resetIdItem();
    // this.items = [];
    this.storageOfItems.resetItem();
    console.log(this.storageOfItems.getItems());
    this.dataForItem.resetItem();
    // this.boardService.currentValueBoard.subscribe(() => {
    // }).unsubscribe();
    this.dataForItem.currentItem.subscribe(({}) => {
    }).unsubscribe();
  }

  public addItem(id: number, nameItem: string) {
    this.items.push(new Item(id, nameItem));
  }


  public deleteItem(id) {
    this.items.splice(id, 1);
    this.items.forEach((item, index) => {
      item.idItem = index;
    });
    this.workWithItem();
    this.storageOfItems.resetItem();
  }

  public workWithItem() {
    this.storageOfItems.setItems(this.items);
    this.list.items = this.items;
    this.storageOfBord.setList(this.idBoard, this.dataForItem.getIdList(), this.list);
  }

  public checkToEditMode(idItem) {
    this.list.items[idItem].editMode = true;
  }

  public defMode($event, idItem) {
    if ($event.keyCode == '13' || $event.type == 'blur') {
      this.items[idItem].editMode = false;
      this.items[idItem].nameItem = $event.target.value;
      this.workWithItem();
    }
  }
}

