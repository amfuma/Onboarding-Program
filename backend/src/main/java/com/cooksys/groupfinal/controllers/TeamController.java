package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

}
