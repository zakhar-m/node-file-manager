import path from "node:path";
import { rename, lstat } from "node:fs/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const rnCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await rnCommand.validate(args, this.currentWorkingDir);

    try {
      const filePath = path.resolve(this.currentWorkingDir, args[0]);
      const fileDir = path.dirname(filePath);
      const newFilePath = path.resolve(fileDir, args[1]);

      await rename(filePath, newFilePath);
    } catch {
      throw new Error("Operation failed");
    }
  },

  async validate(args, currentWorkingDir) {
    const newFileName = args[1];

    if (args.length !== 2 || !CliUtils.isValidFileName(newFileName)) {
      throw new Error("Invalid input");
    }

    try {
      const filePath = path.resolve(currentWorkingDir, args[0]);
      const fileDir = path.dirname(filePath);
      const newFilePath = path.resolve(fileDir, args[1]);

      const newFilePathExists = await CliUtils.fileOrDirExists(newFilePath);
      const stat = await lstat(filePath);

      if (!stat.isFile() || newFilePathExists) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
