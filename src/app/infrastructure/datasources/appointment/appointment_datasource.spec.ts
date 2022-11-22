import { AppointmentDatasource } from './appointment_datasource';
import { AppointmentDatasourceInterface } from "@infra/contracts/datasources";

describe('AppointmentDatasource', () => {
    let datasource: AppointmentDatasourceInterface;

    beforeEach(() => {
      datasource = new AppointmentDatasource();
    });

    it('should initialize', () => {
      expect(datasource).toBeDefined();
    });
});
