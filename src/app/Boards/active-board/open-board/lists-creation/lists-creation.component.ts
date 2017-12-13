import { Component, OnInit } from '@angular/core';
import { NameBoard } from "../../../../Services/data-for-open-board.service";
import { AddList } from "../../../../Services/add-list.service";


@Component({
  selector: 'app-lists-creation',
  templateUrl: './lists-creation.component.html',
  styleUrls: ['./lists-creation.component.css']
})
export class ListsCreationComponent implements OnInit { //, OnDestroy

  private idList: number = 0;
  private addMode: boolean = false;
  private nameList: string = '';
  private idItem: number = 0;
  private nameItem: string = '';

  constructor(private nameBoard: NameBoard, private dataForList: AddList) {
  }

  ngOnInit() {
    // this.nameBoard.currentName
    //   .subscribe(boardName => {
    //     this.name = 'Tom';
    //   }).unsubscribe();
  }

  public add() {
    this.addMode = true;
    this.idList++;
  }

  public close() {
    this.nameList = '';
    this.addMode = false;
  }

  public closeCreationList() {
    this.close();
    this.idList--;
  }

  public enter($event) {
    const validName: boolean = this.nameList.trim() !== '';
    if ($event.keyCode == '13' && validName) {
      this.dataForList.addList(this.idList, this.nameList);
      this.close();
    }
  }
}
