import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ListService {

  private listSource = new BehaviorSubject<any>({});
  currentValueList = this.listSource.asObservable();

  constructor() {
  }

  getListInfo(list: any) {
    this.listSource.next(list);
  }
}
