import { Injectable } from '@angular/core';

@Injectable()
export class StorageItemsService {

  constructor() {
  }

  getItems() {
    return JSON.parse(localStorage.getItem('listOfItems'));
  }

  setItems(items) {
    localStorage.removeItem('listOfItems');
    localStorage.setItem('listOfItems', JSON.stringify(items));
  }

  resetItem() {
    localStorage.removeItem('listOfItems');
    localStorage.setItem('listOfItems', JSON.stringify([]));
  }
}
