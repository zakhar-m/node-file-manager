import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import os from "node:os";

import FileManagerService from "./src/services/file-manager/file-manager_service.js";

const rl = readline.createInterface({ input, output });
const homeDir = os.homedir();
const args = process.argv.slice(2);

let userName = "Anonymous";
if (args[0]) {
  const [argName, value] = args[0].split("=");
  if (argName === "--username" && value) {
    userName = value;
  }
}
console.log(`Welcome to the File Manager, ${userName}!`);

const fileManagerService = new FileManagerService(homeDir, userName);
fileManagerService.printWorkingDir();

rl.on("line", async (input) => {
  try {
    await fileManagerService.executeCommand(input);
  } catch (error) {
    console.log(error.message);
  }

  fileManagerService.printWorkingDir();
});
