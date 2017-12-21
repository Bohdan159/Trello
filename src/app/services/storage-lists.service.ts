import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StorageListsService {
  private idList = -1;

  constructor() {
  }

  getLists() {
    return JSON.parse(localStorage.getItem('boardOfLists'));
  }

  setLists(lists) {
    localStorage.removeItem('boardOfLists');
    localStorage.setItem('boardOfLists', JSON.stringify(lists));
  }

  resetIdList() {
    this.idList = -1;
  }
}