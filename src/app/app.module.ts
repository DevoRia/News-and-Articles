import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

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

@NgModule({
  declarations: [
    AppComponent,
    ViewPageComponent,
    DetailsPageComponent,
    ContentCardComponent,
    CreationPopupComponent,
    CreationPopupTemplateComponent,
  ],
  imports: [
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
    SelectTypeService,
    { provide: 'FIREBASE_LINK', useValue: 'https://viseventest-709db.firebaseio.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
