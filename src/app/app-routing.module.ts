import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'articles', component: ViewPageComponent },
  { path: 'news', component: ViewPageComponent },
  { path: 'articles/:id/details', component: DetailsPageComponent },
  { path: 'news/:id/details', component: DetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
