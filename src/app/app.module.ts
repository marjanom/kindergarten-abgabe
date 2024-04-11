import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './dashboard/data/data.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './dashboard/button/button.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddKindergardenComponent } from './add-kindergarden/add-kindergarden.component';
import { KindergardenDetailComponent } from './kindergarden-detail/kindergarden-detail.component';
import { KindergardenListComponent } from './kindergarden-list/kindergarden-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddDataComponent,
    DataComponent,
    HeaderComponent,
    ButtonComponent,
    LoadingSpinnerComponent,
    AddKindergardenComponent,
    KindergardenDetailComponent,
    KindergardenListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
