package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
  private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }

    private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }

    private void validateRole(BasicUserDto basicUserDto) {
        if (!basicUserDto.isAdmin()) {
            throw new NotAuthorizedException("user not authorized");
        }
    }

	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}


    @Override
    public FullUserDto createUser(UserRequestDto userRequestDto) {

         if (!userRequestDto.getBasicUserDto().isAdmin()) {
            throw new NotAuthorizedException("Not an admin");
         }
        User u = fullUserMapper.requestDtoToEntity(userRequestDto);
        u.setActive(true);
        u.setAdmin(userRequestDto.isAdmin());
        Credentials c = new Credentials();
        c.setUsername(userRequestDto.getCredentials().getUsername());
        c.setPassword(userRequestDto.getCredentials().getPassword());
        u.setCredentials(c);
        Profile p = new Profile();
        p.setEmail(userRequestDto.getProfile().getEmail());
        p.setFirstName(userRequestDto.getProfile().getFirstName());
        p.setLastName(userRequestDto.getProfile().getLastName());
        p.setPhone(userRequestDto.getProfile().getPhone());
        u.setProfile(p);
        Set<Company> setOfCompanies = new HashSet<>();
        setOfCompanies.add(findCompany(userRequestDto.getCompanyId()));
        u.setCompanies(setOfCompanies);
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(u));
    }

}
