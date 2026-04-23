import { Command } from "commander";
import rawlist from "@inquirer/rawlist";
import chalk from "chalk";
import { loadIdeas, saveIdeas } from "../lib/store.js";

export const deleteCommand = new Command("delete")
  .description("Delete an idea by ID")
  .action(async () => {
    console.log(chalk.dim("Fetching ideas from GitHub..."));
    const { ideas, sha } = await loadIdeas();

    if (ideas.length === 0) {
      console.log(chalk.yellow("No ideas found."));
      return;
    }

    console.log("Use arrow keys to select an idea to delete:");

    try {
      const answer = await rawlist({
        message: "Select a ID to be deleted:",
        choices: ideas.map((idea) => ({
          name: `ID: ${idea.id} - Title: ${idea.title}`,
          value: idea.id,
        })),
      });

      const idToDelete = answer?.trim();

      const idea = ideas.find((idea) => idea.id === idToDelete);

      if (!idea) {
        console.log(chalk.red("Idea not found."));
        return;
      }

      console.log(chalk.dim(`Deleting idea with ID: ${idToDelete}...`));

      const newIdeas = ideas.filter((idea) => idea.id !== idToDelete);

      console.log(chalk.dim("Saving updated ideas to GitHub..."));
      await saveIdeas(newIdeas, sha, `Deleted idea with ID: ${idToDelete}`);

      console.log(chalk.green("Idea deleted successfully!"));
    } catch (error) {
      console.error(
        chalk.red("Error:"),
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  });
