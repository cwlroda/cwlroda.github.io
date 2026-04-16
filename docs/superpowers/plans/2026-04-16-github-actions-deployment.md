# GitHub Actions Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and deploy a GitHub Actions workflow that automatically builds the React app on every dev push and deploys to master.

**Architecture:** Single workflow file that runs on `dev` push, performs npm build, and commits/pushes built files to `master` branch using GITHUB_TOKEN.

**Tech Stack:** GitHub Actions, Node 16, npm, git

---

## File Structure

**Create:**
- `.github/workflows/deploy.yml` — Main deployment workflow

**Files not modified:**
- `package.json` — Build scripts already exist
- `.gitignore` — No changes needed
- Branches — No changes, just commits/pushes

---

## Implementation Tasks

### Task 1: Create .github directory structure

**Files:**
- Create: `.github/workflows/` directory

- [ ] **Step 1: Create directories**

```bash
mkdir -p /home/cwlroda/projects/cwlroda.github.io/.github/workflows
```

Expected output: Directory created (no error output)

- [ ] **Step 2: Verify structure**

```bash
ls -la /home/cwlroda/projects/cwlroda.github.io/.github/
```

Expected output:
```
total N
drwxr-xr-x workflows
```

---

### Task 2: Write the GitHub Actions workflow file

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write the complete deploy.yml workflow**

Create `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to Master

on:
  push:
    branches:
      - dev

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # Phase 1: Setup
      - name: Checkout dev branch
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Set up Node.js 16
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm ci
      
      # Phase 2: Build
      - name: Sync snailstrail game
        run: npm run snailstrail:sync
      
      - name: Build React app
        run: npm run build
      
      # Phase 3: Deploy
      - name: Configure git user
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898952+github-actions[bot]@users.noreply.github.com"
      
      - name: Checkout master branch
        run: git checkout master
      
      - name: Clean master directory (except .git and .github)
        run: |
          find . -maxdepth 1 -type f -delete
          find . -maxdepth 1 -type d ! -name '.git' ! -name '.github' ! -name 'build' -exec rm -rf {} + 2>/dev/null || true
      
      - name: Copy build output to master root
        run: cp -r build/* .
      
      - name: Get dev commit hash
        id: dev-commit
        run: git rev-parse --short HEAD
      
      - name: Commit to master
        run: |
          git add -A
          git commit -m "Deploy: Update website from dev [${{ steps.dev-commit.outputs.stdout }}]"
        continue-on-error: true
      
      - name: Push to master
        run: git push origin master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Expected: File created with exact content

- [ ] **Step 2: Verify file syntax**

```bash
grep -c "name: Deploy to Master" /home/cwlroda/projects/cwlroda.github.io/.github/workflows/deploy.yml
```

Expected output: `1`

- [ ] **Step 3: Verify trigger configuration**

```bash
grep -A 3 "^on:" /home/cwlroda/projects/cwlroda.github.io/.github/workflows/deploy.yml | grep "dev"
```

Expected output: `- dev` (indicates dev branch is in trigger)

---

### Task 3: Commit the workflow file

**Files:**
- Commit: `.github/workflows/deploy.yml`

- [ ] **Step 1: Stage the workflow file**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git add .github/workflows/deploy.yml
```

Expected: No output (file staged)

- [ ] **Step 2: Verify staging**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git status
```

Expected output: `.github/workflows/deploy.yml` appears under "Changes to be committed"

- [ ] **Step 3: Create commit**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git commit -m "ci: add github actions deployment workflow

- Trigger on dev push
- Build with npm run snailstrail:sync && npm run build
- Deploy to master branch with GITHUB_TOKEN
- Clean stale files before deploying build output"
```

Expected output: Commit hash and summary of changes

- [ ] **Step 4: Verify commit in git log**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git log -1 --oneline
```

Expected output: Recent commit starting with "ci: add github actions deployment workflow"

---

### Task 4: Push workflow to dev branch

**Files:**
- Push: `.github/workflows/deploy.yml` to `origin/dev`

- [ ] **Step 1: Verify current branch**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git branch --show-current
```

Expected output: `dev`

- [ ] **Step 2: Push to origin dev**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git push origin dev
```

Expected output: 
```
To github.com:cwlroda/cwlroda.github.io.git
   <hash>..<hash>  dev -> dev
```

This push will trigger the workflow to run immediately.

- [ ] **Step 3: Verify GitHub Actions UI shows workflow**

Navigate to: `https://github.com/cwlroda/cwlroda.github.io/actions`

