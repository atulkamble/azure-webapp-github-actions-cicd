# Azure Web App Deployment with GitHub Actions

## 1. Repository

| Field | Value |
|---|---|
| **Repository Name** | `azure-webapp-github-actions-cicd` |
| **Project Name** | Azure Web App CI/CD with GitHub Actions |
| **Project Type** | Cloud DevOps / CI/CD |
| **Cloud** | Microsoft Azure |
| **CI/CD** | GitHub Actions |
| **Application** | Python Flask Web App |
| **Hosting** | Azure App Service |
| **Authentication** | OIDC + Microsoft Entra ID |
| **Difficulty** | Intermediate |
| **Portfolio Ready** | Yes |

Suggested repository:

```text
github.com/atulkamble/azure-webapp-github-actions-cicd
```

## 2. Project Objective

Build and deploy a modern Python web application to **Azure App Service** with a fully automated CI/CD pipeline using **GitHub Actions**.

The project demonstrates:

```text
Application Development
        +
Git / GitHub
        +
CI/CD Automation
        +
Secure OIDC Authentication
        +
Azure App Service
        =
Production-style Cloud Deployment
```

## 3. Technical Stack

| Category | Technology |
|---|---|
| Frontend | HTML5, CSS3 |
| Backend | Python 3.12 |
| Framework | Flask |
| Application Server | Gunicorn |
| Version Control | Git |
| Repository | [GitHub](https://github.com?utm_source=chatgpt.com) |
| CI/CD | GitHub Actions |
| Cloud | [Microsoft Azure](https://azure.microsoft.com?utm_source=chatgpt.com) |
| Compute | Azure App Service |
| Identity | Microsoft Entra ID |
| Authentication | OpenID Connect (OIDC) |
| Management | Azure CLI |
| Runner | GitHub-hosted Ubuntu Runner |

## 4. Architecture

```text
                         DEVELOPER
                             │
                             │ git push
                             ▼
                  ┌────────────────────┐
                  │ GitHub Repository  │
                  │       main         │
                  └─────────┬──────────┘
                            │
                         Trigger
                            ▼
                ┌────────────────────────┐
                │     GitHub Actions     │
                │                        │
                │  Checkout Repository   │
                │          ↓             │
                │  Setup Python          │
                │          ↓             │
                │  Install Dependencies  │
                │          ↓             │
                │  Validate / Test       │
                │          ↓             │
                │  Azure Login           │
                └───────────┬────────────┘
                            │
                           OIDC
                            ▼
                 ┌─────────────────────┐
                 │ Microsoft Entra ID  │
                 │ Federated Identity  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Azure Subscription  │
                 │         │           │
                 │ Resource Group      │
                 │         │           │
                 │ App Service Plan    │
                 │         │           │
                 │ Azure Web App       │
                 └──────────┬──────────┘
                            │
                            ▼
                         USERS
```

## 5. Project Directory Structure

```text
azure-webapp-github-actions-cicd/
│
├── app.py
├── requirements.txt
├── .gitignore
├── README.md
│
├── templates/
│   └── index.html
│
├── static/
│   └── style.css
│
└── .github/
    └── workflows/
        └── deploy.yml
```

## 6. Create the Project

```bash
mkdir azure-webapp-github-actions-cicd
cd azure-webapp-github-actions-cicd

mkdir templates static
mkdir -p .github/workflows

touch app.py
touch requirements.txt
touch .gitignore
touch README.md
touch templates/index.html
touch static/style.css
touch .github/workflows/deploy.yml

code .
```

## 7. Application Backend

### `app.py`

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health")
def health():
    return {
        "status": "healthy",
        "application": "azure-webapp-github-actions-cicd"
    }, 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000
    )
```

## 8. Python Dependencies

### `requirements.txt`

```text
Flask
gunicorn
```

## 9. Modern Web UI

### `templates/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Azure CI/CD</title>

    <link rel="stylesheet"
          href="{{ url_for('static',
          filename='style.css') }}">
</head>

<body>

<nav>

    <div class="logo">
        Cloudnautic
    </div>

    <div class="links">
        <a href="/">Home</a>
        <a href="/health">Health</a>
    </div>

