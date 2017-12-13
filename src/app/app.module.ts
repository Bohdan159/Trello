import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { BoardsComponent } from './Boards/boards.component';
import { ActiveBoardComponent } from './Boards/active-board/active-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardCreationComponent } from './Boards/board-creation/board-creation.component';
import { CreateNewBoard } from './Services/create-new-board.service';
import { OpenBoardComponent } from './Boards/active-board/open-board/open-board.component';
import { ListsComponent } from './Boards/active-board/open-board/lists/lists.component';
import { NameBoard } from './Services/data-for-open-board.service';
import { AddList } from './Services/add-list.service';
import { ListsCreationComponent } from './Boards/active-board/open-board/lists-creation/lists-creation.component';
import { ListOfItemComponent } from './Boards/active-board/open-board/lists/list-of-item/list-of-item.component';
import { DataForListOfItemService } from './Services/data-for-list-of-item.service';

// определение машрутов -- нужно делать программн!
const appRoutes: Routes =[
  {path: '', component: BoardsComponent},
  {path: '**', component: OpenBoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    ActiveBoardComponent,
    BoardCreationComponent,
    OpenBoardComponent,
    ListsComponent,
    ListsCreationComponent,
    ListOfItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CreateNewBoard, NameBoard, AddList, DataForListOfItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
