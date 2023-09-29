import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo: '', pathMatch:'full'},
  {
    path:'', component: HomeComponent,
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'dashboard', component: DashboardComponent, canActivate:[authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
