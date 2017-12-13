import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateNewBoard } from '../../Services/create-new-board.service';
import { NameBoard } from '../../Services/data-for-open-board.service';
import { Router } from "@angular/router";

export class Board {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-active-board',
  templateUrl: './active-board.component.html',
  styleUrls: ['./active-board.component.css']
})
export class ActiveBoardComponent implements OnInit, OnDestroy {
  private boards: Board[] = [] || this.boards;

  constructor(private dataForBord: CreateNewBoard, private nameBoard: NameBoard, private router: Router) {
  }

  ngOnInit() {
    this.dataForBord.currentBoard
      .subscribe(({id, boardName}) => {
        if (boardName != '') {
          this.addBoard(id, boardName);
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
  }

  private goTo(id) {
    this.nameBoard.getName(this.boards[id].name);
    this.router.navigate([id+1]);
  }
}
