# GitHub Actions Deployment Workflow Design

**Date:** 2026-04-16  
**Status:** Design Approved  
**Scope:** Automated build and deployment from dev → master branch

## Overview

Implement a GitHub Actions workflow that automatically builds the React application on every push to the `dev` branch and deploys the built files directly to the `master` branch. This eliminates manual deployment steps and keeps master always in sync with the latest built version from dev.

## Requirements

**Functional Requirements:**
- Trigger on every push to `dev` branch
- Build using `npm run snailstrail:sync` followed by `npm run build`
- Copy build output to master root directory
- Commit and push to master automatically
- Use GITHUB_TOKEN for authentication

**Non-Functional Requirements:**
- Fail fast on build errors
- Clear commit messages showing what triggered the deployment
- No manual intervention needed
- Workflow completes in < 5 minutes

## Design Details

### Trigger & Events
- **Event:** `push` filter on `dev` branch only
- **Runs on:** Latest Ubuntu runner
- **Concurrency:** Allow multiple simultaneous runs (builds are independent)

### Job: Build and Deploy

**Phase 1: Setup**
1. Checkout dev branch (full history for git operations)
2. Set up Node.js 16.x (compatible with project's NODE_OPTIONS legacy provider flag)
3. Install dependencies using `npm ci` (cleaner than `npm install` for CI)

**Phase 2: Build**
1. Run `npm run snailstrail:sync` - builds and syncs the snails-trail game
2. Run `npm run build` - creates optimized production build in `build/` directory
3. Stop here if either command fails (automatic via bash error handling)

**Phase 3: Deploy**
1. Configure git user for commits:
   - Name: `github-actions[bot]`
   - Email: `41898952+github-actions[bot]@users.noreply.github.com`
2. Checkout master branch (preserving dev history in git)
3. Clean master working directory:
   - Remove all files except `.git` and `.github` directories
   - This prevents stale built files from previous deployments
4. Copy all contents from `build/` to master root
5. Create commit with message: `Deploy: Update website from dev [<dev-commit-hash>]`
6. Push to master using GITHUB_TOKEN

### Authentication
- **Method:** GITHUB_TOKEN (automatically provided by GitHub Actions)
- **Permissions:** Requires `contents: write` (enabled by default)
- **Limitations:** Commits from GITHUB_TOKEN won't trigger other workflows
- **Branch protection:** Workflow should be exempted from "require PR reviews" if enabled

### Git Configuration
```
user.name = github-actions[bot]
user.email = 41898952+github-actions[bot]@users.noreply.github.com
```

Commit message format includes dev commit hash for traceability:
```
Deploy: Update website from dev [abc1234]
```

### Error Handling
- Build failures: Workflow stops at npm/build command, no master changes
- Push failures: Workflow logs error with clear messaging
- Permission denied: GITHUB_TOKEN scope or branch protection misconfiguration

## File Structure

**Workflow file location:**
```
.github/workflows/deploy.yml
```

**Triggered by:**
- `push` → `dev` branch

**Affects:**
- `master` branch (direct commits and pushes)

## State Management

**Before deployment:**
- `dev` branch: Source code + latest changes
- `master` branch: Previous build output

**After successful deployment:**
- `dev` branch: Unchanged
- `master` branch: Latest build from dev
- Both branches in sync (master = built version of dev)

## Success Criteria

✓ Workflow runs on every `dev` push  
✓ Build completes without errors  
✓ All files from `build/` appear in master root  
✓ Git commit created with correct message and author  
✓ Push to master succeeds  
✓ No stale files from previous deployments  

## Edge Cases & Considerations

**Failed builds:**
- If npm or build fails, workflow stops before touching master
- Developer sees failure in GitHub Actions UI and must fix on dev

**Branch protection:**
- If master has "require PR reviews" rule, workflow push will fail
- Solution: Exempt github-actions[bot] from review requirements OR disable rule

**Concurrent pushes:**
- Multiple rapid dev pushes may queue jobs
- Each job is independent, later jobs overwrite earlier ones (acceptable for static builds)

**Large build artifacts:**
- No artifact caching used (simpler, acceptable for this project size)
- Full `npm ci` on each run (~30-60s depending on network)

## Future Improvements (Out of Scope)

- Add npm dependency caching for faster builds
- Add GitHub Pages custom domain configuration
- Add build status badges to README
- Add deployment notifications to Slack/Discord
- Matrix strategy for testing multiple Node versions

## Rollback Strategy

If deployment breaks the site:
1. Checkout master locally
2. Revert problematic commit: `git revert <commit-hash>`
3. Push to master
4. Workflow will NOT auto-fix (it only pushes from dev builds)
5. Fix the issue on dev and push to trigger new deployment

---

**Design approved by:** User  
**Implementation ready:** Yes
