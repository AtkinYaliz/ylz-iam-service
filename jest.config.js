module.exports = {
   collectCoverageFrom: ["src/controllers/**/*.{ts}"],
   globals: {
      "ts-jest": {
         tsConfigFile: "tsconfig.json"
      }
   },
   moduleFileExtensions: ["ts", "js"],
   testMatch: ["**/test/**/*.(test|spec).(ts|js)"],
   testEnvironment: "node",
   transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "babel-jest"
   },
   transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
   verbose: true
};
