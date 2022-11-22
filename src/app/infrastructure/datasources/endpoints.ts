export class ApiEndpoints {
    static Auth = {
      login: () => '/auth/login',
    }

    static Appointment = {
      getUserAppointments: (page: number, limit: number) => `/appointments?page=${page}&limit=${limit}`,
    }
};
