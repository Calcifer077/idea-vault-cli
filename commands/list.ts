import { Command } from "commander";
import chalk from "chalk";
import { loadIdeas } from "../lib/store";

export const listCommand = new Command("list")
  .description("List all ideas")
  .option("--json", "Output as raw JSON")
  .action(async (opts) => {
    try {
      console.log(chalk.dim("Fetching ideas from GitHub..."));
      const { ideas, sha } = await loadIdeas();

      if (ideas.length === 0) {
        console.log(chalk.yellow("No ideas found."));
        return;
      }

      if (opts.json) {
        console.log(JSON.stringify(ideas, null, 2));
        return;
      }

      console.log(chalk.bold(`\n📦 ${ideas.length} idea(s) found:\n`));

      ideas.forEach((idea, i) => {
        console.log(
          chalk.blue.bold(`${i + 1}. ${idea.title}`) +
            chalk.dim(` [${idea.id}]`),
        );

        console.log(
          chalk.cyan("    Description: ") +
            chalk.dim(
              `${idea.description.split("\n")[0]}${idea.description.length > 100 ? "..." : ""}`,
            ),
        );

        console.log(
          chalk.cyan("    Tags: ") +
            chalk.dim(
              `${idea.tags.length ? idea.tags.join(", ") : "No tags found"}`,
            ),
        );

        console.log(
          chalk.cyan("    Tech Stack: ") +
            chalk.dim(
              `${idea.techStack.length ? idea.techStack.join(", ") : "No tech stack found"}`,
            ),
        );

        console.log(
          chalk.cyan("    Created: ") +
            chalk.dim(`${new Date(idea.createdAt).toLocaleDateString()}`),
        );

        console.log();
      });
    } catch (error) {
      console.error(
        chalk.red("Error:"),
        error instanceof Error ? error.message : String(error),
      );

      process.exit(1);
    }
  });
