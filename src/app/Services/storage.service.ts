import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// interface IStorage {
//   get();
//   set(board);
//   remove();
//   clear();
// }

@Injectable()
export class StorageService { //implements IStorage
  // private boards: any = [];
  private idList: number = -1;

  constructor() {}

  getLists(){
    return JSON.parse(localStorage.getItem('boardOfLists'));
  }

  setLists(lists){
    localStorage.setItem('boardOfLists', JSON.stringify(lists));
  }

  getIdList(){
    return this.idList;
  }

  increaseIdList(){
    this.idList++;
  }

  decreaseIdList(){
    this.idList--;
  }

  // remove(){
  //
  // }
  //
  // clear(){
  //
  // }
}
