# GitHub Secrets Setup for CI/CD

## Required Secrets:
1. **DOCKER_USERNAME** - Your Docker Hub username
2. **DOCKER_TOKEN** - Docker Hub access token
3. **SLACK_WEBHOOK_URL** (Optional) - For notifications

## How to set up:

### 1. Docker Hub Token:
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Give it a name (e.g., "github-actions")
4. Copy the token

### 2. Add to GitHub:
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add:
   - Name: `DOCKER_USERNAME`
   - Secret: `your-docker-username`
   
5. Add another:
   - Name: `DOCKER_TOKEN`
   - Secret: `your-docker-token`

## Test the workflow:
```bash
# Push to main branch to trigger workflow
git add .
git commit -m "Add CI/CD pipeline"
git push origin main