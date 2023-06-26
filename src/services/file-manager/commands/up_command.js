import path from "node:path";

import CliUtils from "../../../utils/cli_utils.js";

export const upCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    upCommand.validate(args);

    this.currentWorkingDir = path.join(this.currentWorkingDir, "../");
  },

  validate(args) {
    if (args.length) {
      throw new Error("Invalid input");
    }
  },
};
