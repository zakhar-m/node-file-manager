import * as commands from "./commands/index.js";

class FileManagerService {
  static _availableCommands = new Map();

  static registerCommand(commandName, commandObject) {
    this._availableCommands.set(commandName, commandObject);
  }

  constructor(homeDir) {
    this.currentWorkingDir = homeDir;
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

FileManagerService.registerCommand("ls", commands.lsCommand);
FileManagerService.registerCommand("up", commands.upCommand);
FileManagerService.registerCommand("cd", commands.cdCommand);
FileManagerService.registerCommand("cat", commands.catCommand);
FileManagerService.registerCommand("add", commands.addCommand);
FileManagerService.registerCommand("rn", commands.rnCommand);
FileManagerService.registerCommand("rm", commands.rmCommand);
FileManagerService.registerCommand("cp", commands.cpCommand);
FileManagerService.registerCommand("mv", commands.mvCommand);
FileManagerService.registerCommand("os", commands.osCommand);
FileManagerService.registerCommand("hash", commands.hashCommand);
FileManagerService.registerCommand("compress", commands.compressCommand);
FileManagerService.registerCommand("decompress", commands.decompressCommand);

export default FileManagerService;
