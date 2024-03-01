import {CredentialsDto} from "./credentials-dto";
import {ProfileDto} from "./profile-dto";
import {BasicUserDto} from "./basic-user-dto";

export interface UserRequestDto {
  credentials: CredentialsDto;
  profile: ProfileDto;
  isAdmin: boolean;
  basicUserDto: BasicUserDto;
}
