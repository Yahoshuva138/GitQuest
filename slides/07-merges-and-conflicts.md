---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 07: Merging and Conflicts'
---

# ⚔️ Chapter 07: Merging & Conflict Resolution
### Fast-Forward, 3-Way Merges, and Decoding Conflict Markers
**GitQuest RPG • A GitQuest Adventure**

---

## 🤝 Merging Branches

* **Fast-Forward Merge**: When `main` hasn't had any new commits, Git just moves the branch pointer forward.
* **3-Way Merge**: When both `main` and your feature branch have new commits, Git creates a new merge commit.

```bash
# 1. Switch to the branch you want to merge INTO
git switch main

# 2. Merge your feature branch
git merge feature/login
```

---

## 💥 What Causes a Merge Conflict?

* A conflict happens when two branches modify the **exact same lines of the same file**, and Git cannot determine which version is correct.
* Git halts the merge and inserts **conflict markers**:

```diff
<<<<<<< HEAD
const apiUrl = "https://api.staging.internal";
=======
const apiUrl = "https://api.production.com";
>>>>>>> feature/prod-endpoints
```

---

## 🛡️ Resolving the Conflict

1. Open the file in your editor.
2. Decide which code to keep (or combine both).
3. **Delete the marker lines** (`<<<<<<<`, `=======`, `>>>>>>>`).
4. Save the file.
5. Stage and commit the resolution:
   ```bash
   git add app.js
   git commit -m "fix: Resolve API URL conflict between staging and prod"
   ```
