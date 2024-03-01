import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {NgIf} from "@angular/common";
import {UserServiceService} from "../../../services/user-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showModal: boolean = false;

  constructor(private userService: UserServiceService, private router: Router) {
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }


  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
  }

  isAdmin(): boolean {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // Check if admin
    return user && user.admin;
  }

  logout() {
    this.toggleModal();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
