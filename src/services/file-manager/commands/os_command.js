import path from "node:path";
import os from "node:os";

import CliUtils from "../../../utils/cli_utils.js";

export const osCommand = {
  async execute(commandStr) {
    const args = CliUtils.parseArgs(commandStr);

    osCommand.validate(args);

    switch (args[0]) {
      case "--EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "--cpus":
        const cpus = os.cpus().map((cpu) => ({
          Model: cpu.model.trim(),
          "Clock rate (GHz)": cpu.speed / 1000,
        }));

        console.log(`Overall amount of CPUS: ${cpus.length}`);
        console.table(cpus);
        break;
      case "--homedir":
        console.log(os.homedir());
        break;
      case "--username":
        console.log(os.userInfo().username);
        break;
      case "--architecture":
        console.log(os.arch());
        break;
      default:
        throw new Error("Invalid input");
    }
  },

  validate(args) {
    if (args.length !== 1) {
      throw new Error("Invalid input");
    }
  },
};
