import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StorageItemsService {
  private idItem = -1;

  constructor() {
  }

  getItems() {
    return JSON.parse(localStorage.getItem('listOfItems'));
  }

  setItems(items) {
    localStorage.removeItem('listOfItems');
    //debugger
    localStorage.setItem('listOfItems', JSON.stringify(items));
  }

  getIdItem() {
    // console.log(this.idItem);
    return this.idItem;
  }

  increaseIdItem() {
    this.idItem++;
  }

  decreaseIdItem() {
    this.idItem--;
  }

  resetItem() {
    // this.idItem = -1;
    localStorage.removeItem('listOfItems');
    localStorage.setItem('listOfItems', JSON.stringify([]));
  }
}
