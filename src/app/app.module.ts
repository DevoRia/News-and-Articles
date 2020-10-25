import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { CreationPopupComponent, CreationPopupTemplateComponent } from './components/creation-popup/creation-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FirebaseService} from './services/firebase.service';
import {HttpClientModule} from '@angular/common/http';
import {SelectTypeService} from './services/selectType.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginToggleComponent } from './components/login-toggle/login-toggle.component';
import {AuthService} from './services/auth.service';
import {ErrorNotifierService} from './services/error-notifier.service';
import {AuthGuard} from './services/auth.guard';

const config = {
  apiKey: 'AIzaSyBy6Ch0l68UapGIrKjOZAsJ0OyeNUbxSKY',
  authDomain: 'https://viseventest-709db.firebaseapp.com',
  projectId: 'viseventest-709db',
  storageBucket: 'gs://viseventest-709db.appspot.com',
};

@NgModule({
  declarations: [
    AppComponent,
    ViewPageComponent,
    DetailsPageComponent,
    ContentCardComponent,
    CreationPopupComponent,
    CreationPopupTemplateComponent,
    LoginPageComponent,
    LoginToggleComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    FirebaseService,
    AuthService,
    ErrorNotifierService,
    AuthGuard,
    SelectTypeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
