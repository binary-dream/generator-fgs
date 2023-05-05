"use strict";
import Generator from "yeoman-generator";
import { parse } from "yaml";
import yosay from "yosay";
import chalk from "chalk";

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
    const pubspecObject = parse(pubspecDataAsString);
    this.packageName = pubspecObject.name;
    this.fgsUtilsPackageName = "fgs_utils";
  }
}

export default BaseGenerator;
