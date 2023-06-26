import path from "node:path";
import { lstat, rm } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const mvCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await mvCommand.validate(args, this.currentWorkingDir);

    try {
      const filePath = path.resolve(this.currentWorkingDir, args[0]);
      const fileName = path.basename(filePath);
      const newDirPath = path.resolve(this.currentWorkingDir, args[1]);
      const newFilePath = path.join(newDirPath, fileName);

      const rStream = createReadStream(filePath, { encoding: "utf8" });
      const wStream = createWriteStream(newFilePath);

      await pipeline(rStream, wStream);
      await rm(filePath);
    } catch {
      throw new Error("Operation failed");
    }
  },

  async validate(args, currentWorkingDir) {
    if (args.length !== 2) {
      throw new Error("Invalid input");
    }

    try {
      const filePath = path.resolve(currentWorkingDir, args[0]);
      const newDirPath = path.resolve(currentWorkingDir, args[1]);

      const fileStat = await lstat(filePath);
      const newDirStat = await lstat(newDirPath);

      if (!fileStat.isFile() || newDirStat.isFile()) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
