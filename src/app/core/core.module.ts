import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { ItemsService } from './items.service'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, ItemsService]
})
export class CoreModule { }