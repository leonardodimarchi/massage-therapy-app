export enum AppointmentStatusEnum {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  REPROVED = 'reproved',
}

export const appointmentStatusToString: Record<AppointmentStatusEnum, string> = {
  [AppointmentStatusEnum.PENDING]: 'Pendente',
  [AppointmentStatusEnum.SCHEDULED]: 'Agendado',
  [AppointmentStatusEnum.COMPLETED]: 'Concluído',
  [AppointmentStatusEnum.REPROVED]: 'Cancelado',
}

export const appointmentStatusIcons: Record<AppointmentStatusEnum, string> = {
  [AppointmentStatusEnum.PENDING]: 'assets/icons/pending-icon.svg',
  [AppointmentStatusEnum.SCHEDULED]: 'assets/icons/appointment-icon.svg',
  [AppointmentStatusEnum.COMPLETED]: 'assets/icons/completed-icon.svg',
  [AppointmentStatusEnum.REPROVED]: 'assets/icons/canceled-icon.svg',
}
