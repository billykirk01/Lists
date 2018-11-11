import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { ItemsComponent } from './items/items.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NewListComponent } from './new-list/new-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ToolbarComponent,
    InputFieldComponent,
    DropdownMenuComponent,
    ItemsComponent,
    UserMenuComponent,
    NewListComponent
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
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
