import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { randomUUID } from "node:crypto";
import { loadIdeas, saveIdeas } from "../lib/store.js";

export const createCommand = new Command("create")
  .description("Create a new idea")
  .option("-t, --title <title>", "Idea title")
  .option("-d, --description <description>", "Idea description")
  .option("-T, --tags <tags>", "Idea tags")
  .option("-S, --techStack <techStack>", "Idea tech stack")
  .action(
    async (opts: {
      title: string;
      description: string;
      tags: string;
      techStack: string;
    }) => {
      try {
        //   console.log(chalk.dim(`Creating idea: ${title}`));
        // Implement the create logic here

        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "Title:",
            when: !opts.title,
            validate: (v) => v.trim() !== "" || "Title is required",
          },
          {
            type: "input",
            name: "description",
            message: "Description:",
            when: !opts.description,
            validate: (v) => v.trim() !== "" || "Description is required",
          },
          {
            type: "input",
            name: "tags",
            message: "Tags (comma-separated):",
            when: !opts.tags,
          },
          {
            type: "input",
            name: "techStack",
            message: "Tech Stack (comma-separated):",
            when: !opts.techStack,
          },
        ]);

        const title = opts.title || answers.title;
        const description = opts.description || answers.description;
        const tagsRaw: string = opts.tags || answers.tags || "";
        const techStackRaw: string = opts.techStack || answers.techStack || "";

        const newIdea = {
          id: randomUUID().toString(),
          title: title.trim() || "Untitled",
          description: description.trim() || "No description provided",
          summary: "", // summary generation requires Gemini — skipped in CLI
          tags:
            tagsRaw
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean) || [],
          techStack:
            techStackRaw
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean) || [],
          syncStatus: "synced" as const,
          createdAt: new Date().toISOString(),
        };

        console.log(chalk.dim("\nFetching current ideas..."));
        const { ideas, sha } = await loadIdeas();
        ideas.push(newIdea);

        console.log(chalk.dim("Saving new idea to GitHub..."));

        await saveIdeas(ideas, sha, `Add idea: ${newIdea.title}`);

        console.log(chalk.green("Idea created successfully!"), newIdea);
      } catch (error) {
        console.error(
          chalk.red("Error:"),
          error instanceof Error ? error.message : String(error),
        );
        process.exit(1);
      }
    },
  );
