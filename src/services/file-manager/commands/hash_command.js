import path from "node:path";
import { createHash } from "node:crypto";
import { lstat, readFile } from "node:fs/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const hashCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await hashCommand.validate(args, this.currentWorkingDir);

    try {
      const filePath = path.resolve(this.currentWorkingDir, args[0]);

      const data = await readFile(filePath);
      const hash = createHash("sha256");
      hash.update(data);
      console.log(hash.digest("hex"));
    } catch {
      throw new Error("Operation failed");
    }
  },

  async validate(args, currentWorkingDir) {
    if (args.length !== 1) {
      throw new Error("Invalid input");
    }

    try {
      const filePath = path.resolve(currentWorkingDir, args[0]);
      const stat = await lstat(filePath);

      if (!stat.isFile()) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
