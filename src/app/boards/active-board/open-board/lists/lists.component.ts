import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddList } from '../../../../services/add-list.service';
import { List } from '../../../../classes/list';
import { DataForListOfItemService } from '../../../../services/data-for-list-of-item.service';
import { StorageListsService } from '../../../../services/storage-lists.service';
import { Item } from '../../../../classes/item';
import { StorageItemsService } from '../../../../services/storage-items.service';
import { Board } from '../../../../classes/board';
import { StorageBoardsService } from '../../../../services/storage-boards.service';
import { BoardService } from '../../../../services/board.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {
  private board: Board;
  private idBoard: number;
  private lists: List[] = [];
  private idItem: number;
  private nameItem = '';
  private resetMode = false;
  private idList = 0;

  constructor(private dataForList: AddList,
              private dataForItem: DataForListOfItemService,
              private storageOfList: StorageListsService,
              private storageOfBoards: StorageBoardsService,
              private boardService: BoardService,
              private storageOfItems: StorageItemsService) {
  }

  ngOnInit() {
    this.boardService.currentValueBoard
      .subscribe(board => {
        this.idBoard = board.id;
      });

    this.board = this.storageOfBoards.getBoard(this.idBoard);
    if (this.board.lists == undefined) {
      this.lists = this.storageOfList.getLists();
    } else {
      this.lists = this.board.lists;
    }

    this.dataForList.currentList
      .subscribe(({id, listName}) => {
        if (listName != '') {
          this.addList(id, listName);
          this.workWithList();
        }
      });
  }

  ngOnDestroy() {
    this.storageOfList.resetIdList();   // test 2
    this.dataForList.resetList();
    this.dataForList.currentList.subscribe(({}) => {
    }).unsubscribe();
  }

  public press($event, idList) {
    this.nameItem = $event.target.value;
    const validName: boolean = this.nameItem.trim() !== '';
    if ($event.keyCode == '13' && validName) {
      // debugger
      console.log(this.storageOfBoards.getBoard(this.idBoard).lists[idList].items);
      if (this.storageOfBoards.getBoard(this.idBoard).lists[idList].items !== undefined) {
        this.idItem = this.storageOfBoards.getBoard(this.idBoard).lists[idList].items.length;
      } else {
        this.idItem = 0;
      }
      debugger
      // this.dataForItem.setIdList(idList);
      this.dataForItem.addItem(this.idItem, this.nameItem);
      // this.idList = idList;
      $event.target.value = '';
      console.log(this.storageOfBoards.getBoard(this.idBoard));
    }
  }

  public addList(id: number, nameList: string) {
    this.lists.push(new List(id, nameList));
  }

  public deleteList(id) {
    this.lists.splice(id, 1);
    this.workWithList();
    this.storageOfItems.resetItem();
  }

  public workWithList() {
    this.storageOfList.setLists(this.lists);
    // debugger
    this.board.lists = this.lists;
    this.storageOfBoards.setBoard(this.idBoard, this.board);
  }

  public checkToEditMode(idList) {
    this.lists[idList].editMode = true;
  }

  public defMode($event, idList) {
    if ($event.keyCode == '13' || $event.type == 'blur') {
      this.lists[idList].editMode = false;
      this.lists[idList].name = $event.target.value;
      this.workWithList();
    }
  }

  public clkList(idList) {
    // this.resetMode = true
    // debugger
    this.resetMode = idList != this.idList;

    this.dataForItem.setResetMode(this.resetMode);
    this.dataForItem.setIdList(idList);
  }
}
