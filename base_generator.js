"use strict";
import Generator from "yeoman-generator";
import { parse } from "yaml";
import yosay from "yosay";
import chalk from "chalk";

class BaseGenerator extends Generator {
  welcomeLog({ showCommands }) {
    this.log(yosay(`Welcome to the ${chalk.blue("Flutter Glue Style")}!`));
    if (showCommands) {
      this._showCommands();
    }
  }

  _showCommands() {
    this.log(`- Run 'yo fgs:component' to create a new component.`);
    this.log(``);
    this.log(
      `    The program will ask for the screen name, if the component is shared between multiple screens, use 'shared'.`
    );
    this.log(`    The program will ask for the component name.`);
    this.log(``);
    this.log(`- Run 'yo fgs:routes' to create the routes.dart file.`);
    this.log(``);
    this.log(`- Run 'yo fgs:screen' to create a new screen.`);
    this.log(``);
    this.log(`    The program will ask for the screen name.`);
    this.log(``);
    this.log(`- Run 'yo fgs:widget' to create a new widget.`);
    this.log(``);
    this.log(
      `    The program will ask for the screen name, if the widget is shared between multiple screens, use 'shared'.`
    );
    this.log(`    The program will ask for the widget name.`);
    this.log(``);
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
