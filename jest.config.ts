import type {Config} from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  preset: "ts-jest",
};

export default config;
