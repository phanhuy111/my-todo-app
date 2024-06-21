# Task Manager Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [State Management and Data Persistence](#state-management-and-data-persistence)

## Introduction

This is a simple task manager application built with Vite, React, Hook Form, and Framer Motion. The application allows users to add, update, delete, and reorder tasks. Task data is persisted using local storage.

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Reorder tasks with drag-and-drop functionality
- Data persistence with local storage
- Animation

## Project Structure

```sh
├── public
├── src
│ ├── components
│ │ ├── TaskItem.tsx
│ │ ├── TaskList.tsx
│ │ ├── AddTaskForm.tsx
│ ├── context
│ │ ├── DataContext.tsx
│ ├── styles
│ │ ├── index.css
│ ├── App.tsx
│ ├── main.tsx
│ ├── types.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
```

- **components**: Contains React components for displaying and managing tasks.
- **context**: Contains the data context for state management.
- **styles**: Contains CSS files for styling the application.
- **types.ts**: Contains TypeScript type definitions.

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn

### Installation Steps

1. **Clone the repository:**

```sh
    git clone https://github.com/phanhuy111/my-todo-app.git
    cd my-todo-app
```

2. **Install dependencies:**

```sh
    npm install
    # or
    yarn install
```

3. **Running the Application:**

```sh
    npm run dev
    # or
    yarn dev
```

Open your browser and go to http://localhost:3000.

4. **Usage:**

```sh
  Add Task: Fill out the form and click "Add Task" to add a new task.
  Update Task: Click on a task and modify its title or description to update it.
  Delete Task: Click the delete icon to remove a task.
  Toggle Status: Click the checkbox to mark a task as completed or pending.
  Reorder Tasks: Drag and drop tasks to reorder them.
  Technologies Used
  Vite: For blazing-fast development and build.
  React: For building the user interface.
  React Hook Form: For form management.
  Framer Motion: For animations and drag-and-drop functionality.
  TypeScript: For type safety.
```
