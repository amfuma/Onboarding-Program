package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring", uses = { TeamMapper.class })
public interface ProjectMapper {
	
	ProjectDto entityToDto(Project project);

    Set<ProjectDto> entitiesToDtos(Set<Project> projects);

    Project dtoToEntity(ProjectDto projectDto);

}