</nav>


<main>

    <div class="badge">
        GitHub Actions × Microsoft Azure
    </div>

    <h1>
        Automated Cloud Deployment
    </h1>

    <p class="description">

        Modern Python application deployed automatically
        to Azure App Service using GitHub Actions,
        OIDC and Microsoft Entra ID.

    </p>

    <div class="actions">

        <a href="/health"
           class="primary">
            Check Application
        </a>

        <a href="https://github.com"
           class="secondary">
            GitHub Repository
        </a>

    </div>


    <section class="cards">

        <article>
            <span>01</span>
            <h2>Develop</h2>
            <p>
                Build and maintain the application
                using Python and Flask.
            </p>
        </article>

        <article>
            <span>02</span>
            <h2>Automate</h2>
            <p>
                GitHub Actions automatically validates
                and deploys application changes.
            </p>
        </article>

        <article>
            <span>03</span>
            <h2>Deploy</h2>
            <p>
                Azure App Service provides managed
                hosting for the application.
            </p>
        </article>

    </section>

</main>


<footer>

    Azure • GitHub Actions • Python • Flask

</footer>

</body>

</html>
```

## 10. UI Styling

### `static/style.css`

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background:
        radial-gradient(circle at top, #172554, #020617 60%);
    color: #f8fafc;
    min-height: 100vh;
}

nav {
    max-width: 1200px;
    margin: auto;
    padding: 28px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 22px;
    font-weight: bold;
}

.links {
    display: flex;
    gap: 25px;
}

.links a {
    color: #cbd5e1;
    text-decoration: none;
}

main {
    max-width: 1100px;
    margin: auto;
    padding: 100px 30px;
    text-align: center;
}

.badge {
    display: inline-block;
    padding: 8px 16px;

    border: 1px solid #334155;
    border-radius: 30px;

    color: #38bdf8;
    margin-bottom: 30px;
}

h1 {
    font-size: clamp(45px, 7vw, 80px);
    line-height: 1;
}

.description {
    max-width: 700px;
    margin: 30px auto;

    color: #94a3b8;
    font-size: 19px;
    line-height: 1.7;
}

.actions {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.actions a {
    padding: 14px 25px;
    border-radius: 10px;
    text-decoration: none;
}

.primary {
    background: #0284c7;
    color: white;
}

.secondary {
    border: 1px solid #475569;
    color: white;
}

.cards {
    margin-top: 100px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    text-align: left;
}

article {
    padding: 30px;

    border: 1px solid #1e293b;
    border-radius: 18px;

    background: rgba(255,255,255,.04);
}

article span {
    color: #38bdf8;
}

article h2 {
    margin: 15px 0;
}

article p {
    color: #94a3b8;
    line-height: 1.6;
}

footer {
    text-align: center;
    padding: 30px;
    color: #64748b;
}

@media (max-width: 700px) {

    .cards {
        grid-template-columns: 1fr;
    }

    .actions {
        flex-direction: column;
    }
}
```

## 11. `.gitignore`

```text
venv/
.venv/
__pycache__/
*.pyc
.DS_Store
.env
```

## 12. Local Testing

Create virtual environment:

```bash
python3 -m venv venv
```

Activate:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
python app.py
```

Open:

```text
http://localhost:8000
```

Test health endpoint:

```bash
curl http://localhost:8000/health
```

Expected:

```json
{
  "application": "azure-webapp-github-actions-cicd",
  "status": "healthy"
}
```

## 13. Azure Infrastructure

Login:

```bash
az login
```

Check subscription:

```bash
az account show -o table
```

Set variables:

```bash
RG="github-actions-rg"
LOCATION="centralindia"
PLAN="github-actions-plan"
APP="cloudnautic-webapp-2026"
```

Create Resource Group:

```bash
az group create \
  --name $RG \
  --location $LOCATION
```

Create Linux App Service Plan:

```bash
az appservice plan create \
  --name $PLAN \
  --resource-group $RG \
  --location $LOCATION \
  --sku B1 \
  --is-linux
```

Check currently supported Python runtimes:

```bash
az webapp list-runtimes \
  --os linux
