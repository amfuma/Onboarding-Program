package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProjectDto {
	
	private Long id;
    
    private String name;
    
    private String description;
    
    private boolean active;
    
    private TeamDto team;

    private BasicUserDto author;

}