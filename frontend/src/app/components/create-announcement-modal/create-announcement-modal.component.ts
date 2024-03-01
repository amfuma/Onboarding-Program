import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AnnouncementService} from "../../../services/announcement.service";
import {AnnouncementDto} from "../../announcement-dto";
import {HomeComponent} from "../home/home.component";
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-announcement-modal',
  templateUrl: './create-announcement-modal.component.html',
  styleUrls: ['./create-announcement-modal.component.css']
})
export class CreateAnnouncementModalComponent {
  @Input() showModal: boolean = false;
  @Input() authorName: string = '';
  announcementText: string = '';
  announcementTitle: string = '';

  constructor(private router: Router, private announcementService: AnnouncementService, private home: HomeComponent, private location: Location) {
  }

  closeModal() {
    this.showModal = false;
    this.announcementText = '';
    this.announcementTitle = '';
  }

  openModal(): boolean {
    return this.showModal = !this.showModal;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  submitAnnouncement() {

    const selectedCompanyString = localStorage.getItem('selectedCompany');
    if (!selectedCompanyString) {
      throw new Error('selectedCompany data not found in local storage.');
    }
    const selectedCompany = JSON.parse(selectedCompanyString);
    const companyId: number = selectedCompany.id;

    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      throw new Error('currentUser data not found in local storage.');
    }
    const currentUser = JSON.parse(currentUserString);
    const announcementDto: AnnouncementDto = {
      title: this.announcementTitle,
      date: new Date(),
      message: this.announcementText,
      author: {
        id: currentUser.id,
        profile: currentUser.profile,
        admin: currentUser.admin,
        active: currentUser.active,
        status: currentUser.status
      }
    }

    this.announcementService.saveAnnouncement(companyId, announcementDto).subscribe(
      (response) => {
        console.log('Announcement saved:', response);
        this.closeModal();
        this.location.go('/home');
        window.location.reload();

      },
      (error) => {
        console.error('Error saving announcement:', error);
        this.closeModal();
      }
    );
  }
}
