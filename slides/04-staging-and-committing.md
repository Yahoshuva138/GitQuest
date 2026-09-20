---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 04: Staging and Committing'
---

# 📸 Chapter 04: Staging & Two-Phase Commits
### Crafting Atomic, Intentional Snapshots
**GitQuest RPG • A GitQuest Adventure**

---

## 🎯 The Staging Concept

* In Git, a commit is a **two-step process**:
  1. **Stage**: Choose which files belong in the snapshot using `git add`.
  2. **Commit**: Seal the snapshot permanently with `git commit -m "<message>"`.
* Why not commit everything at once?
  * You might have modified 5 files, but only 2 of them are ready for review.
  * Staging allows **atomic commits**: small, focused units of work.

---

## 💻 Staging and Committing Syntax

```bash
# Stage a specific file
git add index.html

# Stage multiple files
git add app.js styles.css

# Stage all modified and new files
git add .

# Commit with an imperative message
git commit -m "feat: Add responsive navigation bar"
```

---

## ✍️ How to Write Great Commit Messages

* **Bad**: `stuff`, `fixed bug`, `wip`, `update`
* **Good**: `feat: Add login validation for email format`
* **Good**: `fix: Correct off-by-one error in pagination calculation`
* **Good**: `docs: Update setup instructions in README.md`

> **Rule of Thumb**: Complete the sentence: *"If applied, this commit will..."*
