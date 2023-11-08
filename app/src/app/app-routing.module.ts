import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { EthnicGroupComponent } from './components/ethnic-group/ethnic-group-component';
import { EthnicGroupListComponent } from './components/ethnic-group/ethnic-group-list/ethnic-group-list.component';

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
    path:'dashboard', component: DashboardComponent
    //  canActivate:[authGuard]
  },
  {
    path: 'ethnic-groups',
    component: EthnicGroupComponent,
    children: [
      {
        path: 'list',
        component: EthnicGroupListComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
