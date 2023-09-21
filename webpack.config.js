const path = require("path");
const glob = require("glob");

module.exports = {
	mode: "production",
	entry: { all: glob.sync("./scripts/*.{js,ts}", { dotRelative: true }) },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "scriptBundle.js",
	},
	watch: true,
	module: {
		rules: [{ test: /\.ts$/, use: "ts-loader" }],
	},
};
