import { Component } from '@angular/core';
import {FormGroup, FormControl, Validator} from '@angular/forms';

@Component({
  selector: 'app-active-board',
  templateUrl: './active-board.component.html',
  styleUrls: ['./active-board.component.css']
})
export class ActiveBoardComponent {
  private name: string = '';
  private createMode: boolean = false;

  formForBoard : FormGroup;
  constructor(){
    this.formForBoard = new FormGroup({

    });
  }
  public createBoard(){
    this.createMode = true;
  }

}
