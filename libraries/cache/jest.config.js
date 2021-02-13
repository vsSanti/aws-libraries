module.exports = {
  clearMocks: true, // Automatically clear mock calls and instances between every test
  testMatch: ['**/*.test.ts'], // The glob patterns Jest uses to detect test files
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node', // The test environment that will be used for testing

  collectCoverage: true, // Indicates whether the coverage information should be collected while executing the test
  coverageDirectory: 'coverage', // The directory where Jest should output its coverage files
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/*.client.ts',
  ],
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text-summary', 'lcov'],
};
