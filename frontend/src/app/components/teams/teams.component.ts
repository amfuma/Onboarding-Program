import { Component } from '@angular/core';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

import { Project } from 'src/models/project';
import { OnInit } from '@angular/core';

import { TeamService } from 'src/services/team.service';
import { ModalsService } from 'src/services/modal.service';
import { UserServiceService } from 'src/services/user-service.service';
import { Location } from '@angular/common';

import { map } from 'rxjs';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  company_id: number = 0;

  teams?: Team[];
  workerTeams?: Team[];

  users?: User[];

  newTeamName?: string;
  newTeamDescription?: string;
  usersToAddToTeam?: User[];
  selectedUserIds?: number[];
  selectedUsers?: User[];

  //fields for current user
  currentActive?: boolean;
  currentAdmin?: boolean;
  currentFirstName?: string;
  currentId?: number;
  currentLastName?: string;
  currentStatus?: string;
  currentLoggedIn?: boolean;
  companyId?: number;

  constructor(
    private teamService: TeamService,
    protected modalService: ModalsService,
    private userService: UserServiceService,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit() {
    this.initializeCurrentUser();
    console.log('companyId', this.companyId);
    let t = this.testService();
    this.getUsers();
  }

  getWorkerTeams(teams: Team[]): Team[] {
    let tempTeam: Team[] = [];
    for (let team of teams) {
      if (team.teammates) {
        const isUserInTeam = team.teammates.some(
          (user) => user.id === this.currentId
        );
        if (isUserInTeam) {
          tempTeam.push(team);
        }
      }
    }
    return tempTeam;
  }

  initializeCurrentUser() {
    const currentUserString = localStorage.getItem('currentUser');
    let currentCompanyString = localStorage.getItem('selectedCompany');
    let currentCompanyWorkerString = localStorage.getItem('companies');
    console.log('companies', currentCompanyWorkerString);
    console.log('current user', currentUserString);

    //this for an admin user
    if (currentUserString && currentCompanyString) {
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
    if (currentUserString && currentCompanyWorkerString) {
      console.log('this is a standard user');
      const userDetails = JSON.parse(currentUserString);
      const workerDetail = JSON.parse(currentCompanyWorkerString);

      this.currentActive = userDetails.active;
      this.currentAdmin = userDetails.admin;
      this.currentFirstName = userDetails.firstName;
      this.currentId = userDetails.id;
      this.currentLoggedIn = userDetails.isLoggedIn;
      this.currentLastName = userDetails.lastName;
      this.currentStatus = userDetails.status;
      this.companyId = workerDetail[0].id;

      console.log('the company id is', this.companyId);
      console.log('user is admin', this.currentAdmin);
    }
  }
  getTeams() {
    this.teamService.getTeamsByCompanyId(this.company_id).subscribe({
      next: (data) => {
        this.teams = data;
        console.log('teams', data);
      },
      error: (error) =>
        console.error(
          'There was a problem getting company teams',
          error.message
        ),
    });
    console.log(this.teams);
  }

  //this is just a test method
  testService() {
    if (this.companyId) {
      console.log('getting the teams');
      this.teamService.getTestTeam(this.companyId).subscribe({
        next: (data) => {
          this.teams = this.conformToTeam(data);
          this.workerTeams = this.getWorkerTeams(this.conformToTeam(data));

          console.log('worker teams', this.workerTeams);
          console.log('got the teams', this.teams);
        },
        error: (error) => {
          console.error('There was a problem getting company teams', error);
        },
      });
    }
  }

  getUsers() {
    this.userService.findCompanyActiveUsers().subscribe({
      next: (data) => {
        this.users = this.conformToUsers(data);
        console.log('here are the users', this.users);
      },
      error: (error) => {
        console.error('there was a problem getting the users', error);
      },
    });
  }

  private conformToTeam(data: any[]): Team[] {
    return data.map((team) => {
      const conformedTeam = new Team();
      conformedTeam.id = team.id;
      conformedTeam.name = team.name;
      conformedTeam.description = team.description;
      conformedTeam.teammates = team.teammates.map((teammate: any) => {
        const user = new User();

        user.id = teammate.id;
        user.firstName = teammate.profile.firstName;
        user.lastName = teammate.profile.lastName;
        user.email = teammate.profile.email;
        user.phone = teammate.profile.phone;
        user.active = teammate.active;
        user.admin = teammate.admin;
        user.status = teammate.status;
        return user;
      });
      return conformedTeam;
    });
  }
  private conformToUsers(data: any[]): User[] {
    return data.map((user) => {
      const conformedUser = new User();

      conformedUser.id = user.id;
      conformedUser.firstName = user.profile.firstName;
      conformedUser.lastName = user.profile.lastName;
      conformedUser.email = user.profile.email;
      conformedUser.phone = user.profile.phone;
      conformedUser.active = user.active;
      conformedUser.admin = user.admin;
      conformedUser.status = user.status;

      return conformedUser;
    });
  }

  createTeam() {
    console.log(this.newTeamName);
    console.log(this.newTeamDescription);
    const TeamDto = {
      id: this.companyId,
      name: this.newTeamName,
      description: this.newTeamDescription,
      teammates: this.selectedUsers?.map((user) => ({
        id: user.id,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
        admin: user.admin,
        active: user.active,
        status: user.status,
      })),
      author: {
        id: 23,
        profile: {
          firstName: 'Logan',
          lastName: 'Roy',
          email: 'lroy@email.com',
          phone: '(555) 555-5555',
        },
        admin: true,
        active: true,
      },
    };

    if (this.companyId) {
      this.teamService.saveTeam(this.companyId, TeamDto).subscribe({
        next: (response) => {
          console.log('Team saved successfully', response);
        },
        error: (error) => {
          console.error('Error saving team', error);
        },
        complete: () => console.log('Completed'),
      });
    }
    //auto reload
    this.location.replaceState('/teams');
    window.location.reload();
  }

  openModal() {
    this.modalService.open('modal-add-team');
  }

  closeModal() {
    this.modalService.close();
  }

  clearSelection() {
    this.selectedUsers = [];
  }

  goToProjects(teamId: number | undefined) {
    if (teamId !== undefined) {
      this.router.navigate(['/projects', teamId.toString()]);
    } else {
      console.error('Team ID is undefined. Cannot navigate to projects.');
    }
  }
}
