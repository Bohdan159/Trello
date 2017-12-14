import { Injectable } from '@angular/core';

@Injectable()
export class IdBoardService{
  private idBoard: number = -1;

  constructor() {}

  getID(){
    return this.idBoard;
  }

  increaseID(){
    this.idBoard++;
  }

  decreaseID(){
    this.idBoard--;
  }
}
