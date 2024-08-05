import todoManager from "./todoManager";
import domManager from "./domManager";

document.addEventListener('DOMContentLoaded', () => {
    todoManager.addProject(`Default`);
    domManager.renderProjects(todoManager);
    domManager.renderTodos(todoManager.currentProject.todos);
    domManager.bindEventListeners();
});