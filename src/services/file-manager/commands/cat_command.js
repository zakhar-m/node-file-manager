import path from "node:path";
import fs from "node:fs";
import { lstat } from "node:fs/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const catCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await catCommand.validate(args, this.currentWorkingDir);

    try {
      const fileToRead = path.resolve(this.currentWorkingDir, args[0]);
      const rStream = fs.createReadStream(fileToRead, "utf8");

      rStream.on("data", (chunk) => {
        process.stdout.write(chunk);
      });

      const readPromise = new Promise((resolve) => {
        rStream.on("end", () => {
          resolve();
        });
      });
      await readPromise;

      console.log("\n");
    } catch {
      throw new Error("Operation failed");
    }
  },

  async validate(args, currentWorkingDir) {
    if (args.length !== 1) {
      throw new Error("Invalid input");
    }

    try {
      const toPath = path.resolve(currentWorkingDir, args[0]);
      const stat = await lstat(toPath);

      if (!stat.isFile()) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
