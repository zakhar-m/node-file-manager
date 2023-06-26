import path from "node:path";
import { open } from "node:fs/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const addCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await addCommand.validate(args, this.currentWorkingDir);

    try {
      const filePath = path.join(this.currentWorkingDir, args[0]);

      await open(filePath, "w");
    } catch {
      throw new Error("Operation failed");
    }
  },

  async validate(args, currentWorkingDir) {
    const fileName = args[0];

    if (args.length !== 1 || !CliUtils.isValidFileName(fileName)) {
      throw new Error("Invalid input");
    }

    try {
      const filePath = path.join(currentWorkingDir, fileName);
      const fileExists = await CliUtils.fileOrDirExists(filePath);

      if (fileExists) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
