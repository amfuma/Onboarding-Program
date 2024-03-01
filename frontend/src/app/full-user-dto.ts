import {ProfileDto} from "./profile-dto";
import {TeamDto} from "./team-dto";
import {CompanyDto} from "./company-dto";

export interface FullUserDto {
  id: number;
  profile: ProfileDto;
  admin: boolean;
  active: boolean;
  status: string;
  companies: CompanyDto[];
  teams: TeamDto[];
}