Expected: See "Deploy to Master" workflow running in the Actions tab

---

### Task 5: Monitor first workflow execution

**Files:**
- Monitor: `.github/workflows/deploy.yml` execution in GitHub

- [ ] **Step 1: Wait for workflow to complete**

Visit `https://github.com/cwlroda/cwlroda.github.io/actions` and wait for the workflow to finish (usually 2-4 minutes)

Expected: Green checkmark (success) or red X (failure)

- [ ] **Step 2: Check workflow logs if failed**

Click on the failed workflow run → Click the job → Review logs for:
- `npm ci` errors
- `npm run snailstrail:sync` errors
- `npm run build` errors  
- Git push errors

If errors found, diagnose and fix on dev, then push again to retry.

- [ ] **Step 3: Verify successful run**

Expected success indicators:
- Workflow shows green checkmark
- All steps completed (Setup, Build, Deploy sections)
- No error messages in logs

---

### Task 6: Verify master branch received the deployment

**Files:**
- Verify: `master` branch has new commit and build files

- [ ] **Step 1: Check master branch git log locally**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git fetch origin && git log origin/master -5 --oneline
```

Expected output: Most recent commit should start with "Deploy: Update website from dev [<hash>]"

- [ ] **Step 2: Verify build files exist on master**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git show origin/master:index.html | head -1
```

Expected output: HTML content (something like `<!doctype html>` or similar)

This confirms `index.html` exists on master (key build artifact).

- [ ] **Step 3: Check for stale files**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git ls-tree -r origin/master | grep -E "\.js$|\.css$" | head -5
```

Expected output: Should see bundled JS/CSS files from build (e.g., `main.abc123.js`)

- [ ] **Step 4: Verify .git and .github folders preserved**

```bash
cd /home/cwlroda/projects/cwlroda.github.io && git ls-tree origin/master | grep -E "^.*\.github|^.*\.git"
```

Expected output: Should see `.github` folder (and `.git` exists but isn't listed in tree)

---

### Task 7: Verify workflow doesn't trigger on master pushes

**Files:**
- Verify: Workflow only runs on `dev` branch

- [ ] **Step 1: Check GitHub Actions UI**

Navigate to: `https://github.com/cwlroda/cwlroda.github.io/actions`

Look at workflow history and verify:
- Workflows only appear when you push to `dev`
- No workflows trigger when you push to `master`
- No workflows trigger on other branches

This is automatic because the YAML has `branches: [dev]` filter.

---

### Task 8: Document workflow status and gotchas (in memory)

**Files:**
- No files to edit
- Save: Workflow information to memory

- [ ] **Step 1: Document successful deployment**

The workflow is now live and will:
- Run on every dev push
- Build the React app with snailstrail sync
- Deploy to master automatically
- Use GITHUB_TOKEN (won't trigger other workflows)

- [ ] **Step 2: Note any branch protection issues**

If the push to master fails with permission errors:
- Check if `master` has branch protection rules requiring reviews
- If yes, either:
  - Exempt github-actions[bot] from review requirements, OR
  - Disable "require pull request reviews" rule

This is the only expected failure mode after initial setup.

- [ ] **Step 3: Remember rollback procedure**

If deployed code breaks the site:
1. Checkout master locally
2. Run: `git revert <commit-hash>`
3. Push to master
4. Fix the issue on dev
5. Push to dev to trigger new deployment

---

## Success Criteria Checklist

- [ ] `.github/workflows/deploy.yml` exists and is committed to dev
- [ ] Workflow triggered automatically on dev push
- [ ] Master branch received new commit with "Deploy: Update website from dev" message
- [ ] Build files (index.html, JS, CSS bundles) exist in master root
- [ ] No stale files from previous builds remain on master
- [ ] .github folder preserved on master
- [ ] Workflow does NOT trigger on master or other branch pushes
- [ ] All steps in workflow completed successfully

---

## Spec Coverage Map

| Spec Section | Task | Status |
|---|---|---|
| Trigger on dev push | Task 1-4 | ✓ |
| Build with npm commands | Task 2 (Build phase steps) | ✓ |
| Deploy to master | Task 2 (Deploy phase steps) | ✓ |
| Git config for github-actions[bot] | Task 2 (Configure git user step) | ✓ |
| Clean files before deploy | Task 2 (Clean master directory step) | ✓ |
| Commit with dev hash | Task 2 (Get dev commit hash + Commit steps) | ✓ |
| Push with GITHUB_TOKEN | Task 2 (Push step) | ✓ |
| Verify deployment | Task 5-7 | ✓ |
