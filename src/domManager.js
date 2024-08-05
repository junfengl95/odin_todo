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

        closeProjectDialog


    };

    return {renderProjects, renderTools, bindEventListeners };
})

export default domManager;