import {Component, OnInit} from '@angular/core';
import {FullUserDto} from "../../full-user-dto";
import {CompanyServiceService} from "../../../services/company-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-registry',
  templateUrl: './users-registry.component.html',
  styleUrls: ['./users-registry.component.css']
})
export class UsersRegistryComponent implements OnInit {
  users: FullUserDto[] = [];
  showModal: boolean = false;

  constructor(private companyService: CompanyServiceService, private router: Router) { }

  ngOnInit(): void {
    let companyId: number;

    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      throw new Error('currentUser data not found in local storage.');
    }
    const currentUser = JSON.parse(currentUserString);
    const isAdmin = currentUser.admin;

    if (isAdmin) {
      const selectedCompanyString = localStorage.getItem('selectedCompany');
      if (!selectedCompanyString) {
        throw new Error('company data not found in local storage');
      }
      const selectedCompany = JSON.parse(selectedCompanyString);
      companyId = selectedCompany.id;
      this.companyService.getAllTotalUsers(companyId).subscribe(
        (data: FullUserDto[]) => {
          this.users = data;
          console.log(this.users);
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      const companiesString = localStorage.getItem('companies');
      if (!companiesString) {
        throw new Error('Companies data not found in local storage.');
      }
      const companies = JSON.parse(companiesString);
      companyId = companies[0].id;
      console.log(companyId)
      this.companyService.getAllTotalUsers(companyId).subscribe(
        (data: FullUserDto[]) => {
          this.users = data;
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }


  getUserTeam(user: any): string {
    if (user && user.teams) {
      return user.teams.map((team: { name: any; }) => team.name).join(', ');
    }
    return '';
  }

  openAddUserModal() {
    this.showModal = true;
  }

  closeAddUserModal() {
    this.showModal = false;
  }
}
