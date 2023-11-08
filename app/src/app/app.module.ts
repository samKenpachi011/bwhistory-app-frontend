import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AngularMaterialModule } from './angular-material.module';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { httpInterceptorProvider } from './http-interceptors';
import { RegisterComponent } from './components/register/register.component';
import { AppNavComponent } from './shared/app-nav/app-nav.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EthnicGroupComponent } from './components/ethnic-group/ethnic-group-component';
import { EthnicGroupListComponent } from './components/ethnic-group/ethnic-group-list/ethnic-group-list.component';
import { EthnicGroupCreateComponent } from './components/ethnic-group/ethnic-group-create/ethnic-group-create.component';
import { EthnicGroupDetailComponent } from './components/ethnic-group/ethnic-group-detail/ethnic-group-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    AppNavComponent,
    EthnicGroupComponent,
    EthnicGroupListComponent,
    EthnicGroupCreateComponent,
    EthnicGroupDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000,
      preventDuplicates: true,
    }),
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    httpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
