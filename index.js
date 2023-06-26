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

const fileManagerService = new FileManagerService(homeDir);
fileManagerService.printWorkingDir();
rl.prompt();

rl.on("line", async (input) => {
  if (input.trim() === ".exit") {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  }

  try {
    await fileManagerService.executeCommand(input);
  } catch (error) {
    console.log(error.message);
  }

  fileManagerService.printWorkingDir();
  rl.prompt();
});

process.on("beforeExit", () => {
  console.log(`\n\nThank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
