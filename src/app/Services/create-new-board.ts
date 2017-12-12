import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CreateNewBoard {

  private boardSource = new BehaviorSubject<any>({id: 0, boardName: ''});
  currentBoard = this.boardSource.asObservable();

  constructor() {
  }

  changeBoard(id: number, boardName: string) {
    this.boardSource.next({id, boardName});
  }
}
