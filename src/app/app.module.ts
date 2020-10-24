import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ContentCardComponent } from './components/content-card/content-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewPageComponent,
    DetailsPageComponent,
    ContentCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
