"use strict";
import BaseGenerator from "../../base_generator.js";
import camel from "to-camel-case";
import fs from "fs";

class ScreenGenerator extends BaseGenerator {
  async prompting() {
    super.welcomeLog({ showCommands: false });

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

    this._writeScreen({ templateData, screenNameLowerCase });
    this._writeScreenWrapper({ templateData, screenNameLowerCase });
    this._writeScreenData({ templateData, screenNameLowerCase });
    this._writeScreenEvent({ templateData, screenNameLowerCase });
    this._writeScreenBloc({ templateData, screenNameLowerCase });
    this._writeScreenState({ templateData, screenNameLowerCase });
    this._writeOnScreenStartedEventHandler({
      templateData,
      screenNameLowerCase
    });
    this._writeRoutes({
      screenNameLowerCase,
      screenNameCamelCaseWithoutUnderline,
      screenNameUpperCase
    });
    this._writeLocalizedText({
      templateData,
      screenNameLowerCase
    });
    this._writeL10nTextExamples({
      screenNameLowerCase
    });
  }

  _writeScreen({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("screen.dart.ejs"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:flutter/material.dart';`,
          `import 'package:fgs_utils/fgs_utils.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeScreenWrapper({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("screen_wrapper.dart.ejs"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_wrapper.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:flutter/material.dart';`,
          `import 'package:flutter_bloc/flutter_bloc.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/event_handlers/${screenNameLowerCase}__on_screen_started_event_handler.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen.dart';`,
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
  }

  _writeScreenData({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("screen_data.dart.ejs"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_data.dart`
      ),
      templateData
    );
  }

  _writeScreenEvent({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("screen_event.dart.ejs"),
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
  }

  _writeScreenBloc({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("screen_bloc.dart.ejs"),
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
  }

  _writeScreenState({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("screen_state.dart.ejs"),
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
  }

  _writeOnScreenStartedEventHandler({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath(
        "event_handlers/on_screen_started_event_handler.dart.ejs"
      ),
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
  }

  _writeRoutes({
    screenNameLowerCase,
    screenNameCamelCaseWithoutUnderline,
    screenNameUpperCase
  }) {
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
          `      path: '/${screenNameLowerCase.replaceAll("_", "-")}',`,
          `      builder: (context, routerState) {`,
          `        return ${screenNameUpperCase}__ScreenWrapper(`,
          `          screenData: ${screenNameUpperCase}__ScreenData(),`,
          `        );`,
          `      },`,
          `    ),`
        );
      }

      newRoutesDataAsArray.push(line);
    }

    fs.unlinkSync(this.destinationPath("lib/routes.dart"));
    this.fs.write(
      this.destinationPath("lib/routes.dart"),
      newRoutesDataAsArray.join("\n")
    );
  }

  _writeLocalizedText({ templateData, screenNameLowerCase }) {
    this.fs.copyTpl(
      this.templatePath("localized_text.dart.ejs"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__localized_text.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:fgs_utils/fgs_utils.dart';`,
          `import 'package:flutter/material.dart';`,
          `import 'package:flutter_gen/gen_l10n/app_localizations.dart';`,
          `import 'package:freezed_annotation/freezed_annotation.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeL10nTextExamples({ screenNameLowerCase }) {
    this._writeExampleTextForLanguage({
      screenNameLowerCase,
      filePath: `lib/l10n/arb/app_en.arb`,
      exampleInTheLanguage: "Example"
    });
    this._writeExampleTextForLanguage({
      screenNameLowerCase,
      filePath: `lib/l10n/arb/app_pt.arb`,
      exampleInTheLanguage: "Exemplo"
    });
  }

  _writeExampleTextForLanguage({
    screenNameLowerCase,
    filePath,
    exampleInTheLanguage
  }) {
    let arbDataAsString;

    try {
      arbDataAsString = this.fs.read(this.destinationPath(filePath), "utf8");
    } catch (_) {
      throw new Error(`${filePath} file not found`);
    }

    const arbDataAsArray = arbDataAsString.split("\n");

    const newArbDataAsArray = [];

    for (let i = 0; i < arbDataAsArray.length; i++) {
      const line = arbDataAsArray[i];
      if (i === 0) {
        newArbDataAsArray.push(line);
        newArbDataAsArray.push(
          `  "${screenNameLowerCase}__example": "${exampleInTheLanguage}",`
        );
      } else {
        newArbDataAsArray.push(line);
      }
    }

    fs.unlinkSync(this.destinationPath(filePath));
    this.fs.write(this.destinationPath(filePath), newArbDataAsArray.join("\n"));
  }
}

export default ScreenGenerator;
