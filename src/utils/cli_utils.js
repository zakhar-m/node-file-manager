import { access } from "node:fs/promises";
class CliUtils {
  static parseArgs(commandStr) {
    const parsedCommand = commandStr.match(/[\""].+?[\""]|[^ ]+/g);
    return parsedCommand.splice(1).map((arg) => {
      if (arg.startsWith('"') && arg.endsWith('"')) {
        return arg.slice(1, -1);
      }
      return arg;
    });
  }

  static async fileOrDirExists(path) {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }

  static isValidFileName(fileName) {
    const reservedChars = /[\<\>\:\"\/\\\|\?\*]/;
    return !reservedChars.test(fileName);
  }
}

export default CliUtils;
