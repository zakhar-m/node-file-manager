class CliUtils {
  static parseArgs(commandStr) {
    const parsedCommand = commandStr.match(/[\""].+?[\""]|[^ ]+/g);
    return parsedCommand.splice(1);
  }
}

export default CliUtils;
