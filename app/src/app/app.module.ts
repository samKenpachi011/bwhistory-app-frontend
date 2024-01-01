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
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { CultureListComponent } from './components/culture/culture-list/culture-list.component';
import { CultureCreateComponent } from './components/culture/culture-create/culture-create.component';
import { CultureDetailComponent } from './components/culture/culture-detail/culture-detail.component';
import { CultureComponent } from './components/culture/culture-component';


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
    EthnicGroupDetailComponent,
    CultureComponent,
    CultureListComponent,
    CultureCreateComponent,
    CultureDetailComponent
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
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTabsModule,

    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000,
      preventDuplicates: true,
    }),
    SweetAlert2Module.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    httpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
