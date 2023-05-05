"use strict";
import BaseGenerator from "../../base_generator.js";
import camel from "to-camel-case";
import { upperCaseFirst } from "upper-case-first";

class ComponentGenerator extends BaseGenerator {
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

    const templateData = {
      screenNameUpperCase,
      screenNameLowerCase,
      packageName: this.packageName,
      fgsUtilsPackageName: this.fgsUtilsPackageName,
      screenNameCamelCaseWithoutUnderline,
      componentNameLowerCase,
      componentNameUpperCase,
      componentNameCamelCaseWithoutUnderline,
      componentNameCamelCaseWithoutUnderlineFirstUpper
    };

    this._writeComponent({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase
    });
    this._writeComponentBloc({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase
    });
    this._writeComponentState({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase
    });
    this._writeComponentEvent({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase
    });
    this._writeComponentData({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase
    });
    this._writeComponentOnComponentStartedEventHandler({
      templateData,
      screenNameLowerCase,
      componentNameLowerCase
    });
  }

  _writeComponent({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase
  }) {
    let templatePath;
    let destinationPath;
    let screenSpecificImports;

    if (screenNameLowerCase === "shared") {
      templatePath = "component/component_in_shared.dart.ejs";
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_bloc.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_data.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_state.dart';`
      ];
    } else {
      templatePath = "component/component_in_screen.dart.ejs";
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_bloc.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_data.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_state.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart';`
      ];
    }

    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      {
        ...templateData,
        importPackages: [
          `import 'package:${this.packageName}/di_container/di_container.dart';`,
          ...screenSpecificImports,
          `import 'package:fgs_utils/fgs_utils.dart';`,
          `import 'package:flutter/material.dart';`,
          `import 'package:flutter_bloc/flutter_bloc.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeComponentBloc({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase
  }) {
    let templatePath;
    let destinationPath;
    let screenSpecificImports;

    if (screenNameLowerCase === "shared") {
      templatePath = "component_bloc/component_bloc_in_shared.dart.ejs";
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_bloc.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/event_handlers/shared__${componentNameLowerCase}__on_component_started_event_handler.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_data.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_state.dart';`
      ];
    } else {
      templatePath = "component_bloc/component_bloc_in_screen.dart.ejs";
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_bloc.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/event_handlers/${screenNameLowerCase}__${componentNameLowerCase}__on_component_started_event_handler.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_data.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_state.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/${screenNameLowerCase}__screen_bloc.dart';`
      ];
    }

    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      {
        ...templateData,
        importPackages: [
          ...screenSpecificImports,
          `import 'package:fgs_utils/fgs_utils.dart';`,
          `import 'package:flutter_bloc/flutter_bloc.dart';`
        ]
          .sort()
          .join("\n")
      }
    );
  }

  _writeComponentState({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase
  }) {
    let destinationPath;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_state.dart`;
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_state.dart`;
    }

    this.fs.copyTpl(
      this.templatePath("component_state.dart.ejs"),
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

  _writeComponentEvent({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase
  }) {
    let destinationPath;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_event.dart`;
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_event.dart`;
    }

    this.fs.copyTpl(
      this.templatePath("component_event.dart.ejs"),
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

  _writeComponentData({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase
  }) {
    let destinationPath;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_data.dart`;
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_data.dart`;
    }

    this.fs.copyTpl(
      this.templatePath("component_data.dart.ejs"),
      this.destinationPath(destinationPath),
      templateData
    );
  }

  _writeComponentOnComponentStartedEventHandler({
    templateData,
    screenNameLowerCase,
    componentNameLowerCase
  }) {
    let destinationPath;
    let screenSpecificImports;

    if (screenNameLowerCase === "shared") {
      destinationPath = `lib/shared/components/${componentNameLowerCase}/event_handlers/shared__${componentNameLowerCase}__on_component_started_event_handler.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_bloc.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/shared/components/${componentNameLowerCase}/shared__${componentNameLowerCase}_component_state.dart';`
      ];
    } else {
      destinationPath = `lib/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/event_handlers/${screenNameLowerCase}__${componentNameLowerCase}__on_component_started_event_handler.dart`;
      screenSpecificImports = [
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_bloc.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_event.dart';`,
        `import 'package:${this.packageName}/screens/${screenNameLowerCase}/components/${componentNameLowerCase}/${screenNameLowerCase}__${componentNameLowerCase}_component_state.dart';`
      ];
    }

    this.fs.copyTpl(
      this.templatePath(
        "event_handlers/on_component_started_event_handler.dart.ejs"
      ),
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
}

export default ComponentGenerator;
