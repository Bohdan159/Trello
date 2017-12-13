import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataForListOfItemService {

  private itemSource = new BehaviorSubject<any>({idItem: 0, nameItem: ''});
  currentItem = this.itemSource.asObservable();

  constructor() {
  }

  addItem(id: number, nameItem: string) {
    this.itemSource.next({id, nameItem});
  }
}
