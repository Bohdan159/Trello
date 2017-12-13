import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateNewBoard } from '../../Services/create-new-board.service';

@Component({
  selector: 'app-board-creation',
  templateUrl: './board-creation.component.html',
  styleUrls: ['./board-creation.component.css']
})
export class BoardCreationComponent {
  private nameBoard = '';
  private idBoard = 0;
  private createMode = false;
  private invalidName: boolean = false;
  private validName: boolean = false;

  formForBoard: FormGroup;

  constructor(private dataForBord: CreateNewBoard) {
    this.formForBoard = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  // submit($event), createNewBoard() -- пока одно и тоже
  public submit($event) {
  }

  public enterPress($event) {   // изменение id !!!
    this.validName = this.nameBoard.trim() !== '' ? true : false;
    if ($event.keyCode == '13' && this.validName) {
      this.dataForBord.changeBoard(this.idBoard, this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }

  }

  public createBoard() {
    this.createMode = true;
    this.idBoard++;
  }

  public close(){
    this.nameBoard = '';
    this.invalidName = false;
    this.createMode = false;
  }

  //  close(), cancelBoard() -- пока одно и тоже + по окончанию добавления должна срабатывать одна из этих функций
  public closeEvent() {
    // this.formForBoard.controls['name'] = false;
    this.close();
    this.idBoard--;
  }

  // public cancelBoard() {
  //   this.name = '';
  //   this.invalidName = false;
  //   this.createMode = false;
  //   this.id--;
  // }

  public createNewBoard() {
    this.validName = this.nameBoard.trim() !== '' ? true : false;
    if (this.validName) {
      this.dataForBord.changeBoard(this.idBoard, this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }
  }
}



