import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ManageGameComponent } from './pages/manage-game/manage-game.component';
import { UpdateGameComponent } from './pages/update-game/update-game.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { ManageGameHomeComponent } from './pages/manage-game-home/manage-game-home.component';
import { SquareComponent } from './components/square/square.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    SearchbarComponent,
    LoginAdminComponent,
    ManageGameComponent,
    UpdateGameComponent,
    AdminComponent,
    AdminNavbarComponent,
    ManageGameHomeComponent,
    SquareComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GraphQLModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
