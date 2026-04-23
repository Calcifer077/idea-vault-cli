export type Idea = {
  id: string;
  title: string;
  description: string;
  summary: string;
  tags: string[];
  techStack: string[];
  syncStatus: "synced" | "pending" | "local";
  createdAt: string;
};

export type Project = {
  name: string;
  points: string[];
  tags: string[];
  techStack: string[];
};
