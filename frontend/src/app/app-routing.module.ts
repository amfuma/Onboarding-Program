import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth.guard";
import {ProjectsComponent} from "./components/projects/projects.component";
import {HomeComponent} from "./components/home/home.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {UsersRegistryComponent} from "./components/users-registry/users-registry.component";
import {CompaniesComponent} from "./components/companies/companies.component";

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'projects/:teamId', component: ProjectsComponent,  canActivate: [AuthGuard] },
  { path: 'companies', component: CompaniesComponent,  canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent,  canActivate: [AuthGuard] },
  { path: 'users-registry', component: UsersRegistryComponent,  canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
