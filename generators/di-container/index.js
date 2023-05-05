"use strict";
import BaseGenerator from "../../base_generator.js";

class DiContainerGenerator extends BaseGenerator {
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

    this._writeDiContainer({ templateData });
    this._writeDiContainerServicesCases({ templateData });
    this._writeDiContainerServices({ templateData });
  }

  _writeDiContainer({ templateData }) {
    this.fs.copyTpl(
      this.templatePath("di_container.dart.ejs"),
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
  }

  _writeDiContainerServicesCases({ templateData }) {
    this.fs.copyTpl(
      this.templatePath("di_container_services_cases.dart.ejs"),
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
  }

  _writeDiContainerServices({ templateData }) {
    this.fs.copyTpl(
      this.templatePath("di_container_services.dart.ejs"),
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
}

export default DiContainerGenerator;
