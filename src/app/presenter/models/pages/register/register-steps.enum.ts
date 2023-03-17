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
}