```

Create Web App:

```bash
az webapp create \
  --resource-group $RG \
  --plan $PLAN \
  --name $APP \
  --runtime "PYTHON:3.12"
```

Configure startup:

```bash
az webapp config set \
  --resource-group $RG \
  --name $APP \
  --startup-file \
  "gunicorn --bind=0.0.0.0:8000 app:app"
```

## 14. Azure Architecture

```text
Azure Subscription
       │
       ▼
github-actions-rg
Resource Group
       │
       ▼
github-actions-plan
App Service Plan
Linux / B1
       │
       ▼
cloudnautic-webapp-2026
Azure Web App
       │
       ├── Python
       ├── Flask
       ├── Gunicorn
       └── Application Code
```

## 15. Create GitHub Repository

Create:

```text
azure-webapp-github-actions-cicd
```

Initialize locally:

```bash
git init

git add .

git commit -m "Initial project setup"

git branch -M main
```

Add remote:

```bash
git remote add origin \
https://github.com/atulkamble/azure-webapp-github-actions-cicd.git
```

Push:

```bash
git push -u origin main
```

## 16. GitHub → Azure Authentication

For a modern implementation, use **OIDC federation** rather than storing a permanent Azure client secret.

```text
GitHub Actions
      │
      │ Request OIDC Token
      ▼
GitHub OIDC Provider
      │
      ▼
Microsoft Entra ID
      │
      │ Validate Federated Credential
      ▼
Azure Access Token
      │
      ▼
Azure App Service
```

The official authentication action is documented at [Azure Login GitHub Action](https://github.com/Azure/login?utm_source=chatgpt.com).

Configure these GitHub repository secrets:

| Secret | Description |
|---|---|
| `AZURE_CLIENT_ID` | Entra application/client ID |
| `AZURE_TENANT_ID` | Azure tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |

The Entra application also needs an appropriate Azure RBAC assignment scoped to the resources it must deploy.

## 17. GitHub Actions CI/CD

### `.github/workflows/deploy.yml`

```yaml
name: Azure Web App CI/CD

on:
  push:
    branches:
      - main

  workflow_dispatch:

permissions:
  contents: read
  id-token: write

jobs:

  build-test-deploy:

    name: Build Test Deploy

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install Dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Validate Application
        run: |
          python -m compileall .

      - name: Login to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Deploy Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: cloudnautic-webapp-2026
          package: .
```

Official deployment action: [Azure Web Apps Deploy](https://github.com/Azure/webapps-deploy?utm_source=chatgpt.com).

## 18. CI/CD Pipeline Flow

```text
git push
   │
   ▼
GitHub main
   │
   ▼
Workflow Trigger
   │
   ▼
Checkout
   │
   ▼
Setup Python
   │
   ▼
Install Dependencies
   │
   ▼
Application Validation
   │
   ▼
OIDC Authentication
   │
   ▼
Azure Login
   │
   ▼
Deploy
   │
   ▼
Azure App Service
   │
   ▼
Live Application
```

## 19. Deployment Test

Change:

```html
<h1>Version 2 Successfully Deployed</h1>
```

Push:

```bash
git status

git add .

git commit -m "Release version 2"

git push origin main
```

Then check:

```text
GitHub Repository
        ↓
Actions
        ↓
Azure Web App CI/CD
        ↓
Build Test Deploy
        ↓
✓ Checkout
✓ Setup Python
✓ Install Dependencies
✓ Validate
✓ Azure Login
✓ Deploy
```

Refresh the Azure website. The new version should appear after the deployment completes.

## 20. Production Enhancement Roadmap

Once the basic project works, upgrade the same repository with:

| Enhancement | Technology |
|---|---|
| Infrastructure as Code | Terraform |
| Testing | Pytest |
| Code Quality | SonarCloud |
| Security Scan | Trivy |
| Dependency Security | Dependabot |
| Secrets | Azure Key Vault |
| Monitoring | Application Insights |
| Logging | Azure Monitor |
| Staging | App Service Deployment Slots |
| Approval | GitHub Environments |
| Custom Domain | Azure App Service Domain/DNS |
| HTTPS | App Service TLS |
| Infrastructure CI/CD | GitHub Actions + Terraform |
