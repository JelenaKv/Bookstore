# Cypress E2E Testing Project

## 📌 Project Overview
This project contains end-to-end (E2E) tests using **Cypress** for automated testing of web applications.

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Docker](https://www.docker.com/)

### Installation
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```

## 🐳 Docker Setup
This project includes Docker support for running tests in an isolated environment.

- **Build the Docker image:**
  ```sh
  $(DOCKER_COMPOSE) build
  ```
- **Start the container:**
  ```sh
  $(DOCKER_COMPOSE) up -d
  ```
- **Restart the container:**
  ```sh
  make restart
  ```
- **Stop the container:**
  ```sh
  $(DOCKER_COMPOSE) down
  ```

## 🛠 Running Cypress Tests

### Open Cypress UI:
```sh
npm run cy:open
```

### Run Cypress tests with Mochawesome Reporter:
```sh
npm run test:cypress
```

### Run all tests ond chrome and edge in headless mode with Mochawesome Reporter:
```sh
npm run cypress:run:all
```

## 🔄 CI/CD Pipeline (GitLab)
- The Cypress tests are integrated into a **GitLab CI/CD pipeline**.
- Ensure sensitive credentials (e.g., payment details) are added to **GitLab CI/CD Secrets** 

