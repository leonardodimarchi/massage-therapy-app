import { PostalCodeDatasource } from "./address_datasource";

describe('AddessDatasource', () => {
    let datasource: PostalCodeDatasource;

    beforeEach(() => {
      datasource = new PostalCodeDatasource();
    });

    it('should initialize', () => {
      expect(datasource).toBeDefined();
    });
});
