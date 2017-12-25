import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CreateNewBoard {

  private boardSource = new BehaviorSubject<any>({id: 0, boardName: '', lists: []});
  currentBoard = this.boardSource.asObservable();

  constructor() {
  }

  changeBoard(id: number, boardName: string, lists?: any) {
    this.boardSource.next({id, boardName, lists});
  }

  resetBoard() {
    this.boardSource.next({id: -1, boardName: ''});
  }
}
