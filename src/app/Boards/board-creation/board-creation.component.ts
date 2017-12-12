import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateNewBoard } from '../../Services/create-new-board';

export class Board {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-board-creation',
  templateUrl: './board-creation.component.html',
  styleUrls: ['./board-creation.component.css']
})
export class BoardCreationComponent implements OnInit { //, OnDestroy
  private boards: Board[] = [];

  constructor(private dataForBord: CreateNewBoard) {
  }

  ngOnInit() {
    this.dataForBord.currentBoard
      .subscribe(({id, boardName}) => {
        if(boardName != ''){
          this.addBoard(id, boardName);
        }

      });
    // .unsubscribe();
  }

  // ngOnDestroy(){
  //   this.dataForBord.currentBoard.subscribe(() =>{}).unsubscribe();
  // }

  public addBoard(id: number, name: string) {
    this.boards.push(new Board(id, name));
  }
}
