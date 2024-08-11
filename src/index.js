import todoManager from "./todoManager";
import domManager from "./domManager";
import './styles.css'; // Need to include this to ensure main.js also includes styles.css

document.addEventListener('DOMContentLoaded', () => {

    const projectDialog = document.getElementById('project-dialog');
    const projectCloseBtn = document.getElementById('close-project-dialog');
    
    const todoDialog = document.getElementById('todo-dialog');
    const todoCloseBtn = document.getElementById('close-todo-dialog');

    const updateDialog = document.getElementById('update-todo-dialog');
    const updateTodoCloseBtn = document.getElementById('close-update-todo-dialog');

    //Initial render
    domManager.renderProjects(todoManager.getProjects());
    domManager.renderTodos(todoManager.getTodosFromProject());

    //Event Listeners
    document.getElementById('add-project-btn').addEventListener('click', () => {
        document.getElementById('project-dialog').showModal();
    });

    document.getElementById('add-todo-btn').addEventListener('click', () => {
        document.getElementById('todo-dialog').showModal();
    });

    projectDialog.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = e.target.elements['project-name'].value;
        todoManager.addProject(projectName);
        domManager.renderProjects(todoManager.getProjects());
        e.target.reset(); // Reset the form
        projectDialog.close();
    })

    projectCloseBtn.addEventListener('click', () => {
        projectDialog.close();
    })

    todoDialog.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const title = e.target.elements['todo-title'];
        const description = e.target.elements['todo-description'];
        const dueDate = e.target.elements['todo-duedate'];
        const priority = e.target.elements['todo-priority'];

        const dueDateString = dueDate.value;
        // const dueDateObject = new Date(dueDateString);

        if (title && description && dueDate && priority) {
            console.log("Title,", title.value);
            console.log("Description,", description.value);
            console.log("Due Date as String,", dueDateString);
            // console.log("Due Date as Object,", dueDateObject);
            console.log("Priority,", priority.value);

            todoManager.addTodoToProject(title.value, description.value, dueDate.value, priority.value);
            domManager.renderTodos(todoManager.getTodosFromProject());
            e.target.reset();
            todoDialog.close();
        } else {
            console.error("One or more form elements are undefined")
        }
    });

    todoCloseBtn.addEventListener('click', () => {
        todoDialog.close();
    });

    updateTodoCloseBtn.addEventListener('click', () => {
        updateDialog.close();
    })

});