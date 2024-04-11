import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddKindergardenComponent } from './add-kindergarden/add-kindergarden.component';
import { KindergardenDetailComponent } from './kindergarden-detail/kindergarden-detail.component';
import { KindergardenListComponent } from './kindergarden-list/kindergarden-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'add-kindergarden', component: AddKindergardenComponent },
  { path: 'kindergarden-detail/:id', component: KindergardenDetailComponent },
  { path: 'kindergarden-list', component: KindergardenListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
