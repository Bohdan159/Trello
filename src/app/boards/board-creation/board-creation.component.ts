import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateNewBoard } from '../../services/create-new-board.service';
import { StorageBoardsService } from '../../services/storage-boards.service';

@Component({
  selector: 'app-board-creation',
  templateUrl: './board-creation.component.html',
  styleUrls: ['./board-creation.component.css']
})
export class BoardCreationComponent {
  private nameBoard = '';
  private createMode = false;
  private invalidName = false;
  private validName = false;

  private formForBoard: FormGroup;

  constructor(private dataForBord: CreateNewBoard, private storageBoards: StorageBoardsService) {
    this.formForBoard = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  public enterPress($event) {
    this.validName = this.nameBoard.trim() !== '';
    if ($event.keyCode == '13' && this.validName) {
      this.dataForBord.changeBoard(this.storageBoards.getID(), this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }
  }

  public createBoard() {
    this.createMode = true;
    this.validName = true;
    this.storageBoards.increaseID();
  }

  public close() {
    this.nameBoard = '';
    this.invalidName = false;
    this.createMode = false;
  }

  public closeEvent() {
    this.close();
    this.storageBoards.decreaseID();
  }

  public createNewBoard() {
    this.validName = this.nameBoard.trim() !== '';
    if (this.validName) {
      this.dataForBord.changeBoard(this.storageBoards.getID(), this.nameBoard);
      this.invalidName = this.nameBoard == '';
      this.close();
    }
  }
}



