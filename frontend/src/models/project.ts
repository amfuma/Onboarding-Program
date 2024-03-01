import { Team } from "./team";
export class Project {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    active: boolean | undefined;
    team: Team | undefined;

}
