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
    const screenNameLowerCase = screenNameLowerCase;

    const templateData = {
      screenNameUpperCase: this.props.screenName.toUpperCase(),
      screenNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      screenNameCamelCaseWithoutUnderline: camel(this.props.screenName)
    };

    this.fs.copyTpl(
      this.templatePath("screen.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen.dart`
      ),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath("screen_event.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_event.dart`
      ),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath("screen_bloc.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart`
      ),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath("screen_state.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_state.dart`
      ),
      templateData
    );

    this.fs.copyTpl(
      this.templatePath("event_handlers/on_screen_started_event_handler.dart"),
      this.destinationPath(
        `lib/screens/${screenNameLowerCase}/event_handlers/${screenNameLowerCase}__on_screen_started_event_handler.dart`
      ),
      templateData
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
          `const ROUTES__${screenNameLowerCase}RouteName = "${screenNameLowerCase}";`
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
