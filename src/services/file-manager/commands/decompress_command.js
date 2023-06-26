import path from "node:path";
import { lstat } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

import CliUtils from "../../../utils/cli_utils.js";

export const decompressCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    await decompressCommand.validate(args, this.currentWorkingDir);

    try {
      const filePath = path.resolve(this.currentWorkingDir, args[0]);
      const decompressedFilePath = path.resolve(
        this.currentWorkingDir,
        args[1]
      );

      const decompressBrotli = createBrotliDecompress();
      const rStream = createReadStream(filePath);
      const wStream = createWriteStream(decompressedFilePath);

      await pipeline(rStream, decompressBrotli, wStream);
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

      const fileStat = await lstat(filePath);

      if (!fileStat.isFile()) {
        throw new Error("Operation failed");
      }
    } catch {
      throw new Error("Operation failed");
    }
  },
};
