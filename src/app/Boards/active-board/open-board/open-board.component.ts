import { Component, OnInit } from '@angular/core';
import { NameBoard } from '../../../Services/data-for-open-board.service';


@Component({
  selector: 'app-open-board',
  templateUrl: './open-board.component.html',
  styleUrls: ['./open-board.component.css']
})
export class OpenBoardComponent implements OnInit{ // OnInit
  private name: string = '';

  constructor(private nameBoard: NameBoard) {
  }

  ngOnInit() {
    this.nameBoard.currentName
      .subscribe(boardName => {
        this.name = boardName;
      });
  }
}
