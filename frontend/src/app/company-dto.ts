import {BasicUserDto} from "./basic-user-dto";
import {TeamDto} from "./team-dto";

export interface CompanyDto {
  id: number;
  name: string;
  description: string;
  teams: TeamDto[];
  employees: BasicUserDto[];
}
