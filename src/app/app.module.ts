import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AuthComponent } from './auth/auth.component'
import { RouterModule, Routes } from '@angular/router';
import { GiftsListComponent } from './gifts-list/gifts-list.component';
import { UploadGiftComponent } from './upload-gift/upload-gift.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



const appRoutes: Routes = [
  { path: 'gifts', component: GiftsListComponent },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'admin',
    component: UploadGiftComponent,
  },
  { path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GiftsListComponent,
    UploadGiftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MDBBootstrapModule.forRoot()
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
