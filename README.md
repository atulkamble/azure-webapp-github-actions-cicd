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
│   ├── style.css
│   └── app.js
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
touch static/app.js
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
{% macro icon(name, class_name='') -%}
<svg class="icon {{ class_name }}" aria-hidden="true"><use href="#icon-{{ name }}"></use></svg>
{%- endmacro %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="From commit to cloud. A Python application with automated GitHub Actions deployments, Azure App Service hosting, and secure OIDC authentication.">
    <meta name="theme-color" content="#f7f9f5">
    <title>Cloudnautic — From commit to cloud</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
    <script src="{{ url_for('static', filename='app.js') }}" defer></script>
</head>
<body>
    <svg class="icon-definitions" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <symbol id="icon-arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
            <symbol id="icon-external" viewBox="0 0 24 24"><path d="M14 5h5v5m0-5L9 15m1-10H5v14h14v-5"/></symbol>
            <symbol id="icon-code" viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/></symbol>
            <symbol id="icon-branch" viewBox="0 0 24 24"><circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 7v10m12-10a8 8 0 0 1-8 8H6"/></symbol>
            <symbol id="icon-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
            <symbol id="icon-cloud" viewBox="0 0 24 24"><path d="M7 18a5 5 0 0 1-1-10 6 6 0 0 1 11-1 5.5 5.5 0 0 1 1.5 11H7Z"/></symbol>
            <symbol id="icon-shield" viewBox="0 0 24 24"><path d="m12 3 8 3v6c0 4-8 9-8 9s-8-5-8-9V6l8-3Z"/><path d="m8 11 3 3 5-5"/></symbol>
            <symbol id="icon-box" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v9l9 5 9-5V8m-9 5v9M7.5 5.5l9 5"/></symbol>
            <symbol id="icon-refresh" viewBox="0 0 24 24"><path d="M20 7v5h-5M4 17v-5h5m-4-4a8 8 0 0 1 13-3l2 3M4 16l2 3a8 8 0 0 0 13-3"/></symbol>
            <symbol id="icon-github" viewBox="0 0 24 24"><path d="M9 19c-4 1-4-2-6-2m12 5v-3.5a3 3 0 0 0-1-2.3c3-.3 6-1.5 6-5.7A4.4 4.4 0 0 0 19 7a4 4 0 0 0-.1-3s-1-.3-3.6 1.4a12 12 0 0 0-6.6 0C6.1 3.7 5 4 5 4a4 4 0 0 0-.1 3A4.4 4.4 0 0 0 4 10.5c0 4.2 3 5.4 6 5.7a3 3 0 0 0-1 2.3V22"/></symbol>
        </defs>
    </svg>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header page-width">
        <a class="wordmark" href="{{ url_for('home') }}" aria-label="Cloudnautic home">
            <span class="brand-mark">{{ icon('cloud') }}</span> cloudnautic<span class="wordmark-dot">.</span>
        </a>
        <nav class="nav-links" aria-label="Main navigation">
            <a href="#overview" class="nav-link">Overview</a>
            <a href="#pipeline" class="nav-link">The pipeline</a>
            <a href="#health" class="nav-link">App health</a>
        </nav>
        <a class="header-repo" href="https://github.com/atulkamble/azure-webapp-github-actions-cicd" target="_blank" rel="noopener noreferrer">{{ icon('github') }} <span>View source</span>{{ icon('external', 'small-icon') }}</a>
    </header>

    <main id="main" class="page-width">
        <section id="overview" class="hero" aria-labelledby="hero-title">
            <div class="hero-copy">
                <div class="eyebrow"><span class="tiny-dot"></span> LESS FRICTION. MORE SHIPPING.</div>
                <h1 id="hero-title">From commit<br>to <span class="highlight">cloud.</span></h1>
                <p class="hero-description">Good code deserves a smooth landing. Bring your Python app to Azure with a secure, automated deployment flow.</p>
                <div class="hero-actions">
                    <a class="button button-primary" href="#pipeline">Explore the pipeline {{ icon('arrow') }}</a>
                    <a class="text-link" href="#health">Check app health {{ icon('arrow') }}</a>
                </div>
                <div class="hero-footnote">{{ icon('shield') }} Built with OIDC. No stored client secrets.</div>
            </div>

            <div class="blueprint" aria-label="Deployment blueprint: GitHub code is validated by GitHub Actions and deployed to Azure App Service using OIDC authentication.">
                <div class="blueprint-header"><div class="window-dots"><i></i><i></i><i></i></div><span>deployment blueprint</span>{{ icon('branch') }}</div>
                <div class="blueprint-body">
                    <div class="blueprint-label"><span>YOUR CODE, CONNECTED</span><span class="branch-tag">{{ icon('branch') }} main</span></div>
                    <div class="flow-node">
                        <span class="node-icon github-node">{{ icon('github') }}</span>
                        <div><strong>It starts with a commit.</strong><span>GitHub repository</span></div>
                        <span class="node-label">SOURCE</span>
                    </div>
                    <div class="flow-connector"><span></span><small>git push</small></div>
                    <div class="flow-node actions-node">
                        <span class="node-icon actions-icon">{{ icon('code') }}</span>
                        <div><strong>A little automation magic.</strong><span>GitHub Actions</span></div>
                        <span class="node-label">CI / CD</span>
                    </div>
                    <div class="flow-connector"><span></span><small>{{ icon('shield') }} OIDC authentication</small></div>
                    <div class="flow-node azure-node">
                        <span class="node-icon cloud-icon">{{ icon('cloud') }}</span>
                        <div><strong>A new home in the cloud.</strong><span>Azure App Service</span></div>
                        <span class="node-label">HOSTING</span>
                    </div>
                    <div class="blueprint-footer"><span class="tiny-dot"></span> One connected path from code to cloud.</div>
                </div>
                <div class="blueprint-caption">Less setup between you and your next release.</div>
            </div>
        </section>

        <div class="stack-strip" aria-label="Technology stack">
            <span class="stack-label">A SMALL STACK.<br>A SOLID FOUNDATION.</span>
            <span class="stack-item"><span class="stack-glyph python-glyph">Py</span> Python 3.12</span>
            <span class="stack-item">{{ icon('code') }} Flask</span>
            <span class="stack-item">{{ icon('github') }} GitHub Actions</span>
            <span class="stack-item">{{ icon('cloud') }} Microsoft Azure</span>
            <span class="stack-item">{{ icon('shield') }} OIDC</span>
        </div>

        <section id="pipeline" class="pipeline-section" aria-labelledby="pipeline-title">
            <div class="section-heading">
                <div><p class="eyebrow">THE DEPLOYMENT FLOW</p><h2 id="pipeline-title">Three steps. One smooth landing.</h2></div>
                <p>From your local workspace to a managed home in the cloud.</p>
            </div>
            <div class="feature-grid">
                <article class="feature-card">
                    <div class="feature-top"><span class="feature-icon">{{ icon('code') }}</span><span class="step-number">01 / DEVELOP</span></div>
                    <h3>Make something great.</h3>
                    <p>Build your application with Python and Flask. Focus on the experience you want to create.</p>
                    <div class="feature-bottom"><span>Python + Flask</span>{{ icon('arrow') }}</div>
                </article>
                <article class="feature-card">
                    <div class="feature-top"><span class="feature-icon">{{ icon('branch') }}</span><span class="step-number">02 / AUTOMATE</span></div>
                    <h3>Let the workflow work.</h3>
                    <p>Push to main. GitHub Actions installs dependencies, checks the app, and packages your release.</p>
                    <div class="feature-bottom"><span>GitHub Actions</span>{{ icon('arrow') }}</div>
                </article>
                <article class="feature-card">
                    <div class="feature-top"><span class="feature-icon">{{ icon('cloud') }}</span><span class="step-number">03 / DEPLOY</span></div>
                    <h3>Give your code a home.</h3>
                    <p>Authenticate with OIDC and deliver your application to the managed Azure App Service platform.</p>
                    <div class="feature-bottom"><span>Azure App Service</span>{{ icon('arrow') }}</div>
                </article>
            </div>
        </section>

        <section id="health" class="health-section" aria-labelledby="health-title">
            <div class="health-copy"><p class="eyebrow">A QUICK PULSE CHECK</p><h2 id="health-title">Is everything<br>looking healthy?</h2><p>A live check of this application's health endpoint. A little peace of mind, one request away.</p><a class="text-link" href="{{ url_for('health') }}">View the JSON response {{ icon('external') }}</a></div>
            <div class="health-card" data-health-panel data-health-url="{{ url_for('health') }}" data-state="loading">
                <div class="health-card-header"><span>{{ icon('box') }} Application health</span><span class="endpoint-label">GET /health</span></div>
                <div class="health-status" role="status" aria-live="polite" aria-atomic="true"><span class="status-orb">{{ icon('refresh') }}</span><div><h3 data-health-title>Checking application…</h3><p data-health-description>Contacting the health endpoint.</p></div></div>
                <dl class="health-details"><div><dt>Application</dt><dd>azure-webapp-github-actions-cicd</dd></div><div><dt>Last checked</dt><dd data-health-time>Waiting for response</dd></div></dl>
                <div class="health-card-footer"><span class="live-caption"><span class="tiny-dot"></span> Live application check</span><button class="refresh-button" type="button" data-health-refresh disabled>{{ icon('refresh') }} Refresh status</button></div>
                <noscript><p class="noscript-message">Enable JavaScript for live status, or <a href="{{ url_for('health') }}">open the health endpoint</a>.</p></noscript>
            </div>
        </section>

        <section class="source-banner" aria-labelledby="source-title"><div><p class="eyebrow">OPEN CODE. ENDLESS POSSIBILITIES.</p><h2 id="source-title">Make your next commit count.</h2><p>Explore the code, follow the setup, and make it your own.</p></div><a class="button button-dark" href="https://github.com/atulkamble/azure-webapp-github-actions-cicd" target="_blank" rel="noopener noreferrer">{{ icon('github') }} Explore on GitHub {{ icon('external') }}</a></section>
    </main>

    <footer class="site-footer page-width"><a class="wordmark footer-wordmark" href="{{ url_for('home') }}">{{ icon('cloud') }} cloudnautic<span class="wordmark-dot">.</span></a><p>A smoother journey from code to cloud.</p><a href="#overview">Back to top {{ icon('arrow', 'up-arrow') }}</a></footer>
</body>
</html>
```

## 10. UI Styling

### `static/style.css`

```css
:root {
    color-scheme: light;
    --background: #f7f9f5;
    --surface: #ffffff;
    --ink: #19362d;
    --muted: #62726b;
    --line: #dfe5dc;
    --green: #2b5d45;
    --lime: #d6eea7;
    --soft-green: #eaf1e5;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: var(--ink);
    background: var(--background);
    font-synthesis: none;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 32px; }
body { margin: 0; -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
button { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button:focus-visible, a:focus-visible { outline: 3px solid #3c7258; outline-offset: 5px; }
::selection { background: var(--lime); color: var(--ink); }
h1, h2, h3, p { margin: 0; }
.icon { width: 22px; height: 22px; display: inline-block; flex-shrink: 0; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.icon-definitions { position: absolute; width: 0; height: 0; overflow: hidden; }
.small-icon { width: 15px; height: 15px; }
.page-width { width: min(1160px, calc(100% - 96px)); margin-inline: auto; }
.skip-link { position: fixed; top: -100px; left: 20px; z-index: 10; padding: 14px 20px; background: var(--ink); color: white; border-radius: 8px; }
.skip-link:not(:focus) { clip-path: inset(50%); }
.skip-link:focus { top: 12px; }

.site-header { min-height: 104px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--line); }
.wordmark { display: inline-flex; align-items: center; gap: 10px; font-size: 23px; font-weight: 750; letter-spacing: -1px; }
.wordmark-dot { color: #639a47; margin-left: -9px; }
.brand-mark { display: grid; place-items: center; background: var(--ink); color: var(--lime); width: 36px; height: 36px; border-radius: 11px; }
.brand-mark .icon { width: 25px; height: 25px; }
.nav-links { display: flex; align-items: center; gap: 30px; }
.nav-link { font-size: 13px; font-weight: 550; color: var(--muted); padding-block: 10px; }
.nav-link:hover { color: var(--ink); }
.header-repo { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 650; padding: 12px 16px; border: 1px solid var(--line); border-radius: 8px; transition: border-color .2s, background .2s; }
.header-repo:hover { border-color: #9db69b; background: var(--soft-green); }
.header-repo > .icon:first-child { width: 18px; height: 18px; }

.hero { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 65px; padding: 92px 0 76px; }
.eyebrow { display: flex; align-items: center; gap: 8px; font-size: 10px; line-height: 1.6; letter-spacing: 1.8px; font-weight: 750; }
.tiny-dot { display: inline-block; width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: #6a9353; }
h1 { font-size: clamp(60px, 6.5vw, 88px); font-weight: 650; line-height: 1.04; letter-spacing: -5px; margin-top: 26px; }
.highlight { position: relative; display: inline-block; z-index: 0; }
.highlight::after { content: ""; position: absolute; bottom: 2px; left: -5px; right: -9px; height: 26px; background: var(--lime); z-index: -1; border-radius: 3px; transform: rotate(-2deg); }
.hero-description { max-width: 410px; font-size: 16px; line-height: 1.8; color: var(--muted); margin-top: 27px; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 30px; }
.button { display: inline-flex; align-items: center; justify-content: center; gap: 14px; min-height: 48px; padding: 14px 20px; font-size: 12px; font-weight: 650; border-radius: 7px; transition: transform .2s, background .2s, box-shadow .2s; }
.button .icon { width: 18px; height: 18px; }
.button-primary { color: white; background: var(--green); box-shadow: 0 4px 10px #2b5d4512; }
.button-primary:hover { background: #204b36; transform: translateY(-2px); box-shadow: 0 7px 16px #2b5d4520; }
.text-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 650; padding-block: 8px; }
.text-link .icon { width: 16px; height: 16px; transition: transform .2s; }
.text-link:hover .icon { transform: translateX(3px); }
.hero-footnote { display: flex; align-items: center; gap: 7px; color: var(--muted); margin-top: 24px; font-size: 10px; }
.hero-footnote .icon { width: 14px; height: 14px; }

.blueprint { background: white; border: 1px solid #dce4d7; border-radius: 13px; box-shadow: 0 20px 50px -25px #35563838; transform: rotate(1deg); }
.blueprint-header { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-bottom: 1px solid var(--line); background: #f5f7f2; border-radius: 13px 13px 0 0; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 10px; color: var(--muted); }
.blueprint-header > .icon { width: 15px; height: 15px; margin-left: auto; }
.window-dots { display: flex; gap: 5px; }
.window-dots i { width: 7px; height: 7px; border-radius: 50%; background: #d6ded0; }
.window-dots i:first-child { background: #b7c9af; }
.blueprint-body { padding: 24px; background-image: radial-gradient(#dce3d8 1px, transparent 1px); background-size: 14px 14px; }
.blueprint-label { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 9px; font-weight: 650; letter-spacing: 1.1px; margin-bottom: 22px; }
.branch-tag { display: inline-flex; align-items: center; gap: 4px; letter-spacing: 0; background: #eef2e9; border: 1px solid var(--line); border-radius: 5px; padding: 4px 7px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
.branch-tag .icon { width: 12px; height: 12px; }
.flow-node { display: flex; align-items: center; gap: 13px; padding: 17px 15px; border: 1px solid var(--line); background: white; border-radius: 9px; box-shadow: 0 3px 5px #203a2305; }
.node-icon { display: grid; place-items: center; width: 37px; height: 37px; flex-shrink: 0; border-radius: 8px; }
.github-node { background: #f0f2ed; }
.actions-icon { background: #eef2e2; color: #55773c; }
.cloud-icon { background: #dcebd3; color: #2b5d45; }
.flow-node strong { display: block; font-size: 12px; font-weight: 650; margin-bottom: 5px; }
.flow-node div > span { display: block; font-size: 10px; color: var(--muted); }
.node-label { margin-left: auto; font-size: 8px; letter-spacing: .8px; color: var(--muted); }
.azure-node { border-color: #b7cbaa; background: #f5f9ef; }
.flow-connector { height: 36px; display: flex; align-items: center; gap: 12px; padding-left: 32px; }
.flow-connector > span { height: 100%; border-left: 1px dashed #8ba17f; }
.flow-connector small { display: inline-flex; align-items: center; gap: 5px; font-size: 9px; color: #6d8065; background: white; }
.flow-connector .icon { width: 11px; height: 11px; }
.blueprint-footer { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 9px; color: var(--muted); margin-top: 21px; }
.blueprint-caption { border-top: 1px solid var(--line); padding: 12px 18px; text-align: center; font-size: 10px; color: var(--muted); background: #fafbf8; border-radius: 0 0 13px 13px; }

.stack-strip { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-block: 28px; border-block: 1px solid var(--line); }
.stack-label { font-size: 8px; font-weight: 700; letter-spacing: 1.3px; line-height: 1.7; color: var(--muted); }
.stack-item { display: inline-flex; align-items: center; gap: 9px; font-size: 12px; font-weight: 650; color: #506452; white-space: nowrap; }
.stack-item .icon { width: 20px; height: 20px; }
.stack-glyph { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-weight: 700; font-size: 17px; letter-spacing: -2px; }

.pipeline-section { padding-top: 78px; }
.section-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: 28px; }
.section-heading h2 { font-size: 29px; font-weight: 600; letter-spacing: -1px; line-height: 1.3; margin-top: 10px; }
.section-heading > p { max-width: 235px; font-size: 12px; line-height: 1.7; color: var(--muted); }
.feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.feature-card { padding: 26px; border: 1px solid var(--line); border-radius: 10px; background: white; transition: transform .2s, border-color .2s; }
.feature-card:hover { transform: translateY(-4px); border-color: #b1c4a7; }
.feature-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 28px; }
.feature-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 9px; background: var(--soft-green); color: var(--green); }
.step-number { font-size: 8px; font-weight: 650; letter-spacing: 1px; color: var(--muted); }
.feature-card h3 { font-size: 17px; font-weight: 600; letter-spacing: -.4px; margin-bottom: 12px; }
.feature-card p { font-size: 12px; line-height: 1.8; color: var(--muted); min-height: 66px; }
.feature-bottom { border-top: 1px solid #edf0e9; padding-top: 18px; margin-top: 25px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-weight: 550; }
.feature-bottom .icon { width: 16px; height: 16px; color: #708366; }

.health-section { padding-block: 80px; display: grid; grid-template-columns: .85fr 1fr; align-items: center; gap: 90px; }
.health-copy h2 { font-size: 38px; font-weight: 600; line-height: 1.18; letter-spacing: -1.5px; margin-block: 14px 17px; }
.health-copy > p:not(.eyebrow) { color: var(--muted); max-width: 320px; font-size: 13px; line-height: 1.8; }
.health-copy .text-link { margin-top: 13px; }
.health-card { border: 1px solid var(--line); border-radius: 11px; background: white; overflow: hidden; }
.health-card-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 19px 22px; border-bottom: 1px solid #edf0e9; font-size: 11px; font-weight: 650; }
.health-card-header > span:first-child { display: flex; align-items: center; gap: 8px; }
.health-card-header .icon { width: 17px; height: 17px; }
.endpoint-label { font-size: 9px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; background: #f0f3ed; color: var(--muted); padding: 5px 7px; border-radius: 4px; }
.health-status { display: flex; align-items: center; gap: 15px; padding: 26px 22px 20px; }
.status-orb { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; background: #f0f3ed; color: #7b8b72; flex-shrink: 0; }
.health-status h3 { font-size: 18px; line-height: 1.4; font-weight: 600; letter-spacing: -.4px; }
.health-status p { font-size: 11px; line-height: 1.7; margin-top: 4px; color: var(--muted); }
.health-card[data-state="healthy"] .status-orb { color: #3b784d; background: #e9f3e2; }
.health-card[data-state="error"] .status-orb { color: #a04930; background: #fbeee7; }
.health-card[data-state="loading"] .status-orb .icon { animation: spin 1.4s linear infinite; }
.health-details { margin: 0; padding: 0 22px 22px; font-size: 10px; }
.health-details > div { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 7px 16px; padding-top: 13px; }
.health-details dt { color: var(--muted); }
.health-details dd { margin: 0; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; overflow-wrap: anywhere; }
.health-card-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 13px 22px; background: #fafbf8; border-top: 1px solid #edf0e9; }
.live-caption { display: flex; align-items: center; gap: 6px; font-size: 9px; color: var(--muted); }
.refresh-button { display: flex; align-items: center; gap: 6px; color: var(--green); font-size: 10px; font-weight: 650; background: transparent; border: 0; padding: 6px 0; cursor: pointer; }
.refresh-button .icon { width: 13px; height: 13px; }
.refresh-button:hover { color: #122c26; }
.refresh-button:disabled { opacity: .5; cursor: wait; }
.noscript-message { padding: 12px 22px; font-size: 12px; }
.noscript-message a { text-decoration: underline; }

.source-banner { display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 36px 40px; background: #e7efdc; border: 1px solid #dbe5ce; border-radius: 12px; }
.source-banner .eyebrow { font-size: 8px; letter-spacing: 1.5px; }
.source-banner h2 { font-size: 27px; font-weight: 600; letter-spacing: -.8px; margin-top: 10px; }
.source-banner p:not(.eyebrow) { font-size: 12px; color: var(--muted); margin-top: 10px; line-height: 1.7; }
.button-dark { background: var(--ink); color: white; white-space: nowrap; }
.button-dark:hover { background: #2b5140; transform: translateY(-2px); }
.site-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px; padding-block: 38px; margin-top: 26px; }
.footer-wordmark { font-size: 17px; gap: 8px; }
.footer-wordmark .icon { width: 20px; height: 20px; }
.footer-wordmark .wordmark-dot { margin-left: -7px; }
.site-footer p, .site-footer > a:last-child { font-size: 10px; color: var(--muted); }
.site-footer > a:last-child { display: flex; align-items: center; gap: 5px; }
.up-arrow { width: 14px; height: 14px; transform: rotate(-90deg); }
@keyframes spin { to { transform: rotate(360deg); } }

@media (min-width: 1500px) { .hero { padding-block: 106px 90px; } }
@media (max-width: 1050px) {
    .page-width { width: calc(100% - 64px); }
    .hero { gap: 35px; }
    h1 { font-size: 68px; }
    .nav-links { gap: 20px; }
    .hero-actions { gap: 10px 20px; }
    .node-label { display: none; }
    .stack-strip { flex-wrap: wrap; justify-content: center; gap: 20px 28px; }
    .stack-label { width: 100%; text-align: center; }
    .stack-label br { display: none; }
    .feature-card { padding: 22px; }
    .health-section { gap: 45px; }
}
@media (max-width: 760px) {
    .page-width { width: calc(100% - 40px); }
    .site-header { min-height: 90px; flex-wrap: wrap; padding-block: 22px 18px; gap: 20px; }
    .wordmark { font-size: 21px; }
    .header-repo { margin-left: auto; }
    .nav-links { order: 3; width: 100%; justify-content: center; gap: 32px; }
    .nav-link { padding-block: 0; font-size: 12px; }
    .hero { grid-template-columns: 1fr; gap: 40px; padding-block: 54px 44px; }
    h1 { font-size: clamp(60px, 12vw, 85px); letter-spacing: -3.8px; }
    .hero-description { max-width: 470px; font-size: 15px; }
    .blueprint { width: min(100% - 6px, 500px); justify-self: center; transform: rotate(.5deg); }
    .blueprint-body { padding: 24px; }
    .node-label { display: inline; }
    .stack-strip { gap: 22px 28px; padding-block: 25px; }
    .stack-item { font-size: 11px; }
    .pipeline-section { padding-top: 48px; }
    .section-heading { display: block; }
    .section-heading h2 { font-size: 27px; }
    .section-heading > p { max-width: 100%; margin-top: 13px; }
    .feature-grid { grid-template-columns: 1fr; gap: 14px; }
    .feature-card { padding: 24px; }
    .feature-top { margin-bottom: 20px; }
    .feature-card p { min-height: 0; max-width: 460px; }
    .feature-bottom { margin-top: 20px; }
    .health-section { grid-template-columns: 1fr; gap: 25px; padding-block: 50px; }
    .health-copy h2 { font-size: 34px; }
    .health-copy h2 br { display: none; }
    .health-copy > p:not(.eyebrow) { max-width: 460px; }
    .source-banner { flex-direction: column; align-items: flex-start; padding: 28px; }
    .source-banner h2 { font-size: 25px; }
    .site-footer { padding-block: 28px; margin-top: 12px; }
    .site-footer p { order: 3; width: 100%; }
}
@media (max-width: 380px) {
    .page-width { width: calc(100% - 32px); }
    .header-repo { padding: 10px; gap: 6px; }
    .header-repo .small-icon { display: none; }
    .wordmark { font-size: 19px; }
    .brand-mark { width: 30px; height: 30px; }
    h1 { font-size: 56px; }
    .eyebrow { font-size: 8px; letter-spacing: 1.4px; }
    .blueprint-body { padding: 17px; }
    .flow-node { padding: 14px 11px; gap: 10px; }
    .flow-node strong { font-size: 11px; }
    .node-label { display: none; }
    .health-card-header, .health-status, .health-card-footer { padding-inline: 17px; }
    .health-details { padding-inline: 17px; }
}
@media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

### Live Application Health

The responsive interface includes a deployment blueprint, technology stack, pipeline cards, and a live health panel. The panel checks `/health` when the page opens and whenever **Refresh status** is selected. It shows loading, healthy, failed, and timed-out requests, with the time of the latest check. This reflects the running Flask application's health response; it does not query GitHub Actions or Azure deployment status. Without JavaScript, the JSON health endpoint remains available through a link.

### `static/app.js`

```javascript
(() => {
    const panel = document.querySelector('[data-health-panel]');
    if (!panel) return;

    const refreshButton = panel.querySelector('[data-health-refresh]');
    const title = panel.querySelector('[data-health-title]');
    const description = panel.querySelector('[data-health-description]');
    const checkedTime = panel.querySelector('[data-health-time]');
    const statusIcon = panel.querySelector('.status-orb use');

    async function checkHealth() {
        if (panel.getAttribute('aria-busy') === 'true') return;
        panel.setAttribute('aria-busy', 'true');
        panel.dataset.state = 'loading';
        refreshButton.disabled = true;
        title.textContent = 'Checking application…';
        description.textContent = 'Contacting the health endpoint.';
        statusIcon.setAttribute('href', '#icon-refresh');

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch(panel.dataset.healthUrl, {
                cache: 'no-store',
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!response.ok) throw new Error('Health request failed');
            const result = await response.json();
            if (result.status !== 'healthy' || result.application !== 'azure-webapp-github-actions-cicd') {
                throw new Error('Unexpected health response');
            }
            panel.dataset.state = 'healthy';
            title.textContent = 'The application is healthy.';
            description.textContent = 'The application is responding and healthy.';
            statusIcon.setAttribute('href', '#icon-check');
        } catch (error) {
            panel.dataset.state = 'error';
            title.textContent = 'Unable to confirm health.';
            description.textContent = error.name === 'AbortError'
                ? 'The request timed out. Give it another try.'
                : 'The health check failed. Refresh to try again.';
            statusIcon.setAttribute('href', '#icon-shield');
        } finally {
            window.clearTimeout(timeout);
            const checked = new Date();
            checkedTime.textContent = checked.toLocaleTimeString([], {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
            });
            checkedTime.title = checked.toLocaleString();
            refreshButton.disabled = false;
            panel.setAttribute('aria-busy', 'false');
        }
    }

    refreshButton.addEventListener('click', checkHealth);
    checkHealth();
})();
```

## 11. `.gitignore`

```text
venv/
.venv/
__pycache__/
*.pyc
.DS_Store
.env
app.zip
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

For the workflow below, add a federated credential with these values:

| Field | Value |
|---|---|
| Issuer | `https://token.actions.githubusercontent.com` |
| Subject | `repo:atulkamble/azure-webapp-github-actions-cicd:ref:refs/heads/main` |
| Audience | `api://AzureADTokenExchange` |

Replace the repository owner/name in the subject if you use a different repository. Both pushes to `main` and manual runs from `main` use this credential. Run manual deployments from `main` to match it. See [GitHub's Azure OIDC setup guide](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-azure).

The deployment identity needs permission to deploy the app and update its app settings; the built-in [Website Contributor role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor) scoped to the Web App supports these operations. Set `AZURE_WEBAPP_NAME` and `AZURE_RESOURCE_GROUP` in the workflow to match the resources created in section 13. The workflow enables `SCM_DO_BUILD_DURING_DEPLOYMENT` so App Service installs `requirements.txt` during deployment; see [Azure's Python deployment guide](https://learn.microsoft.com/en-us/azure/app-service/quickstart-python).


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

env:
  AZURE_WEBAPP_NAME: cloudnautic-webapp-2026
  AZURE_RESOURCE_GROUP: github-actions-rg

concurrency:
  group: azure-webapp-production
  cancel-in-progress: false

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
          python -m compileall -q app.py
          python - <<'PY'
          from app import app

          app.config["TESTING"] = True
          with app.test_client() as client:
              home = client.get("/")
              assert home.status_code == 200
              assert home.mimetype == "text/html"
              assert b"/static/style.css" in home.data

              health = client.get("/health")
              assert health.status_code == 200
              assert health.get_json() == {
                  "status": "healthy",
                  "application": "azure-webapp-github-actions-cicd",
              }

              stylesheet = client.get("/static/style.css")
              assert stylesheet.status_code == 200
              assert stylesheet.mimetype == "text/css"

          print("Application smoke checks passed.")
          PY

      - name: Package Application
        run: zip -r app.zip app.py requirements.txt templates static

      - name: Login to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Enable Azure Build Automation
        run: |
          az webapp config appsettings set \
            --resource-group "$AZURE_RESOURCE_GROUP" \
            --name "$AZURE_WEBAPP_NAME" \
            --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true \
            --output none

      - name: Deploy Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          package: app.zip
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

Change the hero heading in `templates/index.html`:

```html
<h1 id="hero-title">Version 2<br><span class="highlight">deployed.</span></h1>
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
