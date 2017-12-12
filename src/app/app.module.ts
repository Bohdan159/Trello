import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardsComponent } from './Boards/boards.component';
import { ActiveBoardComponent } from './Boards/active-board/active-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardCreationComponent } from './Boards/board-creation/board-creation.component';
import { CreateNewBoard } from './Services/create-new-board';


@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    ActiveBoardComponent,
    BoardCreationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CreateNewBoard],
  bootstrap: [AppComponent]
})
export class AppModule { }
