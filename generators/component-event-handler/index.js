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
        name: "screenName",
        message: "What is the name of the screen (use _ to separate words)?"
      },
      {
        type: "input",
        name: "componentName",
        message: "What is the name of the component (use _ to separate words)?"
      },
      {
        type: "input",
        name: "eventName",
        message: "What is the name of the event (use _ to separate words)?"
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
    const componentNameLowerCase = this.props.componentName.toLowerCase();
    const componentNameUpperCase = this.props.componentName.toUpperCase();
    const componentNameCamelCaseWithoutUnderline = camel(
      this.props.componentName
    );
    const componentNameCamelCaseWithoutUnderlineFirstUpper = upperCaseFirst(
      camel(this.props.componentName)
    );
    const eventNameLowerCase = this.props.eventName.toLowerCase();
    const eventNameCamelCaseWithoutUnderline = camel(this.props.eventName);
    const eventNameCamelCaseWithoutUnderlineFirstUpper = upperCaseFirst(
      camel(this.props.eventName)
    );

    const templateData = {
      screenNameUpperCase,
      screenNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      screenNameCamelCaseWithoutUnderline,
      componentNameLowerCase,
      componentNameUpperCase,
      componentNameCamelCaseWithoutUnderline,
      componentNameCamelCaseWithoutUnderlineFirstUpper,
      eventNameLowerCase,
      eventNameCamelCaseWithoutUnderlineFirstUpper,
      eventNameCamelCaseWithoutUnderline
    };

    this._writeEventHandler({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase,
      eventNameLowerCase
    });
    this._writeEventHandlerOnBloc({
      screenNameLowerCase,
      screenNameUpperCase,
      componentNameLowerCase,
      componentNameUpperCase,
      eventNameCamelCaseWithoutUnderline,
      eventNameCamelCaseWithoutUnderlineFirstUpper
    });
    this._writeEvent({
      screenNameLowerCase,
      screenNameUpperCase,
      componentNameLowerCase,
      componentNameUpperCase,
      componentNameCamelCaseWithoutUnderlineFirstUpper,
      eventNameCamelCaseWithoutUnderline,
      eventNameCamelCaseWithoutUnderlineFirstUpper
    });
  }

  _writeEventHandler({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase,
    eventNameLowerCase
  }) {
    let destinationPath;
    let screenSpecificImports;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/event_handlers/shared__${componentNameLowerCase}__on_${eventNameLowerCase}_event_handler.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_bloc.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_state.dart';`
      ];
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/event_handlers/${screenNameLowerCase}__${componentNameLowerCase}__on_${eventNameLowerCase}_event_handler.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_bloc.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_state.dart';`
      ];
    }

    this.fs.copyTpl(
      this.templatePath("event_handler.dart.ejs"),
      this.destinationPath(destinationPath),
      {
        ...templateData,
        importPackages: [
          ...screenSpecificImports,
          `import 'package:flutter_bloc/flutter_bloc.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeEventHandlerOnBloc({
    screenNameLowerCase,
    screenNameUpperCase,
    componentNameLowerCase,
    componentNameUpperCase,
    eventNameCamelCaseWithoutUnderline,
    eventNameCamelCaseWithoutUnderlineFirstUpper
  }) {
    let destinationPath;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_bloc.dart`;
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_bloc.dart`;
    }

    let blocPath = destinationPath;
    let blocDataAsString;

    try {
      blocDataAsString = this.fs.read(this.destinationPath(blocPath), "utf8");
    } catch (_) {
      throw new Error(`${blocPath} file not found`);
    }

    const blocDataAsArray = blocDataAsString.split("\n");

    const newBlocDataAsArray = [];

    for (let i = 0; i < blocDataAsArray.length; i++) {
      const line = blocDataAsArray[i];
      if (
        line ===
        "        // --- EVENTS END ------------------------------------------------------"
      ) {
        newBlocDataAsArray.push(
          `        ${eventNameCamelCaseWithoutUnderline}: (${eventNameCamelCaseWithoutUnderline}) => `,
          `          ${screenNameUpperCase}__${componentNameUpperCase}__on${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler(`,
          `            bloc: this,`,
          `            event: ${eventNameCamelCaseWithoutUnderline},`,
          `            emit: emit,`,
          `          ),`
        );
      }

      newBlocDataAsArray.push(line);
    }

    this.fs.write(
      this.destinationPath(blocPath),
      newBlocDataAsArray.join("\n")
    );
  }

  _writeEvent({
    screenNameLowerCase,
    screenNameUpperCase,
    componentNameLowerCase,
    componentNameUpperCase,
    componentNameCamelCaseWithoutUnderlineFirstUpper,
    eventNameCamelCaseWithoutUnderline,
    eventNameCamelCaseWithoutUnderlineFirstUpper
  }) {
    let destinationPath;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_event.dart`;
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_event.dart`;
    }

    let eventPath = destinationPath;
    let eventDataAsString;

    try {
      eventDataAsString = this.fs.read(this.destinationPath(eventPath), "utf8");
    } catch (_) {
      throw new Error(`${eventPath} file not found`);
    }

    const eventDataAsArray = eventDataAsString.split("\n");

    const newEventDataAsArray = [];

    for (let i = 0; i < eventDataAsArray.length; i++) {
      const line = eventDataAsArray[i];
      if (
        line ===
        "  // --- EVENTS END ------------------------------------------------------------"
      ) {
        newEventDataAsArray.push(
          `  const factory ${screenNameUpperCase}__${componentNameCamelCaseWithoutUnderlineFirstUpper}ComponentEvent.${eventNameCamelCaseWithoutUnderline}() = `,
          `    ${screenNameUpperCase}__${componentNameUpperCase}__${eventNameCamelCaseWithoutUnderlineFirstUpper};`
        );
      }

      newEventDataAsArray.push(line);
    }

    this.fs.write(
      this.destinationPath(eventPath),
      newEventDataAsArray.join("\n")
    );
  }
}

export default ScreenGenerator;
