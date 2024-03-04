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
        name: "providerCaseName",
        message:
          "What is the name of the provider case (use _ to separate words)?"
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
    const providerCaseNameLowerCase = this.props.providerCaseName.toLowerCase();
    const providerCaseNameCamelCaseWithoutUnderline = camel(
      this.props.providerCaseName
    );
    const providerCaseNameUpperCase = this.props.providerCaseName.toUpperCase();
    const providerCaseNameCamelCaseWithoutUnderlineFirstUpper = upperCaseFirst(
      camel(this.props.providerCaseName)
    );

    const templateData = {
      providerCaseNameUpperCase,
      providerCaseNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      providerCaseNameCamelCaseWithoutUnderline,
      providerCaseNameCamelCaseWithoutUnderlineFirstUpper
    };

    this._writeServiceCase({ templateData, providerCaseNameLowerCase });
    this._writeServiceCaseFailure({ templateData, providerCaseNameLowerCase });
    this._writeDataEntity({ templateData, providerCaseNameLowerCase });
    this._writeDataItemEntity({ templateData, providerCaseNameLowerCase });
  }

  _writeServiceCase({ templateData, providerCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("provider_case.dart.ejs"),
      this.destinationPath(
        `lib/shared/provider_cases/${providerCaseNameLowerCase}/shared__${providerCaseNameLowerCase}_provider_case.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:dartz/dartz.dart';`,
          `import 'package:${this.packageName}/shared/provider_cases/${providerCaseNameLowerCase}/entities/shared__${providerCaseNameLowerCase}__data_entity.dart';`,
          `import 'package:${this.packageName}/shared/provider_cases/${providerCaseNameLowerCase}/shared__${providerCaseNameLowerCase}_provider_case_failure.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeServiceCaseFailure({ templateData, providerCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("provider_case_failure.dart.ejs"),
      this.destinationPath(
        `lib/shared/provider_cases/${providerCaseNameLowerCase}/shared__${providerCaseNameLowerCase}_provider_case_failure.dart`
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

  _writeDataEntity({ templateData, providerCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("entities/data_entity.dart.ejs"),
      this.destinationPath(
        `lib/shared/provider_cases/${providerCaseNameLowerCase}/entities/shared__${providerCaseNameLowerCase}__data_entity.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/shared/provider_cases/${providerCaseNameLowerCase}/entities/shared__${providerCaseNameLowerCase}__data_item_entity.dart';`,
          `import 'package:freezed_annotation/freezed_annotation.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeDataItemEntity({ templateData, providerCaseNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("entities/data_item_entity.dart.ejs"),
      this.destinationPath(
        `lib/shared/provider_cases/${providerCaseNameLowerCase}/entities/shared__${providerCaseNameLowerCase}__data_item_entity.dart`
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
