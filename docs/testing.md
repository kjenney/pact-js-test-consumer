# Tests

This project uses [Jest](https://jestjs.io/) for unit testing.

Unit tests may be included anywhere in the project, as long as they are named `<sometest>.spec.js`.
To ensure that code is testable, anything that can be written as a pure function, should be.

Contract tests, aka PACT Tests, are considered unit tests and should be included where unit tests
are located in the project, as long as they are named `<sometest>.pact.js`.  

Run all unit tests:

```bash
npm run test:unit
```

Run all PACT tests:

```bash
npm run test:pact
```

Run all tests:

```bash
npm run test
```
