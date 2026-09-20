---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 06: Branching in Git'
---

# 🌿 Chapter 06: Branching & Parallel Timelines
### Isolated Feature Development Without Breaking Production
**GitQuest RPG • A GitQuest Adventure**

---

## 🧭 What is a Branch?

* In Git, a branch is simply a **lightweight movable pointer** to a commit.
* Creating a branch takes milliseconds and uses virtually zero disk space.
* **HEAD** is a pointer that indicates which branch you are currently on.

```text
       (feature/login)
          C3 ── C4  [HEAD]
         /
C1 ── C2  (main)
```

---

## 💻 Modern Branching Commands

```bash
# Create AND switch to a new branch in one command
git switch -c feature/login

# Switch back to an existing branch
git switch main

# List all local branches (* indicates current HEAD)
git branch

# Delete a merged branch
git branch -d feature/login
```

> **Pro Tip**: Use `git switch` instead of legacy `git checkout` for clean, safe branch navigation!
