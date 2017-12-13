import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NameBoard {

  private nameSource = new BehaviorSubject<string>('');
  currentName = this.nameSource.asObservable();

  constructor() {}

  getName(boardName: string) {
    this.nameSource.next(boardName);
  }
}
