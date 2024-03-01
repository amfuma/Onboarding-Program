import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announcement} from 'src/models/announcement';

class AnnouncementDto {
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcementsUrl = 'http://localhost:8080/company';


  constructor(private http: HttpClient) {
  }


  public findAll(): Observable<Announcement[]> {
    let companyId: number;

    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      throw new Error('Current user data not found in local storage.');
    }
    const currentUser = JSON.parse(currentUserString);
    const isAdmin = currentUser.admin;

    if (isAdmin) {
      const selectedCompanyString = localStorage.getItem('selectedCompany');
      if (!selectedCompanyString) {
        throw new Error('Selected company data not found in local storage.');
      }
      const selectedCompany = JSON.parse(selectedCompanyString);
      companyId = selectedCompany.id;
    } else {
      const companiesString = localStorage.getItem('companies');
      if (!companiesString) {
        throw new Error('Companies data not found in local storage.');
      }
      const companies = JSON.parse(companiesString);
      companyId = companies[0].id;
    }

    const url = `${this.announcementsUrl}/${companyId}/announcements`;
    return this.http.get<Announcement[]>(url);
  }

  public saveAnnouncement(companyId: number, announcement: AnnouncementDto): Observable<Announcement> {
    const url = `${this.announcementsUrl}/${companyId}/announcements`;
    return this.http.post<Announcement>(url, announcement);
  }
}
