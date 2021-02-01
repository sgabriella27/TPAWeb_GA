import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {logging} from 'protractor';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginAdminComponent} from './pages/login-admin/login-admin.component';
import {ManageGameComponent} from './pages/manage-game/manage-game.component';
import {UpdateGameComponent} from './pages/update-game/update-game.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ManageGameHomeComponent} from './pages/manage-game-home/manage-game-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin/login',
    component: LoginAdminComponent
  },
  {
    path: 'admin/insert/game',
    component: ManageGameComponent
  },
  {
    path: 'admin/update/game/:id',
    component: UpdateGameComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/manage/game',
    component: ManageGameHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
