"use strict";
const BaseGenerator = require("../../base_generator");

module.exports = class extends BaseGenerator {
  async prompting() {
    super.welcomeLog();

    const prompts = [];

    await this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    super.setPackageVars();
  }

  writing() {
    const templateData = {
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName
    };

    this.fs.copyTpl(
      this.templatePath("injectable.dart"),
      this.destinationPath(`lib/injectable.dart`),
      templateData
    );
  }
};
