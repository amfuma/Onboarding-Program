import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Company} from "../models/company";
import {Observable, of, Timestamp} from "rxjs";
import {FullUserDto} from "../app/full-user-dto";


@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  private companyUrl ='http://localhost:8080/company';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    // User must be logged in to see this page
    // gets companies from local storage saved during login
    const companiesString = localStorage.getItem('companies');
    if (companiesString) {
      const companies: Company[] = JSON.parse(companiesString);
      return of(companies); // Return companies
    } else {
      return of([]); // return nothing if nothing is found
    }
  }

  getAllTotalUsers(companyId: number): Observable<FullUserDto[]> {
    const url = `${this.companyUrl}/${companyId}/total-users`;
    return this.http.get<FullUserDto[]>(url);
  }
}
