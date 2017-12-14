import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateNewBoard } from '../../Services/create-new-board.service';
import { NameBoard } from '../../Services/data-for-open-board.service';
import { Router } from "@angular/router";
import { Board } from "../../Classes/board";


@Component({
  selector: 'app-active-board',
  templateUrl: './active-board.component.html',
  styleUrls: ['./active-board.component.css']
})
export class ActiveBoardComponent implements OnInit, OnDestroy {
  private boards: Board[] = [];

  constructor(private dataForBord: CreateNewBoard, private nameBoard: NameBoard, private router: Router) {
  }

  ngOnInit() {
    this.boards = JSON.parse(localStorage.getItem('boards'));
    this.dataForBord.currentBoard
      .subscribe(({id, boardName}) => {
        if (boardName != '') {
          let add: boolean;
          if (id == 0) {
            this.addBoard(id, boardName);
          }
          else {
            this.boards.forEach((Board) => {
              add = Board.id != id;
              return add;
            });
            if (add) {
              this.addBoard(id, boardName);
            }
          }
          localStorage.setItem('boards', JSON.stringify(this.boards));
        }
      });
  }

  ngOnDestroy() {
    this.dataForBord.currentBoard.subscribe(() => {
    }).unsubscribe();
  }

  public addBoard(id: number, name: string) {
    this.boards.push(new Board(id, name));
  }

  public deleteBoard(id) {
    this.boards.splice(id, 1);
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  private goTo(id) {
    this.nameBoard.getName(this.boards[id].name);
    this.router.navigate([id + 1]);
  }
}
