"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Welcome to the bedazzling ${chalk.red("generator-fgs")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "screenName",
        message: "What is the name of the screen?"
      }
    ];

    await this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("screen.dart"),
      this.destinationPath(
        `lib/screens/${this.props.screenName}/${this.props.screenName}__screen.dart`
      )
    );
  }
};
