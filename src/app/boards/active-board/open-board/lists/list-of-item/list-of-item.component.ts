import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataForListOfItemService } from '../../../../../services/data-for-list-of-item.service';
import { Item } from '../../../../../classes/item';
import { StorageItemsService } from '../../../../../services/storage-items.service';
import { StorageBoardsService } from '../../../../../services/storage-boards.service';
import { List } from '../../../../../classes/list';
import { BoardService } from '../../../../../services/board.service';
import { AddList } from '../../../../../services/add-list.service';
import { Board } from '../../../../../classes/board';

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

  public ngOnInit() {
    this.boardService.currentValueBoard
      .subscribe((board) => {
        this.idBoard = board.id;
      }).unsubscribe();

    this.dataForList.currentList
      .subscribe(({id, listName}) => {
        this.idNewList = id;
      }).unsubscribe();

    if (this.dataForItem.getResetMode()) {
      this.items = [];
      this.storageOfItems.resetItem();
      this.dataForItem.resetItem();
      this.dataForItem.currentItem.subscribe(({}) => {
      }).unsubscribe();
    }
    this.list = this.storageOfBord.getList(this.idBoard, this.dataForItem.getIdList());

    if (this.list.items == undefined) {
      this.items = this.storageOfItems.getItems();
    } else {
      this.items = this.list.items;
    }

    this.dataForItem.currentItem
      .subscribe(({idItem, nameItem}) => {
        if (nameItem != '') {
          this.addItem(idItem, nameItem);
          this.storageOfItems.setItems(this.items);
          this.board = this.storageOfBord.getBoard(this.idBoard);
          this.board.lists[this.dataForItem.getIdList()].items = this.items;
          this.storageOfBord.setBoard(this.idBoard, this.board);
        }
      });
  }

  public ngOnDestroy() {
    this.storageOfItems.resetItem();
    this.dataForItem.resetItem();
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

