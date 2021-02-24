module.exports = {
  roots: ['<rootDir>/test'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
