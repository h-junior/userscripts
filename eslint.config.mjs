import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import userscripts from "eslint-plugin-userscripts";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
			userscripts: {
				rules: userscripts.rules
			}
		},
		rules: {
			...userscripts.configs.recommended.rules
		},
		settings: {
			userscriptVersions: {
				violentmonkey: "*"
			}
		},
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.browser
			}
		}
	},
	eslintConfigPrettier
]);
