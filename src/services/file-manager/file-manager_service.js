import {
  lsCommand,
  upCommand,
  cdCommand,
  catCommand,
  addCommand,
  rnCommand,
  rmCommand,
} from "./commands/index.js";

class FileManagerService {
  static _availableCommands = new Map();

  static registerCommand(commandName, commandObject) {
    this._availableCommands.set(commandName, commandObject);
  }

  constructor(homeDir, userName) {
    this.currentWorkingDir = homeDir;
    this._userName = userName;
  }

  /**
   * Prints current working directory
   */
  printWorkingDir() {
    console.log(`You are currently in ${this.currentWorkingDir}`);
  }

  /**
   * Executes passed command
   * @param {string} commandStr
   * @returns {Promise}
   */
  async executeCommand(commandStr) {
    const commandName = commandStr.split(" ")[0];

    const command = FileManagerService._availableCommands.get(commandName);

    if (command) {
      await command.execute.call(this, commandStr);
    } else {
      throw new Error("Invalid input");
    }
  }
}

FileManagerService.registerCommand("ls", lsCommand);
FileManagerService.registerCommand("up", upCommand);
FileManagerService.registerCommand("cd", cdCommand);
FileManagerService.registerCommand("cat", catCommand);
FileManagerService.registerCommand("add", addCommand);
FileManagerService.registerCommand("rn", rnCommand);
FileManagerService.registerCommand("rm", rmCommand);

export default FileManagerService;
