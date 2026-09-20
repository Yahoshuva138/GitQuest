---
marp: true
theme: default
paginate: true
header: 'GitQuest • Codédex Git & GitHub Curriculum'
footer: 'Chapter 03: Initializing Your First Repository'
---

# 📦 Chapter 03: Initializing Your First Repository
### Turning Any Folder into a Living Version-Controlled Project
**GitQuest RPG • A Codédex Adventure**

---

## ⚡ What is `git init`?

* `git init` is the spark of creation in Git.
* It initializes a brand new Git repository in your current directory.
* It creates the hidden `.git/` folder containing:
  * `HEAD`: Refers to the current active branch
  * `config`: Repo-specific settings
  * `objects/`: The database of blobs, trees, and commits
  * `refs/`: Pointers to branches and tags

---

## 💻 Commands

```bash
# Create a new project folder
mkdir my-new-game
cd my-new-game

# Initialize Git repository
git init

# Verify that .git exists
ls -la
```

> **Important**: Run `git init` only **once** per project at the root level! Never run `git init` inside another existing Git repository.
