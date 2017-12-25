import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BoardService {

  private boardSource = new BehaviorSubject<any>({});
  currentValueBoard = this.boardSource.asObservable();

  constructor() {}

  getBoardInfo(board: any) {
    this.boardSource.next(board);
  }
}
