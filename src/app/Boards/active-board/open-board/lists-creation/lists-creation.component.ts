import { Component, OnInit } from '@angular/core';
import { AddList } from "../../../../Services/add-list.service";


@Component({
  selector: 'app-lists-creation',
  templateUrl: './lists-creation.component.html',
  styleUrls: ['./lists-creation.component.css']
})
export class ListsCreationComponent{

  private idList: number = 0;
  private addMode: boolean = false;
  private nameList: string = '';

  constructor(private dataForList: AddList) {
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
