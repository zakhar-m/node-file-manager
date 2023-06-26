import path from "node:path";
import { lstat } from "node:fs/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const cdCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await cdCommand.validate(args, this.currentWorkingDir);

    this.currentWorkingDir = path.resolve(this.currentWorkingDir, args[0]);
  },

  async validate(args, currentWorkingDir) {
    if (args.length !== 1) {
      throw new Error("Invalid input");
    }

    try {
      const toPath = path.resolve(currentWorkingDir, args[0]);
      const stat = await lstat(toPath);

      if (stat.isFile()) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
