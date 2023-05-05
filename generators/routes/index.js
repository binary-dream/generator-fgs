"use strict";
import BaseGenerator from "../../base_generator.js";

class RoutesGenerator extends BaseGenerator {
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

    this._writeRoutes({ templateData });
  }

  _writeRoutes({ templateData }) {
    this.fs.copyTpl(
      this.templatePath("routes.dart.ejs"),
      this.destinationPath(`lib/routes.dart`),
      {
        ...templateData,
        importPackages: [`import 'package:fgs_utils/fgs_utils.dart';`]
          .sort()
          .join("\n")
      }
    );
  }
}

export default RoutesGenerator;
