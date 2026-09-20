---
marp: true
theme: default
paginate: true
header: 'GitQuest • Git & GitHub Curriculum'
footer: 'Chapter 10: CI/CD Pipelines with GitHub Actions'
---

# ⚡ Chapter 10: CI/CD Pipelines with GitHub Actions
### Automated Sentinels, Test Runners, and Continuous Delivery
**GitQuest RPG • A GitQuest Adventure**

---

## 🤖 What is CI/CD?

* **Continuous Integration (CI)**: Automatically building and running test suites on every `git push` or `pull request` to detect regressions immediately.
* **Continuous Delivery (CD)**: Automatically deploying verified, tested builds to production or staging environments without manual intervention.

---

## ⚙️ GitHub Actions Workflow Anatomy

Workflows live inside `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4
      - name: Install dependencies
        run: npm install
      - name: Run test suite
        run: npm test
```

---

## 🏆 Key Takeaways

1. Automated pipelines catch bugs before they ever reach real users.
2. A **Green Checkmark** on GitHub means all automated tests, linters, and builds passed.
3. You have mastered Git from your first `git init` to automated continuous cloud deployment!
