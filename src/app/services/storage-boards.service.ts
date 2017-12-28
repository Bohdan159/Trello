import { Injectable } from '@angular/core';
import { Board } from '../classes/board';


@Injectable()
export class StorageBoardsService {
  private idBoard = -1;
  private boards: Board[] = [];

  constructor() {
  }

  getBoards() {
    return JSON.parse(localStorage.getItem('boards'));
  }

  setBoards(boards) {
    localStorage.removeItem('boards');
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  getBoard(id) {
    this.boards = this.getBoards();
    return this.boards[id];
  }

  setBoard(id, board) {
    this.boards = this.getBoards();
    this.boards[id] = board;
    this.setBoards(this.boards);
  }

  getList(idBoard, idList) {
    this.boards = this.getBoards();
    return this.boards[idBoard].lists[idList];
  }

  setList(idBoard, idList, list) {
    this.boards = this.getBoards();
    localStorage.removeItem('boards');
    this.boards[idBoard].lists[idList] = list;
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  getID() {
    return this.idBoard;
  }

  increaseID() {
    this.idBoard++;
  }

  decreaseID() {
    this.idBoard--;
  }
}
