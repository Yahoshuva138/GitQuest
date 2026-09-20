---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 05: History and Diffs'
---

# 🔍 Chapter 05: Inspecting History & Diffs
### Reading the Ledger with git log and git diff
**GitQuest RPG • A GitQuest Adventure**

---

## 📜 What is `git log`?

* `git log` displays the chronological ledger of all commits in the current branch.
* Each commit entry contains:
  * **SHA-1 Hash**: 40-character unique fingerprint (e.g. `f50a0ca...`)
  * **Author**: Name and email of who created the commit
  * **Date**: Exact timestamp
  * **Commit Message**: Description of what changed

---

## 💻 Inspecting History

```bash
# Standard detailed log
git log

# One-line compact summary (Recommended for daily use)
git log --oneline

# Graphical representation of branch splits and merges
git log --oneline --graph --all
```

---

## 🔍 Line Diffs with `git diff`

* `git diff`: Compares your **working directory** against the **staging area**.
* `git diff --staged`: Compares your **staging area** against the **latest commit (HEAD)**.
* **Green (+) lines**: Characters or lines added.
* **Red (-) lines**: Characters or lines deleted.
