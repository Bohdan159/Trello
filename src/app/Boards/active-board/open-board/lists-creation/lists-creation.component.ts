import { Component, OnInit } from '@angular/core';
import { AddList } from "../../../../Services/add-list.service";
import { StorageService } from "../../../../Services/storage.service";


@Component({
  selector: 'app-lists-creation',
  templateUrl: './lists-creation.component.html',
  styleUrls: ['./lists-creation.component.css']
})
export class ListsCreationComponent{

  private addMode: boolean = false;
  private nameList: string = '';

  constructor(private dataForList: AddList, private storageOfList: StorageService) {
  }

  public add() {
    this.addMode = true;
    this.storageOfList.increaseIdList();
  }

  public close() {
    this.nameList = '';
    this.addMode = false;
  }

  public closeCreationList() {
    this.close();
    this.storageOfList.decreaseIdList();
  }

  public enter($event) {
    const validName: boolean = this.nameList.trim() !== '';
    if ($event.keyCode == '13' && validName) {
      this.dataForList.addList(this.storageOfList.getIdList(), this.nameList);

      this.close();
    }
  }
}
