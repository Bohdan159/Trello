import { Injectable } from '@angular/core';
import { Board } from '../classes/board';


@Injectable()
export class StorageBoardsService {
  private idBoard = -1;
  private boards: Board[] = [];
  private board: Board;

  // private lists: List[] = [];

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
    // debugger
    this.boards = this.getBoards();
    // localStorage.removeItem('boards');
    this.boards[id] = board;
    this.setBoards(this.boards);
    // localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  getList(idBoard, idList) {
    this.boards = this.getBoards();
    this.board = this.getBoard(idBoard);
    // debugger
    console.log(this.board.lists[idList]);
    return this.board.lists[idList];
  }

  setList(idBoard, idList, list) {
    //debugger
    this.boards = this.getBoards();
    localStorage.removeItem('boards');
    // this.board = this.boards[idBoard];
    // this.board.lists[idList] = list;
    this.boards[idBoard].lists[idList] = list;
    // debugger
    localStorage.setItem('boards', JSON.stringify(this.boards));
    console.log(localStorage.getItem('boards'));
    // this.setBoard(idList, this.board);
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
