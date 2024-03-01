import {BasicUserDto} from "./basic-user-dto";

export interface AnnouncementDto {
  title: string;
  date: Date;
  message: string;
  author: BasicUserDto;
}
