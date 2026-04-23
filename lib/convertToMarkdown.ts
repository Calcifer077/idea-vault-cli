import { Idea } from "./types.js";

export function ideasToMarkdown(ideas: Idea[]): string {
  let md = `# Project Ideas Collection\n\n`;

  ideas.forEach((idea) => {
    md += `## ${idea.title}\n\n`;

    md += `#### ID\n`;
    md += `${idea.id}\n\n`;

    md += `### Description\n`;
    md += `${idea.description}\n\n`;

    md += `### Summary\n`;
    md += `${idea.summary}\n\n`;

    md += `#### Tags\n`;
    md += `${idea.tags.join(", ")}\n\n`;

    md += `#### Tech Stack\n`;
    md += `${idea.techStack.join(", ")}\n\n`;

    md += `#### Created_At\n`;
    md += `${idea.createdAt}\n\n`;

    md += `---\n\n`;
  });

  return md;
}
