import { Component, OnInit } from '@angular/core';
import { AddModeServer } from '../../../services/add-mode.server';
import { StorageBoardsService } from '../../../services/storage-boards.service';
import { BoardService } from '../../../services/board.service';
// import { DragulaService } from "ng2-dragula";


@Component({
  selector: 'app-open-board',
  templateUrl: './open-board.component.html',
  styleUrls: ['./open-board.component.css']
})
export class OpenBoardComponent implements OnInit {
  private name = '';
  private addMode = false;

  constructor(private board: BoardService,
              private mode: AddModeServer,
              private storageBoards: StorageBoardsService
              ) {
    localStorage.setItem('boardOfLists', JSON.stringify([]));
    // dragulaServ.drop.subscribe((value: any) => {
    //   this.onDrop(value.slice(1));
    // });

  }



  ngOnInit() {
    this.board.currentValueBoard
      .subscribe(board => {
        this.name = board.name;
        // debugger
      });
    /* по-моему уже не нужно*/
    this.mode.changeMode(this.addMode);
  }
}
