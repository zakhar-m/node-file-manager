import { readdir } from "node:fs/promises";

import CliUtils from "../../../utils/cli_utils.js";

export const lsCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    lsCommand.validate(args);

    const files = await readdir(this.currentWorkingDir, {
      withFileTypes: true,
    });

    const rows = files
      .map((file) => ({
        Name: file.name,
        Type: file.isFile() ? "file" : "directory",
      }))
      .sort((a, b) => {
        if (a.Type === b.Type) {
          return a.Name < b.Name ? -1 : 1;
        } else {
          return a.Type < b.Type ? -1 : 1;
        }
      });

    console.table(rows);
  },

  validate(args) {
    if (args.length) {
      throw new Error("Invalid input");
    }
  },
};
