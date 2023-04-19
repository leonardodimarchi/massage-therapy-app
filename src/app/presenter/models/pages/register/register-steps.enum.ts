export enum RegisterStep {
  BASIC_INFORMATION = 'basic',
  PERSONAL_INFORMATION = 'personal',
  ADDRESS = 'address',
  DONE = 'done',
}

export class RegisterStepHelper {
  public static getNext(current: RegisterStep): RegisterStep {
    const next: Record<RegisterStep, RegisterStep> = {
      [RegisterStep.BASIC_INFORMATION]: RegisterStep.PERSONAL_INFORMATION,
      [RegisterStep.PERSONAL_INFORMATION]: RegisterStep.ADDRESS,
      [RegisterStep.ADDRESS]: RegisterStep.DONE,
      [RegisterStep.DONE]: RegisterStep.DONE,
    }

    return next[current];
  }

  public static getPrevious(current: RegisterStep): RegisterStep {
    const previous: Record<RegisterStep, RegisterStep> = {
      [RegisterStep.BASIC_INFORMATION]: RegisterStep.BASIC_INFORMATION,
      [RegisterStep.PERSONAL_INFORMATION]: RegisterStep.BASIC_INFORMATION,
      [RegisterStep.ADDRESS]: RegisterStep.PERSONAL_INFORMATION,
      [RegisterStep.DONE]: RegisterStep.ADDRESS,
    }

    return previous[current];
  }

  public static toList(): RegisterStep[] {
    return Object.values(RegisterStep);
  }
}
