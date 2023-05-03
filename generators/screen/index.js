"use strict";
const BaseGenerator = require("../../base_generator");
const camel = require("to-camel-case");

module.exports = class extends BaseGenerator {
  async prompting() {
    super.welcomeLog();

    const prompts = [
      {
        type: "input",
        name: "screenName",
        message: "What is the name of the screen (use _ to separate words)?"
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

    const templateData = {
      screenNameUpperCase,
      screenNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      screenNameCamelCaseWithoutUnderline
    };

    this.fs.copyTpl(
      this.templatePath("screen.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:flutter/material.dart';`,
          `import 'package:flutter_bloc/flutter_bloc.dart';`,
          `import 'package:${this.packageName}/di_container/di_container.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_data.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_state.dart';`,
          `import 'package:fgs_utils/fgs_utils.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    this.fs.copyTpl(
      this.templatePath("screen_data.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_data.dart`
      ),
      {
        ...templateData
      }
    );

    this.fs.copyTpl(
      this.templatePath("screen_event.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart`
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

    this.fs.copyTpl(
      this.templatePath("screen_bloc.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:flutter_bloc/flutter_bloc.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_data.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_state.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/event_handlers/${screenNameLowerCase}__on_screen_started_event_handler.dart';`,
          `import 'package:fgs_utils/fgs_utils.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    this.fs.copyTpl(
      this.templatePath("screen_state.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_state.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:fgs_utils/fgs_utils.dart';`,
          `import 'package:freezed_annotation/freezed_annotation.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    this.fs.copyTpl(
      this.templatePath("event_handlers/on_screen_started_event_handler.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/event_handlers/${screenNameLowerCase}__on_screen_started_event_handler.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:flutter_bloc/flutter_bloc.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_state.dart';`,
          `import 'package:${this.packageName}/routes.dart';`
        ]
          .sort()
          .join("\n")
      }
    );

    let routesDataAsString;

    try {
      routesDataAsString = this.fs.read(
        this.destinationPath("lib/routes.dart"),
        "utf8"
      );
    } catch (_) {
      throw new Error("lib/routes.dart file not found");
    }

    const routesDataAsArray = routesDataAsString.split("\n");

    const newRoutesDataAsArray = [];

    for (let i = 0; i < routesDataAsArray.length; i++) {
      const line = routesDataAsArray[i];
      if (
        line ===
        "// --- ROUTES NAMES END --------------------------------------------------------"
      ) {
        newRoutesDataAsArray.push(
          `const ROUTES__${screenNameCamelCaseWithoutUnderline}RouteName = '${screenNameCamelCaseWithoutUnderline}';`
        );
      }

      if (
        line ===
        "    // --- ROUTES END ----------------------------------------------------------"
      ) {
        newRoutesDataAsArray.push(
          `    FGS_UTILS__Route(`,
          `      name: ROUTES__${screenNameCamelCaseWithoutUnderline}RouteName,`,
          `      path: '/${screenNameLowerCase.replace("_", "-")}',`,
          `      builder: (context, routeState) {`,
          `        return ${screenNameUpperCase}__Screen(`,
          `          data: ${screenNameUpperCase}__ScreenData(),`,
          `        );`,
          `      },`,
          `    ),`
        );
      }

      newRoutesDataAsArray.push(line);
    }

    this.fs.write(
      this.destinationPath("lib/routes.dart"),
      newRoutesDataAsArray.join("\n")
    );
  }
};
