---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 01: Introduction to Git & Version Control'
---

# 🚀 Chapter 01: Welcome to Git & Version Control
### The Origin of Distributed Snapshots and Time-Traveling in Code
**GitQuest RPG • A GitQuest Adventure**

---

## 🧭 What is Version Control?

* **Version Control** is a system that records changes to files over time so you can recall specific versions later.
* **The Old Way (Chaos)**:
  * `project_final.zip`
  * `project_final_v2.zip`
  * `project_final_really_final_fix.zip`
* **The Git Way (Harmony)**:
  * Complete, cryptographic commit history
  * Every change is tracked by author, timestamp, and purpose
  * Instant rollback to any point in the past

---

## ⚡ Git vs. GitHub

| Feature | Git | GitHub |
| :--- | :--- | :--- |
| **Type** | Local CLI tool on your machine | Cloud hosting & collaboration platform |
| **Connection** | 100% offline | Requires internet |
| **Purpose** | Tracks changes, branches, commits | Pull Requests, Issues, CI/CD Actions |
| **Creator** | Linus Torvalds (2005) | Chris Wanstrath, PJ Hyett, Tom Preston-Werner (2008) |

> **Key Takeaway**: Git is the engine in your car; GitHub is the highway system.

---

## 📦 The Three States of Git

Files in a Git project exist in one of three areas:

```text
+--------------------+       git add       +--------------------+      git commit      +--------------------+
| WORKING DIRECTORY  |  ─────────────────▶ |    STAGING AREA    | ───────────────────▶ |   GIT REPOSITORY   |
|   (Files on disk)  |                     |  (Index snapshot)  |                      |  (.git permanent)  |
+--------------------+                     +--------------------+                      +--------------------+
```

1. **Working Directory**: Modifying and untracked files on your disk.
2. **Staging Area**: Files selected to be included in the next commit.
3. **Repository**: Sealed, permanent snapshots saved in the `.git` directory.

---

## 💻 Essential Commands

```bash
# Check the status of your working tree and staging area
git status

# Inspect installed Git version
git --version

# View documentation for any command
git help <command>
```

> **Pro Tip**: Run `git status` before and after every single action until it becomes second nature!

---

## 🎯 Hands-on Mission Quest

* **Quest Objective**: Awaken on the shores of The Origin Coast, inspect your repository, and uncover the hidden `.git` database!
* **Reward**: `+150 XP` • `🪙 30 Coins` • `💎 The Initializer Crystal`
* **Launch**: Open GitQuest ➔ Quests ➔ *Mission 01: Meet Git*
