import { Component } from '@angular/core';
import { CredentialsDto, UserServiceService } from "../../../services/user-service.service";
import { Router } from '@angular/router';
import {Company} from "../../../models/company";
import {Team} from "../../../models/team";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: CredentialsDto = { username: '', password: '' };
  loginError: boolean = false;

  constructor(private userService: UserServiceService, private router: Router) {
  }

  login() {
    this.userService.login(this.credentials).subscribe(
      (user: any) => {
        console.log(user)
        // Save user info to local storage
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          username: user.username,
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
          email: user.email,
          active: user.active,
          status: user.status,
          admin: user.admin,
          isLoggedIn: true
        }));

        // Extract companies and teams data
        const companies: Company[] | undefined = user.companies;
        const teams: Team[] | undefined = user.teams;

        // Save companies and teams data to local storage separately
        localStorage.setItem('companies', JSON.stringify(companies));
        localStorage.setItem('teams', JSON.stringify(teams));

        // Navigate based on user role
        if (user.admin) {
          this.router.navigate(['/companies']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 5000);
      }
    );
  }
}
