import { Component, OnInit } from '@angular/core';
import { AddList } from '../../../../services/add-list.service';
import { StorageBoardsService } from '../../../../services/storage-boards.service';
import { BoardService } from '../../../../services/board.service';
import { DataForListOfItemService } from "../../../../services/data-for-list-of-item.service";

@Component({
  selector: 'app-lists-creation',
  templateUrl: './lists-creation.component.html',
  styleUrls: ['./lists-creation.component.css']
})
export class ListsCreationComponent implements OnInit {

  private addMode = false;
  private nameList = '';
  private idList;
  private idBoard = 0;
  private resetMode = false;

  constructor(private dataForList: AddList,
              private boardService: BoardService,
              private storageBoard: StorageBoardsService,
              private dataForItem: DataForListOfItemService)
  {
    localStorage.setItem('listOfItems', JSON.stringify([]));
  }

  ngOnInit() {
    this.boardService.currentValueBoard
      .subscribe(board => {
        this.idBoard = board.id;
        // debugger
      });
  }

  // this.storageBoards.getBoard(id)

  public add() {
    this.addMode = true;
  }

  public close() {
    this.nameList = '';
    this.addMode = false;
  }

  public closeCreationList() {
    this.close();
  }

  public enter($event) {
    const validName: boolean = this.nameList.trim() !== '';
    if ($event.keyCode == '13' && validName) {
      if (this.storageBoard.getBoard(this.idBoard).lists !== undefined) {
        this.idList = this.storageBoard.getBoard(this.idBoard).lists.length;
      } else {
        this.idList = 0;
      }
      this.dataForList.addList(this.idList, this.nameList);
      console.log('after add list');
      console.log(this.storageBoard.getBoard(this.idBoard));
      // this.dataForItem.currentItem.subscribe(({}) => {
      // }).unsubscribe();
      // debugger
      // this.listService.getListInfo(this.)
      this.resetMode = true;
      // this.dataForItem.setIdList(this.idList);
      // debugger
      this.close();
    }
  }
}
