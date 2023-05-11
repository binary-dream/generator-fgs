"use strict";
import BaseGenerator from "../../base_generator.js";
import camel from "to-camel-case";
import { upperCaseFirst } from "upper-case-first";

class ScreenGenerator extends BaseGenerator {
  async prompting() {
    super.welcomeLog({ showCommands: false });

    const prompts = [
      {
        type: "input",
        name: "serviceCaseName",
        message:
          "What is the name of the service case (use _ to separate words)?"
      }
    ];

    await this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    super.setPackageVars();
  }

  writing() {
    const serviceCaseNameLowerCase = this.props.serviceCaseName.toLowerCase();
    const serviceCaseNameCamelCaseWithoutUnderline = camel(
      this.props.serviceCaseName
    );
    const serviceCaseNameUpperCase = this.props.serviceCaseName.toUpperCase();
    const serviceCaseNameCamelCaseWithoutUnderlineFirstUpper = upperCaseFirst(
      camel(this.props.serviceCaseName)
    );

    const templateData = {
      serviceCaseNameUpperCase,
      serviceCaseNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      serviceCaseNameCamelCaseWithoutUnderline,
      serviceCaseNameCamelCaseWithoutUnderlineFirstUpper
    };

    this._writeServiceCase({ templateData, serviceCaseNameLowerCase });
    this._writeServiceCaseFailure({ templateData, serviceCaseNameLowerCase });
    this._writeDataEntity({ templateData, serviceCaseNameLowerCase });
    this._writeDataItemEntity({ templateData, serviceCaseNameLowerCase });
  }

  _writeServiceCase({ templateData, serviceCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("service_case.dart.ejs"),
      this.destinationPath(
        `lib/shared/service_cases/${serviceCaseNameLowerCase}/shared__${serviceCaseNameLowerCase}_service_case.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:dartz/dartz.dart';`,
          `import 'package:${this.packageName}/shared/service_cases/${serviceCaseNameLowerCase}/entities/shared__${serviceCaseNameLowerCase}__data_entity.dart';`,
          `import 'package:${this.packageName}/shared/service_cases/${serviceCaseNameLowerCase}/shared__${serviceCaseNameLowerCase}_service_case_failure.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeServiceCaseFailure({ templateData, serviceCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("service_case_failure.dart.ejs"),
      this.destinationPath(
        `lib/shared/service_cases/${serviceCaseNameLowerCase}/shared__${serviceCaseNameLowerCase}_service_case_failure.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:freezed_annotation/freezed_annotation.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeDataEntity({ templateData, serviceCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("entities/data_entity.dart.ejs"),
      this.destinationPath(
        `lib/shared/service_cases/${serviceCaseNameLowerCase}/entities/shared__${serviceCaseNameLowerCase}__data_entity.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/shared/service_cases/${serviceCaseNameLowerCase}/entities/shared__${serviceCaseNameLowerCase}__data_item_entity.dart';`,
          `import 'package:freezed_annotation/freezed_annotation.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeDataItemEntity({ templateData, serviceCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("entities/data_item_entity.dart.ejs"),
      this.destinationPath(
        `lib/shared/service_cases/${serviceCaseNameLowerCase}/entities/shared__${serviceCaseNameLowerCase}__data_item_entity.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:freezed_annotation/freezed_annotation.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }
}

export default ScreenGenerator;
