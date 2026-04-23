import { Command } from "commander";
import { listCommand } from "./commands/list.js";
import { createCommand } from "./commands/create.js";
import { updateCommand } from "./commands/update.js";
import { deleteCommand } from "./commands/delete.js";

const program = new Command();

program
  .name("ideas")
  .description("CLI for managing your Idea Vault")
  .version("1.0.0");

program.addCommand(listCommand);
program.addCommand(deleteCommand);
program.addCommand(createCommand);
program.addCommand(updateCommand);

program.parse(process.argv);

// npx tsx cli/index.ts list
