import {Company} from "./company";
import {Team} from "./team";
import {ProfileDto} from "../app/profile-dto";

export class User {
  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  active: boolean | undefined;
  admin: boolean | undefined;
  status: string | undefined;
  companies: Company[] | undefined;
  teams: Team[] | undefined;
  isLoggedIn: boolean | undefined;
  profile: ProfileDto | undefined;
}
