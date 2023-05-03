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
      this.templatePath("routes.dart"),
      this.destinationPath(`lib/routes.dart`),
      {
        ...templateData,
        importPackages: [`import 'package:fgs_utils/fgs_utils.dart';`]
          .sort()
          .join("\n")
      }
    );
  }
};
