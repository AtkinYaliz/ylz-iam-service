module.exports = {
   globals: {
      "ts-jest": {
         tsConfigFile: "tsconfig.json"
      }
   },
   moduleFileExtensions: ["ts", "js"],
   transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "babel-jest"
   },
   transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
   testMatch: ["**/test/**/Home*.(test|spec).(ts|js)"],
   testEnvironment: "node",

   collectCoverageFrom: ["src/controllers/**/*.{ts}"],
   verbose: true
};
