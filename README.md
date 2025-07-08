# Project Setup and Development Guide

This guide provides step-by-step instructions for setting up the project, creating a branch, and running the backend.

## Prerequisites

- Node.js and npm installed on your machine.
- Git installed on your machine
- Access to the project repository

## Steps to Follow Before Developing Features

### 1. Create a Branch and Clone the Repository

1. Please ask the Team lead to create a branch for you (naming convention `yourname_feature_classname`).
2. Once the branch is created please clone it.
   ```sh
   git clone <repository_url>
   ```
3. Happy coding!!!

## OR

### 1. Clone the Repository and Create a Branch

1. Clone the repository:

   ```sh
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```sh
   cd <project_directory>
   ```

3. Create and switch to a new branch following the naming convention `yourname_feature_classname`:
   ```sh
   git checkout -b yourname_feature_classname
   ```

### 2. Set Up the Backend

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Fix any dependency issues (if any dependencies fail to install or you encounter errors, resolve them by checking for compatible versions or missing packages).

### 3. Set Up the Frontend

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Fix any dependency issues (if any dependencies fail to install or you encounter errors, resolve them by checking for compatible versions or missing packages).

4. Start both frontend and backend server from root folder:
   ```sh
   npm run dev --prefix ./backend
   ```

### 4. Additional Instructions (if needed)
- Ensure maintainability and readability by following clean code practices: use descriptive names, keep functions focused, and apply consistent styling. Regularly refactor to simplify and improve the codebase. 

- Add any additional instructions or steps specific to your project setup or environment here.

## Running the Project

Once the backend is set up and running, you can proceed with developing and testing the features.

### Important Notes

- Make sure to commit your changes regularly and push your branch to the remote repository:

  ```sh
  git add .
  git commit -m "Your commit message"
  git push origin yourname_feature_classname
  ```

- When your feature is complete, create a pull request (PR) for code review and merging into the main branch.
- Please ensure you merge the main branch's code into your feature every day before the call.

## Contact

For any issues or questions, please contact team lead.

---

**Replace placeholders like `<repository_url>` and `<project_directory>` with actual values.**
