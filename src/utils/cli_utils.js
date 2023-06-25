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
}

export default CliUtils;
