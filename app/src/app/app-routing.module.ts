import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { EthnicGroupComponent } from './components/ethnic-group/ethnic-group-component';
import { EthnicGroupListComponent } from './components/ethnic-group/ethnic-group-list/ethnic-group-list.component';
import { EthnicGroupDetailComponent } from './components/ethnic-group/ethnic-group-detail/ethnic-group-detail.component';
import { CultureComponent } from './components/culture/culture-component';
import { CultureListComponent } from './components/culture/culture-list/culture-list.component';
import { CultureDetailComponent } from './components/culture/culture-detail/culture-detail.component';

const routes: Routes = [
  {path:'', redirectTo: '', pathMatch:'full'},
  {
    path:'', component: HomeComponent,
  },
  {
    path:'login', component: LoginComponent
  },
  { path:'register', component: RegisterComponent},
  {
    path:'dashboard', component: DashboardComponent,
      canActivate:[authGuard]
  },
  {
    path: 'ethnic-groups',
    component: EthnicGroupComponent,
    canActivateChild:[authGuard],
    children: [
      {
        path: 'list',
        component: EthnicGroupListComponent,
      },
      {
        path: 'details',
        component: EthnicGroupDetailComponent,
        canActivateChild:[authGuard],
      }

    ]
  },
  {
    path: 'culture',
    component: CultureComponent,
    canActivateChild:[authGuard],
    children: [
      {
        path: 'list',
        component: CultureListComponent,
      },
      {
        path: 'details',
        component: CultureDetailComponent,
        canActivateChild:[authGuard],
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
