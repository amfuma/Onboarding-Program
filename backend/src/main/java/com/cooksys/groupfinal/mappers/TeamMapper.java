package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class })
public interface TeamMapper {
	
	TeamDto entityToDto(Team team);

  Set<TeamDto> entitiesToDtos(Set<Team> teams);

  Team dtoToEntity(TeamDto team);

}