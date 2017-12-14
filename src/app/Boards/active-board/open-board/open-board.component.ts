import { Component, OnInit } from '@angular/core';
import { NameBoard } from '../../../Services/data-for-open-board.service';
import { AddModeServer } from "../../../Services/add-mode.server";


@Component({
  selector: 'app-open-board',
  templateUrl: './open-board.component.html',
  styleUrls: ['./open-board.component.css']
})
export class OpenBoardComponent implements OnInit{ // OnInit
  private name: string = '';
  private addMode: boolean = false;

  constructor(private nameBoard: NameBoard, private mode: AddModeServer) {
  }

  ngOnInit() {
    this.nameBoard.currentName
      .subscribe(boardName => {
        this.name = boardName;
      });
    this.mode.changeMode(this.addMode);
  }
}
