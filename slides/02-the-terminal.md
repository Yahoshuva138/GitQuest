---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 02: The Terminal & Navigation'
---

# 💻 Chapter 02: The Command Line & Navigation
### Mastering the Shell, Directories, and Paths
**GitQuest RPG • A GitQuest Adventure**

---

## 🧭 Why the Command Line?

* GUIs hide what is actually happening. The CLI gives you direct, scriptable control.
* Every cloud server, container, and CI/CD runner runs on a headless terminal.
* Once you master basic terminal navigation, Git becomes fast and natural.

---

## 📂 Core Navigation Commands

```bash
# Print Working Directory: where am I right now?
pwd

# List files and folders in current directory
ls

# List ALL files including hidden dotfiles (.git, .gitignore)
ls -la

# Change Directory: move into a folder
cd my-project

# Move back up one directory level
cd ..
```

---

## 🔍 Understanding Hidden Files (`.git`)

* In Unix-like systems and PowerShell, any file or folder starting with a period (`.`) is hidden.
* The `.git` directory contains the complete Git object database.
* **Never** delete `.git` unless you want to completely erase the history of the repository!
