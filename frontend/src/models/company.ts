import { Timestamp } from "rxjs";
import { Team } from "./team";
import { User } from "./user";

export class Company {
    id: number | undefined;
    date: Timestamp<number> | undefined;
    teams: Team[] | undefined;
    users: User[] | undefined;
}
