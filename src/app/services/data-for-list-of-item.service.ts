import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataForListOfItemService {
  private resetMode = false;
  private idList = 0;

  private itemSource = new BehaviorSubject<any>({idItem: 0, nameItem: ''});
  currentItem = this.itemSource.asObservable();

  constructor() {
  }

  addItem(idItem: number, nameItem: string) {
    this.itemSource.next({idItem, nameItem});
  }

  resetItem() {
    this.itemSource.next({id: -1, nameItem: ''});
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
