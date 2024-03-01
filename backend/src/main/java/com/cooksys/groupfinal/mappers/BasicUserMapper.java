package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring", uses = { ProfileMapper.class, CredentialsMapper.class })
public interface BasicUserMapper {

    BasicUserDto entityToBasicUserDto(User user);
    
    Set<BasicUserDto> entitiesToBasicUserDtos(Set<User> users);
    
    User requestDtoToEntity(UserRequestDto userRequestDto);

    Set<User> requestDtosToEntities(Set<BasicUserDto> basicUserDtos);

}
