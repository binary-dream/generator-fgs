"use strict";
import BaseGenerator from "../../base_generator.js";
import camel from "to-camel-case";
import { upperCaseFirst } from "upper-case-first";

class WidgetGenerator extends BaseGenerator {
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
    const widgetNameCamelCaseWithoutUnderlineFirstUpper = upperCaseFirst(
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
      widgetNameCamelCaseWithoutUnderlineFirstUpper
    };

    this._writeWidget({
      templateData,
      screenNameLowerCase,
      widgetNameLowerCase
    });
    this._writeWidgetState({
      templateData,
      screenNameLowerCase,
      widgetNameLowerCase
    });
  }

  _writeWidget({ templateData, screenNameLowerCase, widgetNameLowerCase }) {
    let destinationPath;
    let screenSpecificImports;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/widgets/${widgetNameLowerCase}/shared__${widgetNameLowerCase}_widget.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/shared/widgets/${widgetNameLowerCase}/shared__${widgetNameLowerCase}_widget_state.dart';`
      ];
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/widgets/${widgetNameLowerCase}/${screenNameLowerCase}__${widgetNameLowerCase}_widget.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/widgets/${widgetNameLowerCase}/${screenNameLowerCase}__${widgetNameLowerCase}_widget_state.dart';`
      ];
    }

    this.fs.copyTpl(
      this.templatePath("widget.dart.ejs"),
      this.destinationPath(destinationPath),
      {
        ...templateData,
        importPackages: [
          ...screenSpecificImports,
          `import 'package:flutter/material.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeWidgetState({
    templateData,
    screenNameLowerCase,
    widgetNameLowerCase
  }) {
    let destinationPath;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/widgets/${widgetNameLowerCase}/shared__${widgetNameLowerCase}_widget_state.dart`;
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/widgets/${widgetNameLowerCase}/${screenNameLowerCase}__${widgetNameLowerCase}_widget_state.dart`;
    }

    this.fs.copyTpl(
      this.templatePath("widget_state.dart.ejs"),
      this.destinationPath(destinationPath),
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

export default WidgetGenerator;
