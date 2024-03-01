import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl: string;
  constructor(private http: HttpClient) {
    this.projectsUrl = 'http://localhost:8080/projects';
   }

   public findAll(): Observable<Project[]> {
    return this.http.get<Project []>(this.projectsUrl);
   }

   public findProjects(companyId: number, teamId:number): Observable<Project[]> {
    console.log('fetching projects...');
    return this.http.get<Project[]> (`http://localhost:8080/company/${companyId}/teams/${teamId}/projects`);
   }
   public save(companyId: number, teamId:number, ProjectDto: any) {
    return this.http.post<Project>(`http://localhost:8080/company/${companyId}/teams/${teamId}/projects`,ProjectDto);
   }

   public update(companyId: number, teamId:number, projectId: number, ProjectDto: any) {
    console.log('in the project service method');
    return this.http.patch<Project>(`http://localhost:8080/company/${companyId}/teams/${teamId}/projects/${projectId}`,ProjectDto);
   }
}
