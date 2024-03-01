import { Component } from '@angular/core';
import { Timestamp } from 'rxjs';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,Subscription, interval  } from 'rxjs';

import { Project } from 'src/models/project';
import { Team } from 'src/models/team';

import { TeamService } from 'src/services/team.service';
import { ProjectService } from 'src/services/project.service';
import { ModalsService } from 'src/services/modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit,OnDestroy{

  projects?: Project[];
  team?: Team[];
  teamDto: any;
  thisProjectId?: number;
  teamName?: string;

  lastEdited?: Timestamp<number>;

  teamIdParam: string | null = null;
  teamId: number | null = null;
  private routeSub!: Subscription;

  //fields for a new project
  newProjectName?: string;
  newProjectDescription?: string;

  //fields for edited project

  //fields for current user
  currentActive?: boolean;
  currentAdmin?: boolean;
  currentFirstName?: string;
  currentId?: number;
  currentLastName?: string;
  currentStatus?: string;
  currentLoggedIn?: boolean;
  companyId?: number;

  modalData: any  = {};
  private updateSubscription: Subscription | undefined


  constructor(private projectService: ProjectService, 
    protected modalService: ModalsService,
    private activatedRoute: ActivatedRoute, 
    private teamService: TeamService,
    private router: Router,
    private location: Location){}

  ngOnInit(): void {
    
    this.initializeCurrentUser();

    this.routeSub = this.activatedRoute.paramMap.subscribe(params => {
      this.teamIdParam = params.get('teamId');
      if(this.teamIdParam){
        this.teamId =+ this.teamIdParam;
      }
      else {
        this.teamId = null;
      }
      
    });

    //autorefresh
  
    //this.updateSubscription = interval(3000).subscribe((val)=> {this.getProjects()});

    this.getProjects();
    this.getTeamDto();

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getProjects(){
    console.log('team id before the if statement is ',this.teamId);
    console.log('company id before the if state is ', this.companyId);

    if (this.teamId !== null && this.companyId !== undefined){
      console.log('team id is', this.teamId);
      this.projectService.findProjects(this.companyId,this.teamId).subscribe({
        next: (data) => {
          this.projects = data;
          console.log(this.projects); 
          
        },
        error: (error) => console.error('There was a problem getting company projects', error.message)
      });
    } else {
      console.error('Team ID is null, cannot fetch projects.');
    }
    
  }
  getDto(){
    
  }
  createProject()
  {
    if(this.teamId && this.companyId){
      this.projectService.save(this.companyId,this.teamId,this.createProjectDto()).subscribe({
        next: (response) => {
          console.log('project saved successfully', response);
        },
        error: (error) => {
          console.error('error saving project',error)
        }
      });

    }
     //auto reload
     console.log('reloading');
     this.location.replaceState(`/projects/${this.teamId}`);
     window.location.reload();
  }
  createProjectDto(): any {
    const projectDto = {
      id: 0,
      name: this.newProjectName,
      description: this.newProjectDescription,
      active: true,
      author: {
        id: this.currentId,
        profile: {
        firstName: this.currentFirstName,
        lastName: this.currentLastName,
        email: 'lroy@email.com',
        phone: '(555) 555-5555'
      },
        admin: this.currentAdmin,
        active: this.currentActive
      }

    }
    console.log('creat project dto', projectDto);
    return projectDto;
  }
  createEditProjectDto(): any {
    const projectDto = {
      id: this.thisProjectId,
      name: this.newProjectName,
      description: this.newProjectDescription,
      active: true,
      author: {
        id: this.currentId,
        profile: {
        firstName: this.currentFirstName,
        lastName: this.currentLastName,
        email: 'lroy@email.com',
        phone: '(555) 555-5555'
      },
        admin: this.currentAdmin,
        active: this.currentActive
      }


    }
    console.log('edit project dto', projectDto)
    return projectDto;
  }
  getTeamDto()
  {
    if(this.teamId && this.companyId){
      this.teamService.getTeamByCompanyId(this.companyId,this.teamId).subscribe({
        next: (data) => {
          this.teamDto = data;
          this.teamName = this.teamDto.name;

          console.log('team dto', this.teamDto)
        },
        error: (error) => console.error('there was a problem getting the team', error.message)
      });
    }
    
  }

  editProject(){
    if(this.teamId !== null && this.teamId !== undefined && this.thisProjectId !== null && this.thisProjectId !== undefined && this.companyId !== null && this.companyId !== undefined){
      this.projectService.update(this.companyId,this.teamId,this.thisProjectId,this.createEditProjectDto()).subscribe({
        next: (response) => {
          console.log('project update successfully', response);
        },
        error: (error) => {
          console.error('error updating project',error)
        }
      });

    }
     //auto reload
     console.log('reloading');
     this.location.replaceState(`/projects/${this.teamId}`);
     window.location.reload();
  }

  //Get current user info
  initializeCurrentUser(){
    const currentUserString = localStorage.getItem('currentUser');
    let currentCompanyString = localStorage.getItem('selectedCompany');
    let currentCompanyWorkerString = localStorage.getItem('companies');
    console.log('companies',currentCompanyWorkerString)
    console.log('current user', currentUserString)
   



    //this for an admin user
    if(currentUserString && currentCompanyString){
      const userDetails = JSON.parse(currentUserString);
      const companyDetail = JSON.parse(currentCompanyString);
      

      this.currentActive = userDetails.active;
      this.currentAdmin = userDetails.admin;
      this.currentFirstName = userDetails.firstName;
      this.currentId = userDetails.id;
      this.currentLoggedIn = userDetails.isLoggedIn;
      this.currentLastName = userDetails.lastName;
      this.currentStatus = userDetails.status;
      this.companyId = companyDetail.id;

      console.log('the company id is', this.companyId);
      console.log('user is admin', this.currentAdmin);
    }

   
    //this is for a standard user
    if(currentUserString && currentCompanyWorkerString){
      console.log('this is a standard user');
      const userDetails = JSON.parse(currentUserString);
      const workerDetail = JSON.parse(currentCompanyWorkerString);
      

      this.currentActive = userDetails.active;
      this.currentAdmin = userDetails.admin;
      this.currentFirstName = userDetails.firstName;
      this.currentId = userDetails.id;
      this.currentLoggedIn =userDetails.isLoggedIn;
      this.currentLastName = userDetails.lastName
      this.currentStatus = userDetails.status;
      this.companyId = workerDetail[0].id;

      console.log('the company id is', this.companyId);
      console.log('user is admin', this.currentAdmin);
    }
    
  }

  //modal functions
  openDescriptionModal(project: Project){
    this.modalData = {
      name: project.name,
      id: project.id,
      description: project.description,
      teammates: project.team
    }
    this.modalService.open('modal-view-project');

  }
  openModal(){
    this.modalService.open('modal-add-project');
  }
openEditModal(projectId: number | undefined){
  if (projectId){
    this.thisProjectId = projectId;
  }

  console.log('project id is', this.thisProjectId)
    this.modalService.open('modal-edit-project');
  }

  closeModal(){

    this.modalService.close();
  }

  getTeamInfo(){

  }

  
}
