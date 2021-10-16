import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PipesModule} from "./core/pipes/pipes.module";
import {AuthenticationModule} from "./core/authentication/authentication.module";
import {MaterialModule} from "./core/material-ui/material-ui.module";
import { LoginComponent } from './modules/public/login/login.component';
import { RegisterComponent } from './modules/public/register/register.component';
import { CarsListComponent } from './modules/private/cars/cars-list/cars-list.component';
import { CarsFormComponent } from './modules/private/cars/cars-form/cars-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AreYouSureComponent} from "./core/shared/components/are-you-sure.component";
import {UIComponentsService} from "./core/shared/services/ui-components.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CarsListComponent,
    CarsFormComponent,
    AreYouSureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [
    UIComponentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
