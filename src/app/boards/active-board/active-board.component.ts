import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateNewBoard } from '../../services/create-new-board.service';
import { Router } from '@angular/router';
import { Board } from '../../classes/board';
import { StorageBoardsService } from '../../services/storage-boards.service';
import { BoardService } from '../../services/board.service';


@Component({
  selector: 'app-active-board',
  templateUrl: './active-board.component.html',
  styleUrls: ['./active-board.component.css']
})
export class ActiveBoardComponent implements OnInit, OnDestroy {
  private boards: Board[] = [];

  constructor(private dataForBord: CreateNewBoard,
              private boardService: BoardService,
              private router: Router,
              private storageBoards: StorageBoardsService) {
  }

  public ngOnInit() {
    this.boards = this.storageBoards.getBoards();
    this.dataForBord.currentBoard
      .subscribe(({id, boardName}) => {
        if (boardName != '') {
          let add: boolean;
          if (id == 0 && this.boards.length === 0) {
            this.addBoard(id, boardName);
          } else {
            this.boards.forEach((board) => {
              add = board.id != id;
              return add;
            });
            if (add) {
              this.addBoard(id, boardName);
            }
          }
          this.storageBoards.setBoards(this.boards);
        }
      });
  }

  public ngOnDestroy() {
    this.dataForBord.resetBoard();
    this.dataForBord.currentBoard.subscribe(() => {
    }).unsubscribe();
  }

  public addBoard(id: number, name: string) {
    this.boards.push(new Board(id, name));
  }

  public deleteBoard(id) {
    this.boards.splice(id, 1);
    this.boards.forEach((board, index) => {
      board.id = index;
    });
    this.storageBoards.decreaseID();
    this.storageBoards.setBoards(this.boards);

  }

  public goTo(id) {
    this.boardService.getBoardInfo(this.storageBoards.getBoard(id));
    this.router.navigate([id]);
  }


  public checkToEditMode(idBoard) {
    this.boards[idBoard].editMode = true;

  }

  public defMode($event, idBoard) {
    if ($event.keyCode == '13' || $event.type == 'blur') {
      this.boards[idBoard].editMode = false;
      this.boards[idBoard].name = $event.target.value;
      this.storageBoards.setBoards(this.boards);
    }
  }
}
