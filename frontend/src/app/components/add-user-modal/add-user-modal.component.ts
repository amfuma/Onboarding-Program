import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { ProfileDto } from '../../profile-dto';
import { UserRequestDto } from '../../user-request-dto';
import { BasicUserDto } from '../../basic-user-dto';
import { FullUserDto } from '../../full-user-dto';
import { User } from '../../../models/user';
import { CredentialsDto } from '../../credentials-dto';
import { CompanyDto } from '../../company-dto';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  makeAdmin: boolean = false;

  // Properties to store user input
  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  companyId: number | undefined;

  constructor(private userService: UserServiceService) {}

  onCloseModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) {
      console.error('Current user data not found in local storage.');
      return;
    }
    const currentUser: User = JSON.parse(currentUserJson);

    const currentCompany = localStorage.getItem('companies');
    if (!currentCompany) {
      console.error('Current company data not found in local storage.');
      return;
    }
    const currentCompanyJson = JSON.parse(currentCompany);

    const credentials: CredentialsDto = {
      username: this.username,
      password: this.password,
    };

    const profile: ProfileDto = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
    };

    const companies: CompanyDto = {
      description: currentCompanyJson[0].description,
      name: currentCompanyJson[0].name,
      teams: currentCompanyJson[0].teams,
      employees: currentCompanyJson[0].employees,
      id: currentCompanyJson[0].id,
    };

    const userRequest: UserRequestDto = {
      credentials: credentials,
      companies: companies,
      profile,

      admin: this.makeAdmin,
      companyId: companies.id,
      basicUserDto: {
        // @ts-ignore
        id: currentUser.id,

        // @ts-ignore
        admin: currentUser.admin,
        // @ts-ignore
        active: currentUser.active,
        // @ts-ignore
        status: currentUser.status,
      },
    };

    this.userService.save(userRequest).subscribe(
      (response: any) => {
        console.log('here');
        window.location.reload();
      },
      (error: any) => {
        console.error('Error saving user:', error);
      }
    );
  }
}
