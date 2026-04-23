import { getFileContent, updateFile } from "./github.js";
import { Idea } from "./types.js";
import { parseMarkdownToIdeas } from "./parseMarkdown.js";
import { ideasToMarkdown } from "./convertToMarkdown.js";

export async function loadIdeas(): Promise<{ ideas: Idea[]; sha: string }> {
  const { content, sha } = await getFileContent();
  const ideas = parseMarkdownToIdeas(content);
  return { ideas, sha };
}

export async function saveIdeas(
  ideas: Idea[],
  sha: string,
  message?: string,
): Promise<void> {
  const markdown = ideasToMarkdown(ideas);

  await updateFile(markdown, sha, message || "Update from CLI");
}
