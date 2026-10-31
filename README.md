QA Automation (WebdriverIO + Cucumber + TypeScript) — SauceDemo
This project is an E2E QA automation suite for https://www.saucedemo.com/ using:

WebdriverIO
Cucumber
TypeScript
Page Object Model (POM)
Allure Reporting

✅ Prerequisites
Node.js 18+ (recommended)
Google Chrome installed
npm available in your PATH
Windows PowerShell (project was built/tested in this environment)
📦 Install dependencies
From the project root (where package.json is located):

npm install
🔧 Dependencies (installed via npm)
Core dependencies (from package.json):

@wdio/local-runner
@wdio/cucumber-framework
@wdio/spec-reporter
@wdio/allure-reporter
@wdio/types, @wdio/globals, @wdio/cli
ts-node, typescript
rimraf
expect-webdriverio
No extra global installs are required besides Node.js.

📁 Project structure
features/ — Cucumber .feature files
step-definitions/ — Cucumber steps (*.ts)
pageobjects/ — Page Object Model (*.ts)
wdio.conf.ts — WebdriverIO configuration + hooks + Allure config
tmp/ — screenshots saved by the hook (PNG)
allure-results/ — raw Allure results generated during execution
allure-report/ — generated Allure HTML report

▶️ How to run tests
Run all tests
    npm test
    This will: 
            - clean allure-results, allure-report, and tmp
            - execute WebdriverIO using ./wdio.conf.ts

Run only a single feature
    npm test -- --spec features/01.login.feature

📊 Generate and open Allure report
The project already supports report generation via scripts.

Generate + open Allure report
    npm run allure:publish
    This runs:
            - allure generate allure-results --clean -o allure-report
            - allure open allure-report

Run tests and publish Allure (one command)
    npm run test:withAllure

🧾 Useful npm scripts
Clean Allure + tmp
    npm run clean:allure
Generate report
    npm run allure:generate
Open report
    npm run allure:open
Publish report (generate + open)
    npm run allure:publish
Tests + Allure publish
    npm run test:withAllure

Notes
Screenshots are saved locally in tmp/ (PNG).
Allure attachments depend on what the project hook supports in the current WDIO/Allure setup.