import { Command } from "commander";
import inquirer from "inquirer";
import rawlist from "@inquirer/rawlist";
import chalk from "chalk";
import { loadIdeas, saveIdeas } from "../lib/store";
import { Idea } from "../../app/_lib/types";

export const updateCommand = new Command("update")
  .description("Update an idea by ID")
  .option("--id <id>", "ID of the idea to update")
  .option("--title [title]", "Title of the idea")
  .option("--description [description]", "Description of the idea")
  .option("--tags [tags]", "Tags of the idea")
  .option("--techStack [techStack]", "Tech Stack of the idea")
  .option("--summary [summary]", "Summary of the idea")
  .action(
    async (opts: {
      id: string;
      title?: string;
      description?: string;
      tags?: string;
      techStack?: string;
      summary?: string;
    }) => {
      console.log("If you don't want to update anything. Just press enter.");
      try {
        console.log(chalk.dim("Fetching ideas..."));
        const { ideas, sha } = await loadIdeas();

        if (ideas.length === 0) {
          console.log(chalk.yellow("No ideas found"));
          return;
        }

        console.log("Use arrow keys to select an idea to update.");
        const idToUpdate = await rawlist({
          message: "Select an ID to update:",
          choices: ideas.map((idea) => ({
            name: `ID: ${idea.id} - Title: ${idea.title}`,
            value: idea.id,
          })),
        });

        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "Updated title: ",
            when: !opts.title,
          },
          {
            type: "input",
            name: "description",
            message: "Updated Description: ",
            when: !opts.description,
          },
          {
            type: "input",
            name: "summary",
            message: "Updated summary: ",
            when: !opts.summary,
          },
          {
            type: "input",
            name: "tags",
            message: "Updated tags (comma-separated): ",
            when: !opts.tags,
          },
          {
            type: "input",
            name: "techStack",
            message: "Updated tech stack (comma-separated): ",
            when: !opts.techStack,
          },
        ]);

        const idea = ideas.find((idea) => idea.id === idToUpdate);

        if (!idea) {
          console.log(chalk.red("Idea not found."));
          return;
        }

        const updatedTitle: string =
          opts.title?.trim() || answers.title?.trim() || idea.title;
        const updatedDescription: string =
          opts.description?.trim() ||
          answers.description?.trim() ||
          idea.description;
        const updatedSummary: string =
          opts.summary?.trim() || answers.summary?.trim() || idea.summary;

        const updatedTags: string[] = opts.tags?.trim()
          ? opts.tags
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : answers.tags?.trim()
            ? answers.tags
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean)
            : idea.tags;

        const updatedTechStack: string[] = opts.techStack?.trim()
          ? opts.techStack
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : answers.techStack?.trim()
            ? answers.techStack
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean)
            : idea.techStack;

        const newIdea: Idea = {
          ...idea,
          id: idToUpdate,
          title: updatedTitle,
          description: updatedDescription,
          summary: updatedSummary,
          tags: updatedTags,
          techStack: updatedTechStack,
        };

        const updatedIdeas: Idea[] = ideas.map((idea) =>
          idea.id === idToUpdate ? newIdea : idea,
        );

        console.log(chalk.dim("Saving new idea to GitHub..."));

        await saveIdeas(updatedIdeas, sha, `Update idea: ${newIdea.id}`);

        console.log(chalk.green("Idea updated successfully"), newIdea);
      } catch (error) {
        console.log(error);
        console.error(
          chalk.red("Error:"),
          error instanceof Error ? error.message : String(error),
        );
        process.exit(1);
      }
    },
  );
