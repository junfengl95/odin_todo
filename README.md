# Todo Project

This is a Simple Todo Application developed using JavaScript For the Odin Project Module

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies](#technologies)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/junfengl95/odin_todo.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Usage

1. To start the development server:

    ```bash
    npm run start
    ```

2. To build the project for production:

    ```bash
    npm run build
    ```

3. Open `index.html` in your browser to view the app.

## Deployment

To deploy the project to GitHub Pages:

1. Make sure the `dist` directory is not in your `.gitignore` file.

2. Commit the `dist` directory:

    ```bash
    git add dist && git commit -m "Initial dist subtree commit"
    ```

3. Push the `dist` folder to the `gh-pages` branch:

    ```bash
    git subtree push --prefix dist origin gh-pages
    ```

4. Your project should now be live at `https://your-username.github.io/your-repo/`.

## Technologies

- **JavaScript**: Core language used.
- **Webpack**: Module bundler.
- **CSS**: Styling the application.
- **HTML**: Structure of the web application.
- **npm**: Package manager to handle dependencies.
