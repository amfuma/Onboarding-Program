package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;

	
	@GetMapping("/{companyId}/active-users")
    public Set<FullUserDto> getAllActiveUsers(@PathVariable Long companyId) {
        return companyService.getAllActiveUsers(companyId);
    }

    @GetMapping("/{companyId}/total-users")
    public Set<FullUserDto> getAllTotalUsers(@PathVariable Long companyId) {
        return companyService.getAllTotalUsers(companyId);
    }
	
	@GetMapping("/{companyId}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long companyId) {
        return companyService.getAllAnnouncements(companyId);
    }
	
    @PostMapping("/{companyId}/announcements")
    public AnnouncementDto createAnnouncement(@PathVariable Long companyId, @RequestBody AnnouncementDto announcementDto) {
        return companyService.createAnnouncement(companyId, announcementDto);
    }
    
	@GetMapping("/{companyId}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long companyId) {
        return companyService.getAllTeams(companyId);
    }

    @PostMapping("/{companyId}/teams")
    public TeamDto createTeam(@PathVariable Long companyId, @RequestBody TeamDto teamDto) {
        return companyService.createTeam(companyId, teamDto);

    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects")
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
        return companyService.getAllProjects(companyId, teamId);
	}

    @GetMapping("/{companyId}/teams/{teamId}")
    public TeamDto getTeamById(@PathVariable Long companyId, @PathVariable Long teamId) {
        return companyService.getTeamById(companyId, teamId);
    }
    
    // ////////////////////////////

    // @GetMapping
    // public Set<CompanyDto> getAllCompanies() {
    //     return companyService.getAllCompanies();
    // }
    
    // @GetMapping("/{companyId}")
    // public CompanyDto getCompanyById(@PathVariable Long companyId) {
    //     return companyService.getCompanyById(companyId);
    // }
    
    // @PatchMapping("/{companyId}")
    // public CompanyDto updateCompany(@PathVariable Long companyId, @RequestBody CompanyDto companyDto) {
    //     return companyService.updateCompany(companyId, companyDto);
    // }
    
    // @DeleteMapping("/{companyId}")
    // public CompanyDto deleteCompany(@PathVariable Long companyId) {
    //     return companyService.deleteCompany(companyId);
    // }

    // @PostMapping
    // public CompanyDto createCompany(@RequestBody CompanyDto companyDto) {
    //     return companyService.createCompany(companyDto);
    // }

    // ///////////////////////////////////////

    // @GetMapping("/{companyId}/announcements/{announcementId}")
    // public AnnouncementDto getAnnouncementById(@PathVariable Long companyId, @PathVariable Long announcementId) {
    //     return companyService.getAnnouncementById(companyId, announcementId);
    // } 
    
    // @PatchMapping("/{companyId}/announcements/{announcementId}")
    // public AnnouncementDto updateAnnouncement(@PathVariable Long companyId, @PathVariable Long announcementId, @RequestBody AnnouncementDto announcementDto) {
    //     return companyService.updateAnnouncement(companyId, announcementId, announcementDto);
    // }
    
    // @DeleteMapping("/{companyId}/announcements/{announcementId}")
    // public AnnouncementDto deleteAnnouncement(@PathVariable Long companyId, @PathVariable Long announcementId) {
    //     return companyService.deleteAnnouncement(companyId, announcementId);
    // }

    // ////////////////////////////////////////

    // @PatchMapping("/{companyId}/teams/{teamId}")
    // public TeamDto updateTeam(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody TeamDto teamDto) {
    //     return companyService.updateTeam(companyId, teamId, teamDto);
    // }

    // @DeleteMapping("/{companyId}/teams/{teamId}")
    // public TeamDto deleteTeam(@PathVariable Long companyId, @PathVariable Long teamId) {
    //     return companyService.deleteTeam(companyId, teamId);
    // }

    // //////////////////////////////////////////

    // @PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
    // public ProjectDto updateProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId, @RequestBody ProjectDto projectDto) {
    //     return companyService.updateProject(companyId, teamId, projectId, projectDto);
    // }

    // @DeleteMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
    // public ProjectDto deleteProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId) {
    //     return companyService.deleteProject(companyId, teamId, projectId);
    // }

    @GetMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
    public ProjectDto getProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId) {
        return companyService.getProject(companyId, teamId, projectId);
    }

    @PostMapping("/{companyId}/teams/{teamId}/projects")
    public ProjectDto createProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody ProjectDto projectDto) {
        return companyService.createProject(companyId, teamId, projectDto);
    }

    @PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
    public ProjectDto updateProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId, @RequestBody ProjectDto projectDto) {
        return companyService.updateProject(companyId, teamId, projectId, projectDto);
    }



}
