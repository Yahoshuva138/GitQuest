---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 08: GitHub and Remotes'
---

# ☁️ Chapter 08: Cloud Collaboration with GitHub
### Linking Local Repositories to the World with Remotes
**GitQuest RPG • A GitQuest Adventure**

---

## 📡 What is a Remote?

* A **remote** is a Git repository hosted on a server on the internet or network.
* The default name given to your primary remote repository is **`origin`**.
* A remote URL looks like:
  * HTTPS: `https://github.com/username/repository.git`
  * SSH: `git@github.com:username/repository.git`

---

## 💻 Working with Remotes

```bash
# Add a remote repository named origin
git remote add origin https://github.com/username/repo.git

# View configured remotes and their URLs
git remote -v

# Push local main branch to origin and set upstream tracking (-u)
git push -u origin main

# Pull latest commits from teammates
git pull origin main
```
