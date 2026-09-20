# GitQuest — Learn Git & GitHub by Playing

> **"Don't teach Git by showing a list of commands. Teach Git by making the learner need the command."**

GitQuest is a developer-focused, highly interactive educational web application that teaches Git and GitHub from absolute beginner to advanced level through **situations, visual simulations, missions, challenges, and an authentic in-browser Git engine**.

---

## 🎮 Features

* **In-Browser Git Engine**: Deterministic state machine simulating working directory, staging area, commit objects (SHA hashes, DAG parent pointers, diffs), branches, HEAD, remotes, and stash.
* **Architecture Pipeline Visualizer**: Live 4-zone model:
  `WORKING DIRECTORY ➔ STAGING AREA ➔ LOCAL REPOSITORY ➔ GITHUB CLOUD`.
* **Interactive Commit Graph (DAG)**: Clickable commit nodes with full SHA, author, timestamp, parent hashes, and line-by-line diff inspector.
* **Branch Lab**: Create, switch, commit on, and merge branches with dynamic visual branch graphs (supporting fast-forward and 3-way merges).
* **3-Way Merge Conflict Game**: Interactive conflict editor with side-by-side comparison (`HEAD` vs `incoming` vs conflict preview) and custom resolution.
* **Simulated GitHub Lab**: Explore Code, Issues, Pull Requests (with code review feedback, approval, and squash & merge), and Actions (automated CI/CD build & test pipeline).
* **Missions & Learning Progression**: Structured missions spanning 8 levels with hints, pedagogical explanations ("WHAT HAPPENED? WHY?"), and persistent skill tracking.
* **Developer-Centric Design**: VS Code & GitHub inspired theme (slate dark mode, monospace code, tactile controls).

---

## 🚀 Quick Start

### Prerequisites

* Node.js (v18+)
* npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Yahoshuva138/GitQuest.git

# Navigate into project directory
cd GitQuest

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Lucide Icons**
* **Canvas Confetti**

---

## 📄 License

MIT License
