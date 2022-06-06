import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from "./layout/layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/user/login/login.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ColorsComponent } from './pages/colors/colors.component';
import { ColorListComponent } from './pages/colors/color-list/color-list.component';
import { ColorDetailComponent } from './pages/colors/color-detail/color-detail.component';
import { AllowedRolesDirective } from './directives/allowed-roles.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent,
    ColorsComponent,
    ColorListComponent,
    ColorDetailComponent,
    AllowedRolesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
