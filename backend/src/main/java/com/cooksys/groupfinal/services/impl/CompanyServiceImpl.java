package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;

	private final ProjectRepository projectRepository;
	private final FullUserMapper fullUserMapper;
	private final BasicUserMapper basicUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	private final AnnouncementRepository announcementRepository;

	private final CompanyMapper companyMapper;
	
	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
		Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
			throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }

	private Project findProject(Long id) {
		Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
			throw new NotFoundException("A project with the provided id does not exist.");
        }
        return project.get();
    }

	private Announcement findAnnouncement(Long id) {
		Optional<Announcement> announcement = announcementRepository.findById(id);
        if (announcement.isEmpty()) {
			throw new NotFoundException("An announcement with the provided id does not exist.");
        }
        return announcement.get();
    }

	private void validateRole(BasicUserDto basicUserDto) {
		if (!basicUserDto.isAdmin()) {
			throw new NotAuthorizedException("user not authorized");
		}
	}
	
	
	@Override
	public Set<FullUserDto> getAllActiveUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<FullUserDto> getAllTotalUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}
	
	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}
	
	@Override
	public TeamDto createTeam(Long companyId, TeamDto teamDto) {

		Company company = findCompany(companyId);
		validateRole(teamDto.getAuthor());

		Team team = new Team();
		team.setCompany(company);
		team.setName(teamDto.getName());
		team.setDescription(teamDto.getDescription());

		Set<BasicUserDto> users = new HashSet<>();
		users.addAll(teamDto.getTeammates());
		team.setTeammates(basicUserMapper.requestDtosToEntities(teamDto.getTeammates()));

		return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
	}


	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.getActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}
	
	@Override
    public AnnouncementDto createAnnouncement(Long companyId, AnnouncementDto announcementDto) {
		findCompany(companyId);
		validateRole(announcementDto.getAuthor());

        if (announcementDto.getAuthor() == null) {
			throw new NotAuthorizedException("Badd credentials");
        }
        if (announcementDto.getMessage().isEmpty()) {
			throw new BadRequestException("Noo message");
        }
        Announcement a = announcementMapper.dtoToEntity(announcementDto);
        User u = new User();
		a.setCompany(findCompany(companyId));
        u.setId(a.getAuthor().getId());
        u.setProfile(a.getAuthor().getProfile());
        u.setAdmin(a.getAuthor().isAdmin());
        u.setActive(a.getAuthor().isActive());
        u.setStatus(a.getAuthor().getStatus());
        a.setAuthor(u);
        a.setMessage(announcementDto.getMessage());
        a.setTitle(announcementDto.getTitle());
        //TODO in case we need to affix title
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(a));
	}
	
		@Override
		public TeamDto getTeamById(Long companyId, Long teamId) {
			findCompany(companyId);
			Team team = findTeam(teamId);
			return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
		}

	// ////////////////////////////////////////
	
	// @Override
	// public Set<CompanyDto> getAllCompanies() {
	// 	Set<Company> listOfCompanies = new HashSet<>(companyRepository.findAll());
	// 	return companyMapper.entitiesToDtos(listOfCompanies);
	// }
	
	// @Override
	// public CompanyDto getCompanyById(Long companyId) {
	// 	return companyMapper.entityToDto(companyRepository.saveAndFlush(findCompany(companyId)));
	// }
	
	// @Override
	// public CompanyDto updateCompany(Long companyId, CompanyDto companyDto) {
	// 	Company company = findCompany(companyId);
	// 	Company updatesToCompany = companyMapper.dtoToEntity(companyDto);
	// 	if (updatesToCompany.getName() != null) {
	// 		company.setName(updatesToCompany.getName());
	// 	}
	// 	if (updatesToCompany.getDescription() != null) {
	// 		company.setDescription(updatesToCompany.getDescription());
	// 	}
	// 	return companyMapper.entityToDto(companyRepository.saveAndFlush(company));
	// }
	
	// @Override
	// public CompanyDto deleteCompany(Long companyId) {
	// 	Company company = findCompany(companyId);
	// 	for (Team t : company.getTeams()) {
	// 		for (Project p : t.getProjects()) {
	// 			p.setDeleted(true);
	// 		}
	// 		projectRepository.saveAllAndFlush(t.getProjects());
	// 		t.setDeleted(true);
	// 	}
	// 	teamRepository.saveAllAndFlush(company.getTeams());
	// 	return companyMapper.entityToDto(companyRepository.saveAndFlush(company));
	// }
	
	// @Override
	// public CompanyDto createCompany(CompanyDto companyDto) {
	// 	Company company = companyMapper.dtoToEntity(companyDto);
	// 	return companyMapper.entityToDto(companyRepository.saveAndFlush(company));
	// }

	// ///////////////////////////////////////////
	
	// @Override
	// public AnnouncementDto getAnnouncementById(Long companyId, Long announcementId) {
	// 	findCompany(companyId);
	// 	return announcementMapper.entityToDto(announcementRepository.saveAndFlush(findAnnouncement(announcementId)));
	// }
	
	// @Override
	// public AnnouncementDto updateAnnouncement(Long companyId, Long announcementId, AnnouncementDto announcementDto) {
	// 	findCompany(companyId);
	// 	Announcement announcement = findAnnouncement(announcementId);
	// 	Announcement updatesToAnnouncement = announcementMapper.dtoToEntity(announcementDto);
	// 	if (updatesToAnnouncement.getTitle() != null) {
	// 		announcement.setTitle(updatesToAnnouncement.getTitle());
	// 	}
	// 	if (updatesToAnnouncement.getMessage() != null) {
	// 		announcement.setMessage(updatesToAnnouncement.getMessage());
	// 	}
	// 	return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
		
	// }
	
	// @Override
	// public AnnouncementDto deleteAnnouncement(Long companyId, Long announcementId) {
	// 	findCompany(companyId);
	// 	Announcement announcement = findAnnouncement(announcementId);
	// 	announcement.setDeleted(true);
	// 	return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
	// }

	// //////////////////////////////////
	
	// @Override
	// public TeamDto updateTeam(Long companyId, Long teamId, TeamDto teamDto) {
	// 	Team team = findTeam(teamId);
	// 	Team updatesToTeam = teamMapper.dtoToEntity(teamDto);
	// 	if (updatesToTeam.getName() != null) {
	// 		team.setName(teamDto.getName());
	// 	}
	// 	if (updatesToTeam.getDescription() != null) {
	// 		team.setDescription(teamDto.getDescription());
	// 	}

