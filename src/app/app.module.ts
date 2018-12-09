import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';
import { FriendsManagerComponent } from './friends-manager/freinds-manager.component';
import { AddFriendComponent } from './friends-manager/add-friend/add-friend.component';

import { ListMenuComponent } from './toolbar/list-menu/list-menu.component';
import { NewListComponent } from './toolbar/new-list/new-list.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { RenameListComponent } from './list-manager/rename-list/rename-list.component';
import { ShareListComponent } from './list-manager/share-list/share-list.component';


import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { InputFieldComponent } from './items/input-field/input-field.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ToolbarComponent,
    InputFieldComponent,
    ItemsComponent,
    UserMenuComponent,
    NewListComponent,
    ListMenuComponent,
    ListManagerComponent,
    RenameListComponent,
    FriendsManagerComponent,
    AddFriendComponent,
    ShareListComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatListModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule

  ],
  entryComponents: [
    NewListComponent,
    ListManagerComponent,
    RenameListComponent,
    FriendsManagerComponent,
    AddFriendComponent,
    ShareListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
