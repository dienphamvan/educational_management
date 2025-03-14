import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set the test environment to Node.js
  moduleFileExtensions: ['ts', 'js', 'json'], // Recognize file extensions
  rootDir: './', // Root directory for Jest
  testRegex: '.*\\.spec\\.ts$', // Run only .spec.ts files as test files
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Map `src/` to the project root's `src/` folder
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Transform .ts and .js files with ts-jest
  },
  collectCoverage: true, // Enable code coverage reporting
  collectCoverageFrom: [
    'src/**/*.ts', // Collect coverage from .ts files in `src/`
    '!src/**/*.module.ts', // Exclude module files
    '!src/main.ts', // Exclude entry point files
    '!src/**/*.dto.ts', // Exclude DTO files
    '!src/prisma/*.ts', // Exclude Prisma files
    '!src/test/**/*.ts', // Exclude test folder
    '!src/**/*.(spec|e2e-spec).ts', // Exclude e2e-spec and spec files
    '!src/common/(config|constant|mock)/*.ts',
  ],
  coverageDirectory: './coverage', // Directory to output coverage reports
};

export default jestConfig;
