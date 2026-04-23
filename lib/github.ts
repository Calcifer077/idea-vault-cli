import "dotenv/config";

const GITHUB_API = "https://api.github.com";

export async function getFileContent() {
  const res = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store", // or use revalidate if you want caching
    },
  );

  if (!res.ok) throw new Error("Failed to fetch file");

  const data = await res.json();
  // data.content is base64 encoded
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  const sha = data.sha; // needed for updating

  return { content, sha };
}

export async function updateFile(
  newContent: string,
  sha: string,
  message?: string,
) {
  const readableDate = new Date(Date.now())
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);
  const finalMessage = message || `Update via Next.js app - ${readableDate}`;

  const encodedContent = Buffer.from(newContent).toString("base64");

  const res = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: finalMessage,
        content: encodedContent,
        sha, // required for updates
        branch: process.env.GITHUB_BRANCH,
      }),
    },
  );

  if (!res.ok) throw new Error("Failed to update file");
  return res.json();
}
