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
      this.templatePath("di_container.dart"),
      this.destinationPath(`lib/di_container/di_container.dart`),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/di_container/di_container_services.dart';`,
          `import 'package:${this.packageName}/di_container/di_container_services_cases.dart';`,
          `import 'package:${this.packageName}/environments.dart';`,
          `import 'package:get_it/get_it.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    this.fs.copyTpl(
      this.templatePath("di_container_services_cases.dart"),
      this.destinationPath(`lib/di_container/di_container_services_cases.dart`),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/environments.dart';`,
          `import 'package:get_it/get_it.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    this.fs.copyTpl(
      this.templatePath("di_container_services.dart"),
      this.destinationPath(`lib/di_container/di_container_services.dart`),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/environments.dart';`,
          `import 'package:get_it/get_it.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }
};
