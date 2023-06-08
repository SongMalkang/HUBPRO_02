module.exports = {
  rootDir: "./src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/src/hook/jest.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
};
