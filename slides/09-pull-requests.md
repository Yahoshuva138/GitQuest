---
marp: true
theme: default
paginate: true
header: 'GitQuest • Codédex Git & GitHub Curriculum'
footer: 'Chapter 09: Pull Requests'
---

# 🤝 Chapter 09: Pull Requests & Code Reviews
### The Collaborative Heart of Software Teams
**GitQuest RPG • A Codédex Adventure**

---

## 🎯 What is a Pull Request (PR)?

* A Pull Request is a request to the repository maintainers to **pull** changes from your feature branch into the target branch (e.g. `main`).
* It is a dedicated space to:
  * Discuss the proposed implementation
  * Review line-by-line diffs
  * Run automated CI checks
  * Request changes or approve with an **LGTM** (*Looks Good To Me*)

---

## 📋 The PR Lifecycle

```text
1. Branch Off       ──▶  git switch -c feature/cool-feature
2. Commit & Push    ──▶  git push -u origin feature/cool-feature
3. Open PR          ──▶  Open PR on GitHub with clear summary & screenshots
4. Code Review      ──▶  Teammates comment, review, and request changes
5. Merge & Ship     ──▶  Squash & Merge into main branch!
```

---

## 💡 Code Review Best Practices

* **For Authors**: Keep PRs small (< 300 lines of diff). Explain *why*, not just *what*.
* **For Reviewers**: Be kind, respectful, and constructive. Praise clever solutions and explain the rationale behind suggestions.
