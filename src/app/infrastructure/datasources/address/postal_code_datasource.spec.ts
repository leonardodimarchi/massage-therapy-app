import { PostalCodeDatasource } from "./postal_code_datasource";

describe('PostalCodeDatasource', () => {
    let datasource: PostalCodeDatasource;

    beforeEach(() => {
      datasource = new PostalCodeDatasource();
    });

    it('should initialize', () => {
      expect(datasource).toBeDefined();
    });
});
