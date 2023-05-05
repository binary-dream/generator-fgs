"use strict";
import BaseGenerator from "../../base_generator.js";

class AppGenerator extends BaseGenerator {
  async prompting() {
    super.welcomeLog({ showCommands: true });
  }
}

export default AppGenerator;
