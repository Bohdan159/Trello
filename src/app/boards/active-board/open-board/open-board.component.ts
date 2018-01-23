import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';


@Component({
  selector: 'app-open-board',
  templateUrl: './open-board.component.html',
  styleUrls: ['./open-board.component.css']
})
export class OpenBoardComponent implements OnInit {
  private name = '';

  constructor(private board: BoardService
              ) {
    localStorage.setItem('boardOfLists', JSON.stringify([]));
  }

  public ngOnInit() {
    this.board.currentValueBoard
      .subscribe(board => {
        this.name = board.name;
      }).unsubscribe();
  }
}
