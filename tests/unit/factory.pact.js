/* eslint-disable max-len */
const axios = require('axios');
const PactMatchers = require('@pact-foundation/pact').Matchers;
const { Pact } = require('@pact-foundation/pact');

// PACT mock provider service
const port = 8991;
const mockProvider = new Pact({
  port,
  log: './logs/mockserver-verification.log',
  dir: './pacts',
  cors: true,
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'Test',
  provider: 'Factory'
});

// Setup jest framework for pact tests
beforeAll(() => mockProvider.setup()); // Create mock provider
afterEach(() => mockProvider.verify()); // Ensure the mock provider verifies expected interactions for each test
afterAll(() => mockProvider.finalize()); // Tear down the mock and write the pact

// Pact matcher for ISO8601 timestamps
const ISO8601_DATETIME = new Date().toISOString();
const ISO8601_TIMESTAMP_PACT_MATCHER = PactMatchers.term({
  // Use matcher for timestamps
  generate: ISO8601_DATETIME,
  matcher: PactMatchers.ISO8601_DATETIME_WITH_MILLIS_FORMAT
});

// Factory Company Service consumer contract tests ontract tests
describe('Test consumer needs to ensure that the Company Service', () => {
  // Contract for Create Company
  describe('Create Company endpoint', () => {
    beforeEach(() => {
      const interaction = {
        state: '',
        uponReceiving: 'A valid POST request with name \'Corporations R Us LLC., Inc.\'.',
        withRequest: {
          method: 'POST',
          path: '/Companies'
        },
        willRespondWith: {
          status: 204
        }
      };
      return mockProvider.addInteraction(interaction);
    });

    // Test for Create Company contract
    it('returns status 204', (done) => {
      axios
        .request({
          method: 'post',
          url: 'http://localhost:8991/Companies'
        })
        .then((response) => {
          expect(response.status).toEqual(204);
          done();
        });
    });
  });

  // Contract for Delete Company
  describe('Delete Company endpoint', () => {
    beforeEach(() => {
      const interaction = {
        state: 'A company exists with id 923c17f5-a605-45b0-84f5-353c9f1fd2a9.',
        uponReceiving: 'A valid DELETE request with id 923c17f5-a605-45b0-84f5-353c9f1fd2a9.',
        withRequest: {
          method: 'DELETE',
          path: '/Companies/923c17f5-a605-45b0-84f5-353c9f1fd2a9'
        },
        willRespondWith: {
          status: 204
        }
      };
      return mockProvider.addInteraction(interaction);
    });

    // Test for Delete Company contract
    it('returns status 204', (done) => {
      axios
        .request({
          method: 'delete',
          url: 'http://localhost:8991/Companies/923c17f5-a605-45b0-84f5-353c9f1fd2a9'
        })
        .then((response) => {
          expect(response.status).toEqual(204);
          done();
        });
    });
  });

  // Contract for Update Company
  describe('Update Company endpoint', () => {
    beforeEach(() => {
      const interaction = {
        state: 'A company exists with id 81c3feb5-fac0-48ce-bd4b-3549ca474e68 and name=\'Corporations R Us LLC., Inc.\'.',
        uponReceiving:
          'A valid PUT request with id 81c3feb5-fac0-48ce-bd4b-3549ca474e68 and name=\'Corporations And More, Inc.\'.',
        withRequest: {
          method: 'PUT',
          path: '/Companies/81c3feb5-fac0-48ce-bd4b-3549ca474e68',
          body: {
            id: '81c3feb5-fac0-48ce-bd4b-3549ca474e68',
            name: 'Corporations And More, Inc.'
          }
        },
        willRespondWith: {
          status: 204
        }
      };
      return mockProvider.addInteraction(interaction);
    });

    // Test for Update Company contract
    it('returns status 204', (done) => {
      axios
        .request({
          method: 'put',
          url: 'http://localhost:8991/Companies/81c3feb5-fac0-48ce-bd4b-3549ca474e68',
          data: {
            id: '81c3feb5-fac0-48ce-bd4b-3549ca474e68',
            name: 'Corporations And More, Inc.'
          }
        })
        .then((response) => {
          expect(response.status).toEqual(204);
          done();
        });
    });
  });

  // Contract for Get Company
  describe('Get Company endpoint', () => {
    beforeEach(() => {
      const interaction = {
        state: 'A company exists with id 81c3feb5-fac0-48ce-bd4b-3549ca474e68 and name=\'Corporations R Us LLC., Inc.\'.',
        uponReceiving: 'A valid GET request with id 81c3feb5-fac0-48ce-bd4b-3549ca474e68.',
        withRequest: {
          method: 'GET',
          path: '/Companies/81c3feb5-fac0-48ce-bd4b-3549ca474e68'
        },
        willRespondWith: {
          status: 200,
          header: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: {
            companies: [
              {
                id: '81c3feb5-fac0-48ce-bd4b-3549ca474e68',
                name: 'Corporations R Us LLC., Inc.',
                createdAt: ISO8601_TIMESTAMP_PACT_MATCHER,
                updatedAt: ISO8601_TIMESTAMP_PACT_MATCHER
              }
            ]
          }
        }
      };
      return mockProvider.addInteraction(interaction);
    });

    // Test for Update Company contract
    it('returns status 200 and one or more companies having the given id', (done) => {
      axios
        .request({
          method: 'get',
          url: 'http://localhost:8991/Companies/81c3feb5-fac0-48ce-bd4b-3549ca474e68',
          header: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data.companies[0].id).toEqual('81c3feb5-fac0-48ce-bd4b-3549ca474e68');
          expect(response.data.companies[0].createdAt).toEqual(ISO8601_DATETIME);
          expect(response.data.companies[0].updatedAt).toEqual(ISO8601_DATETIME);
          done();
        });
    });
  });

  // Contract for Query Company
  describe('Query Company endpoint', () => {
    beforeEach(() => {
      const interaction = {
        state: 'A company exists with id 81c3feb5-fac0-48ce-bd4b-3549ca474e68 and name=\'Corporations R Us LLC., Inc.\'.',
        uponReceiving: 'A valid GET request with query \'Corporations R Us LLC., Inc.\', page 1 and limit 15.',
        withRequest: {
          method: 'GET',
          path: '/Companies/search/query=Corporations&page=1&limit=15'
        },
        willRespondWith: {
          status: 200,
          header: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: {
            companies: [
              {
                id: '81c3feb5-fac0-48ce-bd4b-3549ca474e68',
                name: 'Corporations R Us LLC., Inc.',
                createdAt: ISO8601_TIMESTAMP_PACT_MATCHER,
                updatedAt: ISO8601_TIMESTAMP_PACT_MATCHER
              }
            ]
          }
        }
      };
      return mockProvider.addInteraction(interaction);
    });

    // Test for Query Company contract
    it('returns status 200 and one or more companies having the given id', (done) => {
      axios
        .request({
          method: 'get',
          url: 'http://localhost:8991/Companies/search/query=Corporations&page=1&limit=15',
          header: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data.companies[0].id).toEqual('81c3feb5-fac0-48ce-bd4b-3549ca474e68');
          expect(response.data.companies[0].createdAt).toEqual(ISO8601_DATETIME);
          expect(response.data.companies[0].updatedAt).toEqual(ISO8601_DATETIME);
          done();
        });
    });
  });
});
