import Project from "./project";
import todoManager from "./todoManager";

const domManager = (() => {

    const projectListElements = document.getElementById('project-list');
    const todoListElement = document.getElementById('todo-list');
    const currentProjectNameElement = document.getElementById('current-project-name');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addTodoBtn = document.getElementById('add-todo-btn');

    const projectDialog = document.getElementById('project-dialog');
    const todoDialog = document.getElementById('todo-dialog');
    const closeProjectDialog = document.getElementById('close-project-dialog');
    const closeTodoDialog = documnet.getElementById('close-todo-dialog');
    const projectForm = document.getElementById('project-form');
    const todoForm = document.getElementById('todo-form');


    const renderProjects = (projects) =>{
        projectListElements.innerHTML = ``;
        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.addEventListener('click', ()=> {
                todoManager.setCurrentProject(project.name);
                renderTodos(project.todos);
                currentProjectNameElement.textContent = project.name;
            });
            projectListElements.appendChild(li);
        });
    };

    const renderTodos = (todos) => {
        todoListElement.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = `${todo.title} (Due: ${todo.dueDate})`;
            li.addEventListener('click', () => {
                // Code to expand/edit todo details
            });
            todoListElement.appendChild(li);
        });
    };

    const bindEventListeners = () => {
        addProjectBtn.addEventListener('click', () => {
            projectDialog.showModal();
        });

        addTodoBtn.addEventListener('click', () => {
            todoDialog.showModal();
        });

        closeProjectDialog.addEventListener('click', () => {
            projectDialog.closest();
        });

        closeTodoDialog.addEventListener('click', ()=> {
            todoDialog.closest();
        });

        projectForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const projectName = document.getElementById('project-name').value;
            if (projectName){
                todoManager.addProject(projectName);
                renderProjects(todoManager.projects);
                projectDialog.closest();
            }
        });

        todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('todo-title').value;
            const description = document.getElementById(`todo-description`).value;
            const dueDate = document.getElementById('todo-duedate').value;
            const priority = document.getElementById('todo-priority').value;

            if (title && description && dueDate && priority){ // if all are filled up
                todoManager.addTodoToCurrentProject(title, description, dueDate, priority);
                renderTodos(todoManager.currentProject.todos);
                todoDialog.closest();
            }
        });
    };

    return {renderProjects, renderTools, bindEventListeners };
})

export default domManager;