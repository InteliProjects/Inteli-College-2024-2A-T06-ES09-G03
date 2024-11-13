module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleNameMapper: {
        '^@auth/(.*)$': '<rootDir>/auth-service/src/$1',
        '^@web/(.*)$': '<rootDir>/web-app/src/$1'
      }
    };
  