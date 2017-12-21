import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataForListOfItemService {
  private resetMode = false;
  private idList = 0;

  private itemSourceTest = new Subject<any>();
  // Observable.create(observer => {
  // });

  // private itemSource = new BehaviorSubject<any>({idItem: 0, nameItem: ''});
  currentItem = this.itemSourceTest.asObservable();

  constructor() {
  }

  addItem(idItem: number, nameItem: string) {
    this.itemSourceTest.next({idItem, nameItem});
  }

  resetItem() {
    this.itemSourceTest.next({id: -1, nameItem: ''});
  }

  setIdList(idList) {
    this.idList = idList;
  }

  getIdList() {
    return this.idList;
  }

  setResetMode(reset) {
    this.resetMode = reset;
  }

  getResetMode() {
    return this.resetMode;
  }
}
