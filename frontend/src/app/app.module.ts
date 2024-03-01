import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersRegistryComponent } from './components/users-registry/users-registry.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateProjectModalComponent } from './components/create-project-modal/create-project-modal.component';
import { CreateTeamModalComponent } from './components/create-team-modal/create-team-modal.component';
import { CreateAnnouncementModalComponent } from './components/create-announcement-modal/create-announcement-modal.component';
import { EditProjectModalComponent } from './components/edit-project-modal/edit-project-modal.component';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { LinkButtonComponent } from './components/link-button/link-button.component';
import { ModalComponent } from './modals/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompaniesComponent,
    HomeComponent,
    TeamsComponent,
    ProjectsComponent,
    UsersRegistryComponent,
    NavbarComponent,
    CreateProjectModalComponent,
    CreateTeamModalComponent,
    CreateAnnouncementModalComponent,
    EditProjectModalComponent,
    AddUserModalComponent,
    CompaniesComponent,
    LinkButtonComponent,
    ModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
