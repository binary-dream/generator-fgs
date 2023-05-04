"use strict";
const BaseGenerator = require("../../base_generator");
const camel = require("to-camel-case");
const upperCaseFirstPackage = require("upper-case-first");

module.exports = class extends BaseGenerator {
  async prompting() {
    super.welcomeLog();

    const prompts = [
      {
        type: "input",
        name: "screenName",
        message: "What is the name of the screen (use _ to separate words)?"
      },
      {
        type: "input",
        name: "widgetName",
        message: "What is the name of the widget (use _ to separate words)?"
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
    const screenNameLowerCase = this.props.screenName.toLowerCase();
    const screenNameCamelCaseWithoutUnderline = camel(this.props.screenName);
    const screenNameUpperCase = this.props.screenName.toUpperCase();
    const widgetNameLowerCase = this.props.widgetName.toLowerCase();
    const widgetNameCamelCaseWithoutUnderline = camel(this.props.widgetName);
    const widgetNameCamelCaseWithouUnderlineFirstUpper = upperCaseFirstPackage.upperCaseFirst(
      camel(this.props.widgetName)
    );

    const templateData = {
      screenNameUpperCase,
      screenNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      screenNameCamelCaseWithoutUnderline,
      widgetNameLowerCase,
      widgetNameCamelCaseWithoutUnderline,
      widgetNameCamelCaseWithouUnderlineFirstUpper
    };

    this.fs.copyTpl(
      this.templatePath("widget.dart"),
      this.destinationPath(
        `lib/${
          screenNameLowerCase === "shared" ? "" : "screens/"
        }${screenNameLowerCase}/widgets/${widgetNameLowerCase}/${screenNameLowerCase}__${widgetNameLowerCase}_widget.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/${
            screenNameLowerCase === "shared" ? "" : "screens/"
          }${screenNameLowerCase}/widgets/${widgetNameLowerCase}/${screenNameLowerCase}__${widgetNameLowerCase}_widget_state.dart';`,
          `import 'package:flutter/material.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    this.fs.copyTpl(
      this.templatePath("widget_state.dart"),
      this.destinationPath(
        `lib/${
          screenNameLowerCase === "shared" ? "" : "screens/"
        }${screenNameLowerCase}/widgets/${widgetNameLowerCase}/${screenNameLowerCase}__${widgetNameLowerCase}_widget_state.dart`
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
};
