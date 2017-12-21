import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AddList {

  private listSource = new BehaviorSubject<any>({id: -1, listName: ''});
  currentList = this.listSource.asObservable();

  constructor() {
  }

  addList(id: number, listName: string) {
    this.listSource.next({id, listName});
  }

  resetList() {
    this.listSource.next({id: -1, listName: ''});
  }
}
