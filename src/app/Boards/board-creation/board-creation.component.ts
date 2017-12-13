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

  public enterPress($event) {
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

  public closeEvent() {
    this.close();
    this.idBoard--;
  }

  public createNewBoard() {
    this.validName = this.nameBoard.trim() !== '';
    if (this.validName) {
      this.dataForBord.changeBoard(this.idBoard, this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }
  }
}



