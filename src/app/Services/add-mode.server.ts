import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AddModeServer {

  private addBoardSource = new BehaviorSubject<boolean>(false);
  currentMode = this.addBoardSource.asObservable();

  constructor() {
  }

  changeMode(addMode:boolean) {
    this.addBoardSource.next(addMode);
  }
}
