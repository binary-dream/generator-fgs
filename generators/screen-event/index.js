"use strict";
import BaseGenerator from "../../base_generator.js";
import camel from "to-camel-case";
import { upperCaseFirst } from "upper-case-first";
import fs from "fs";

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
      eventNameLowerCase,
      eventNameCamelCaseWithoutUnderlineFirstUpper,
      eventNameCamelCaseWithoutUnderline
    };

    this._writeEventHandler({
      templateData,
      screenNameLowerCase,
      eventNameLowerCase
    });
    this._writeEventHandlerOnBloc({
      screenNameLowerCase,
      screenNameUpperCase,
      eventNameCamelCaseWithoutUnderlineFirstUpper,
      eventNameCamelCaseWithoutUnderline
    });
    this._writeEventHandlerOnScreenWrapper({
      screenNameLowerCase,
      screenNameUpperCase,
      eventNameCamelCaseWithoutUnderlineFirstUpper,
      eventNameCamelCaseWithoutUnderline
    });
    this._writeEvent({
      screenNameLowerCase,
      screenNameUpperCase,
      eventNameCamelCaseWithoutUnderline,
      eventNameCamelCaseWithoutUnderlineFirstUpper
    });
  }

  _writeEventHandler({
    templateData,
    screenNameLowerCase,
    eventNameLowerCase
  }) {
    this.fs.copyTpl(
      this.templatePath("event_handler.dart.ejs"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/event_handlers/${screenNameLowerCase}__on_${eventNameLowerCase}_event_handler.dart`
      ),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart';`,
          `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_state.dart';`,
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
    eventNameCamelCaseWithoutUnderlineFirstUpper
  }) {
    let blocPath = `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart`;
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
        "    // --- EVENT HANDLERS ON CONSTRUCTOR END -----------------------------------"
      ) {
        newBlocDataAsArray.push(
          `    required this.on${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler,`
        );
      }

      if (
        line ===
        "    // --- EVENTS END ----------------------------------------------------------"
      ) {
        newBlocDataAsArray.push(
          `    on<${screenNameUpperCase}__ScreenEvent__${eventNameCamelCaseWithoutUnderlineFirstUpper}>(`,
          `      (event, emit) async {`,
          `        await on${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler.execute(`,
          `          bloc: this,`,
          `          event: event,`,
          `          emit: emit,`,
          `        );`,
          `      },`,
          `    );`
        );
      }

      if (
        line ===
        "  // --- EVENT HANDLERS DECLARATIONS END ---------------------------------------"
      ) {
        newBlocDataAsArray.push(
          `  final ${screenNameUpperCase}__On${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler `,
          `    on${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler;`
        );
      }

      newBlocDataAsArray.push(line);
    }

    fs.unlinkSync(this.destinationPath(blocPath));
    this.fs.write(
      this.destinationPath(blocPath),
      newBlocDataAsArray.join("\n")
    );
  }

  _writeEventHandlerOnScreenWrapper({
    screenNameLowerCase,
    screenNameUpperCase,
    eventNameCamelCaseWithoutUnderlineFirstUpper
  }) {
    let screenWrapperPath = `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_wrapper.dart`;
    let screenWrapperDataAsString;

    try {
      screenWrapperDataAsString = this.fs.read(
        this.destinationPath(screenWrapperPath),
        "utf8"
      );
    } catch (_) {
      throw new Error(`${screenWrapperPath} file not found`);
    }

    const screenWrapperDataAsArray = screenWrapperDataAsString.split("\n");

    const newScreenWrapperDataAsArray = [];

    for (let i = 0; i < screenWrapperDataAsArray.length; i++) {
      const line = screenWrapperDataAsArray[i];
      if (
        line ===
        "      // --- EVENT HANDLERS ON CONSTRUCTOR END ---------------------------------"
      ) {
        newScreenWrapperDataAsArray.push(
          `      on${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler:`,
          `        ${screenNameUpperCase}__On${eventNameCamelCaseWithoutUnderlineFirstUpper}EventHandler(),`
        );
      }

      newScreenWrapperDataAsArray.push(line);
    }

    fs.unlinkSync(this.destinationPath(screenWrapperPath));
    this.fs.write(
      this.destinationPath(screenWrapperPath),
      newScreenWrapperDataAsArray.join("\n")
    );
  }

  _writeEvent({
    screenNameLowerCase,
    screenNameUpperCase,
    eventNameCamelCaseWithoutUnderline,
    eventNameCamelCaseWithoutUnderlineFirstUpper
  }) {
    let eventPath = `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart`;
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
          `  const factory ${screenNameUpperCase}__ScreenEvent.${eventNameCamelCaseWithoutUnderline}() = `,
          `    ${screenNameUpperCase}__ScreenEvent__${eventNameCamelCaseWithoutUnderlineFirstUpper};`
        );
      }

      newEventDataAsArray.push(line);
    }

    fs.unlinkSync(this.destinationPath(eventPath));
    this.fs.write(
      this.destinationPath(eventPath),
      newEventDataAsArray.join("\n")
    );
  }
}

export default ScreenGenerator;
