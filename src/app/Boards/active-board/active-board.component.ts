import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateNewBoard } from '../../Services/create-new-board';


@Component({
  selector: 'app-active-board',
  templateUrl: './active-board.component.html',
  styleUrls: ['./active-board.component.css']
})
export class ActiveBoardComponent {
  private name: string = '';
  private id: number = 0;
  private createMode: boolean = false;


  formForBoard: FormGroup;

  constructor(private dataForBord: CreateNewBoard) {
    this.formForBoard = new FormGroup({
      "name": new FormControl("", Validators.required)
    });
  }

  // submit($event), createNewBoard() -- пока одно и тоже
  public submit($event) {
  }

  enterPress($event) {
    const validName: boolean = this.name.trim() !== '' ? true : false;
    if ($event.keyCode == '13' && validName) {
      console.log(this.name);
      // this.addBoard(this.id, this.name);
      this.dataForBord.changeBoard(this.id, this.name);
      this.close();
    }

  }

  public createBoard() {
    this.createMode = true;
  }

  //  close(), cancelBoard() -- пока одно и тоже + по окончанию добавления должна срабатывать одна из этих функций
  public close() {
    // this.formForBoard.controls['name'] = false;
    this.name = '';
    this.createMode = false;
  }

  public cancelBoard() {
    this.name = '';
    this.createMode = false;
  }

  public createNewBoard($event) {
    this.enterPress($event);
  }


}
