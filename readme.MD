# Idea Vault – Your Personal Idea Management System

A clean, modern **idea management app + CLI** that lets you store, organize, and manage ideas in one central place — powered by a GitHub repository using **Markdown files**.

---

## 🚀 Tech Stack

- **TypeScript**
- **Marked** → Markdown parser
- **Commander** → CLI Command handling
- **Chalk** → Terminal Styling
- **Inquirer** → Interactive prompts

---

## ✨ Core Idea

Instead of storing ideas in a database, **Idea Vault uses a GitHub repository as the source of truth**, where:

- Each idea is stored in a **Markdown file**
- Your repo becomes your **portable, version-controlled idea database**
- You can access and edit ideas via:
  - 🌐 Web App (UI) [[Check it out]](https://github.com/Calcifer077/idea-vault)
  - 💻 CLI

---

## Features

Interact with your idea vault directly from the terminal:

- Create new ideas
- View existing ideas
- Update content
- Delete ideas
- Interactive prompts using `inquirer`
- Styled terminal output with `chalk`

### 💻 Have also implmented Web Aplication, you can check it out here: [[Github Repo]](https://github.com/Calcifer077/idea-vault)

---

## 📦 Quick start

- You will need to setup tokens for github. In my case I have used a seperate repo to store ideas, you can use the same repo, just have to pull every time you push something in your ideas.

### 1. Clone the Repository

```bash
git clone https://github.com/Calcifer077/idea-vault-cli.git
cd idea-vault-cli
```

### 2. Install Dependencies

```bash
npm install
# or yarn / pnpm / bun install
```

### 3. Run the Development Server

```bash
npm run <ACCORDING_TO_YOUR_USE_CASE>
```

**Look at your CLI**

### .env exmpale

```bash
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
GITHUB_OWNER=YOUR_GITHUB_USERNAME
GITHUB_REPO=YOUR_GITHUB_REPO
GITHUB_FILE_PATH=PATH_TO_YOUR_FILE
GITHUB_BRANCH=GITHUB_BRANCH
```

---

## 📁 Project Structure

```
idea-vault-cli/
├── .gitignore
├── commands/
│   ├── create.ts
│   ├── delete.ts
│   ├── list.ts
│   └── update.ts
├── index.ts
├── lib/
│   ├── convertToMarkdown.ts
│   ├── github.ts
│   ├── parseMarkdown.ts
│   ├── store.ts
│   └── types.ts
├── package.json
├── pnpm-lock.yaml
├── readme.MD
└── tsconfig.json
```

---

## ⚙️ Scripts

```bash
npm run list      # lists all ideas
npm run create    # create new ideas
npm run update    # update ideas
npm run delete    # delete ideas
```

---

## 📌 Future Ideas

- Make a mobile app

---

If you find this project useful, consider giving it a ⭐

---
