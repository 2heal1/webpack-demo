const semver = require("semver");
const webpackSemver = require("webpack/lib/util/semver.js");

const version = "1.2.beta.1";
const specialTilde = "*";

console.log(
  "webpack semver special tilde: ",
  webpackSemver.satisfy(webpackSemver.parseRange(specialTilde), version)
);

console.log(
  "semver package special tilde: ",
  semver.satisfies(version, specialTilde)
);
