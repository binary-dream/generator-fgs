"use strict";
const Generator = require("yeoman-generator");
const YAML = require("yaml");
const yosay = require("yosay");
const chalk = require("chalk");

class BaseGenerator extends Generator {
  welcomeLog() {
    this.log(
      yosay(
        `Welcome to the bedazzling ${chalk.red("generator-fgs")} generator!`
      )
    );
  }

  setPackageVars() {
    const pubspecDataAsString = this.fs.read(
      this.destinationPath("pubspec.yaml"),
      "utf8"
    );
    const pubspecObject = YAML.parse(pubspecDataAsString);
    this.packageName = pubspecObject.name;
    for (let i = 1; i <= 100; i++) {
      if (pubspecObject.dependencies[`fgs_utils_v${i}`]) {
        this.fgsUtilsPackageName = `fgs_utils_v${i}`;
      }
    }
  }
}

module.exports = BaseGenerator;
