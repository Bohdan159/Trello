import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateNewBoard } from '../../Services/create-new-board.service';
import { IdBoardService } from '../../Services/id-board.service';

@Component({
  selector: 'app-board-creation',
  templateUrl: './board-creation.component.html',
  styleUrls: ['./board-creation.component.css']
})
export class BoardCreationComponent {

  private nameBoard = '';
  // private idBoard = -1;
  private createMode = false;
  private invalidName: boolean = false;
  private validName: boolean = false;

  formForBoard: FormGroup;

  constructor(private dataForBord: CreateNewBoard, private idBoard: IdBoardService) {
    this.formForBoard = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  public enterPress($event) {
    this.validName = this.nameBoard.trim() !== '';
    if ($event.keyCode == '13' && this.validName) {
      this.dataForBord.changeBoard(this.idBoard.getID(), this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }
  }

  public createBoard() {
    this.createMode = true;
    this.validName = true;
    this.idBoard.increaseID();
  }

  public close(){
    this.nameBoard = '';
    this.invalidName = false;
    this.createMode = false;
  }

  public closeEvent() {
    this.close();
    this.idBoard.decreaseID();
  }

  public createNewBoard() {
    this.validName = this.nameBoard.trim() !== '';
    if (this.validName) {
      this.dataForBord.changeBoard(this.idBoard.getID(), this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }
  }
}



