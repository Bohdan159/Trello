import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { ActiveBoardComponent } from './boards/active-board/active-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardCreationComponent } from './boards/board-creation/board-creation.component';
import { CreateNewBoard } from './services/create-new-board.service';
import { OpenBoardComponent } from './boards/active-board/open-board/open-board.component';
import { ListsComponent } from './boards/active-board/open-board/lists/lists.component';
import { AddList } from './services/add-list.service';
import { ListsCreationComponent } from './boards/active-board/open-board/lists-creation/lists-creation.component';
import { ListOfItemComponent } from './boards/active-board/open-board/lists/list-of-item/list-of-item.component';
import { DataForListOfItemService } from './services/data-for-list-of-item.service';
import { AddModeServer } from './services/add-mode.server';
import { StorageBoardsService } from './services/storage-boards.service';
import { StorageListsService } from './services/storage-lists.service';
import { StorageItemsService } from './services/storage-items.service';
import { BoardService } from './services/board.service';

const appRoutes: Routes = [
  {path: '', component: BoardsComponent}, /*BoardsComponent*/
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
  providers: [
    CreateNewBoard,
    BoardService,
    AddList,
    DataForListOfItemService,
    AddModeServer,
    StorageBoardsService,
    StorageListsService,
    StorageItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
