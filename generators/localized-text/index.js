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
        name: "textLabel",
        message: "What is the label of the text (use _ to separate words)?"
      },
      {
        type: "input",
        name: "textEnglishTranslation",
        message: "What is the translation of the text in english?"
      },
      {
        type: "input",
        name: "textPortugueseTranslation",
        message: "What is the translation of the text in portuguese?"
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
    const screenNameUpperCase = this.props.screenName.toUpperCase();
    const textLabelCamelCaseWithoutUnderline = camel(this.props.textLabel);
    const textLabelCamelCaseWithoutUnderlineFirstUpper = upperCaseFirst(
      textLabelCamelCaseWithoutUnderline
    );

    this._writeOnStateFile({
      screenNameLowerCase,
      screenNameUpperCase,
      textLabelCamelCaseWithoutUnderline,
      textLabelCamelCaseWithoutUnderlineFirstUpper
    });
    this._writeOnArbFile({
      screenNameLowerCase,
      textLabelCamelCaseWithoutUnderline,
      textTranslation: this.props.textEnglishTranslation,
      arbFilePath: `lib/l10n/arb/app_en.arb`
    });
    this._writeOnArbFile({
      screenNameLowerCase,
      textLabelCamelCaseWithoutUnderline,
      textTranslation: this.props.textPortugueseTranslation,
      arbFilePath: `lib/l10n/arb/app_pt.arb`
    });
  }

  _writeOnStateFile({
    screenNameLowerCase,
    screenNameUpperCase,
    textLabelCamelCaseWithoutUnderline,
    textLabelCamelCaseWithoutUnderlineFirstUpper
  }) {
    let stateDataAsString;
    let filePath;

    if (screenNameLowerCase === "shared") {
      filePath = "lib/shared/shared__localized_text.dart";
    } else {
      filePath = `lib/screens/${screenNameLowerCase}/${screenNameLowerCase}__localized_text.dart`;
    }

    try {
      stateDataAsString = this.fs.read(this.destinationPath(filePath), "utf8");
    } catch (_) {
      throw new Error(`${filePath} file not found`);
    }

    const stateDataAsArray = stateDataAsString.split("\n");

    const newStateDataAsArray = [];

    for (let i = 0; i < stateDataAsArray.length; i++) {
      const line = stateDataAsArray[i];

      if (
        line ===
        "  // --- END TEXTS DECLARATIONS ------------------------------------------------"
      ) {
        newStateDataAsArray.push(
          `  const factory ${screenNameUpperCase}__LocalizedText.${textLabelCamelCaseWithoutUnderline}() = `,
          `    ${screenNameUpperCase}__LocalizedText__${textLabelCamelCaseWithoutUnderlineFirstUpper};`
        );
      }

      if (
        line ===
        "      // --- END TEXTS TRANSLATIONS --------------------------------------------"
      ) {
        newStateDataAsArray.push(
          `      ${textLabelCamelCaseWithoutUnderline}: (_) => `,
          `        AppLocalizations.of(context).${screenNameLowerCase}__${textLabelCamelCaseWithoutUnderline},`
        );
      }

      newStateDataAsArray.push(line);
    }

    this.fs.write(
      this.destinationPath(filePath),
      newStateDataAsArray.join("\n")
    );
  }

  _writeOnArbFile({
    screenNameLowerCase,
    textLabelCamelCaseWithoutUnderline,
    textTranslation,
    arbFilePath
  }) {
    let arbDataAsString;
    let filePath = arbFilePath;

    try {
      arbDataAsString = this.fs.read(this.destinationPath(filePath), "utf8");
    } catch (_) {
      throw new Error(`${filePath} file not found`);
    }

    const arbDataAsArray = arbDataAsString.split("\n");

    const newArbDataAsArray = [];

    let foundScreenSection = false;

    for (let i = 0; i < arbDataAsArray.length; i++) {
      const line = arbDataAsArray[i];

      if (
        line.startsWith(`  "${screenNameLowerCase}__`) &&
        !foundScreenSection
      ) {
        newArbDataAsArray.push([
          `  "${screenNameLowerCase}__${textLabelCamelCaseWithoutUnderline}": "${textTranslation}",`
        ]);
        foundScreenSection = true;
      }

      newArbDataAsArray.push(line);
    }

    this.fs.write(this.destinationPath(filePath), newArbDataAsArray.join("\n"));
  }
}

export default ScreenGenerator;
