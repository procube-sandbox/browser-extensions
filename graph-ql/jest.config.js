module.exports = {
  roots: ['<rootDir>/test'],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+//.tsx?$': 'ts-jest'
  }
};