//		Set<BasicUserDto> users = new HashSet<>();
//		users.addAll(teamDto.getTeammates());
//		team.setTeammates(basicUserMapper.requestDtosToEntities(teamDto.getTeammates()));

	// 	// if (updatesToTeam.getTeammates() != null) {
	// 	// 	team.setTeammates(teamDto.getTeammates());
	// 	// } entity mismatch user/basicuser
	// 	return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
	// }
	
	// @Override
	// public TeamDto deleteTeam(Long companyId, Long teamId) {
	// 	findCompany(companyId);
	// 	Team team = findTeam(teamId);
	// 	for (Project p : team.getProjects()) {
	// 		p.setDeleted(true);
	// 	}
	// 	projectRepository.saveAllAndFlush(team.getProjects());
	// 	team.setDeleted(true);
	// 	return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
	// }

	// /////////////////////////////////////////

	// @Override
	// public ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto) {
	// 	findCompany(companyId);
	// 	findTeam(teamId);
	// 	Project project = findProject(projectId);
	// 	Project updatesForProject = projectMapper.dtoToEntity(projectDto);
	// 	if (updatesForProject.getName() != null) {
	// 		project.setName(projectDto.getName());
	// 	}
	// 	if (updatesForProject.getDescription() != null) {
	// 		project.setDescription(projectDto.getDescription());
	// 	}
	// 	if (updatesForProject.getActive() != null) {
	// 		project.setActive(projectDto.isActive());
	// 	}
	// 	//TODO active was changed to an object along with the project entity to check if it's passed in
	// 	if (updatesForProject.getTeam() != null) {
	// 		project.setTeam(teamMapper.dtoToEntity(projectDto.getTeam()));
	// 	}
	// 	return projectMapper.entityToDto(projectRepository.saveAndFlush(project));		
	// }
	
	// @Override
	// public ProjectDto deleteProject(Long companyId, Long teamId, Long projectId) {
	// 	findCompany(companyId);
	// 	findTeam(teamId);
	// 	Project project = findProject(projectId);
	// 	project.setDeleted(true);
	// 	return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
	// }

	@Override
	public ProjectDto getProject(Long companyId, Long teamId, Long projectId) {
		findCompany(companyId);
		findTeam(teamId);
		Project project = findProject(projectId);
		return projectMapper.entityToDto(project);
	}

	@Override
	public ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto) {
		validateRole(projectDto.getAuthor());
		findCompany(companyId);
		Team team = findTeam(teamId);
		Project project = new Project();

		project.setName(projectDto.getName());
		project.setDescription(projectDto.getDescription());
		project.setTeam(team);
		project.setActive(projectDto.isActive());

		return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
	}

	@Override
	public ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto) {
		validateRole(projectDto.getAuthor());
		findCompany(companyId);
		findTeam(teamId);

		Project project = findProject(projectId);

		project.setName(projectDto.getName());
		project.setDescription(projectDto.getDescription());

		return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
	}


}
