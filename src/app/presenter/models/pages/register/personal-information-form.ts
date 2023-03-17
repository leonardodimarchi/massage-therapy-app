import { UserGenderEnum } from "@domain/models/user/user_gender.enum";

export interface PersonalInformationForm {
  birthDate: Date;
  diseaseHistory: string;
  gender: UserGenderEnum;
}
