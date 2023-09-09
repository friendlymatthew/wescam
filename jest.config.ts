import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},
};

export default config;
