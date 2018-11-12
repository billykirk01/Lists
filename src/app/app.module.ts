import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ItemsComponent } from './items/items.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NewListComponent } from './new-list/new-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ListMenuComponent } from './list-menu/list-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ToolbarComponent,
    InputFieldComponent,
    ItemsComponent,
    UserMenuComponent,
    NewListComponent,
    ListMenuComponent
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
    MatBottomSheetModule
  ],
  entryComponents: [
    NewListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
