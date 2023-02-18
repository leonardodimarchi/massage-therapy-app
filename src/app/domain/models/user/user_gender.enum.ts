export enum UserGenderEnum {
    MALE = 'male',
    FEMALE = 'female',
}

export namespace UserGenderEnum {
  export function getName(value: UserGenderEnum): string {
    const byName: Record<UserGenderEnum, string> = {
      [UserGenderEnum.MALE]: 'Masculino',
      [UserGenderEnum.FEMALE]: 'FEMININO',
    }

    return byName[value];
  }
}
