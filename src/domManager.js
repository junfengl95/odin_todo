import todoManager from "./todoManager";

const domManager = (() => {
    const renderProjects = (projects) => {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.addEventListener('click', () => {
                todoManager.setCurrentProject(project.name);
                renderTodos(todoManager.getTodosFromProject());
            });
            projectList.appendChild(li);
        });
    };

    const renderTodos = (todos) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = `${todo.title} (Due: ${todo.dueDate})`;
            li.addEventListener('click', () => {
                // Expand details to change ~ maybe a dialog box
            });
            todoList.appendChild(li);
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority){
            case 'low':
                return 'green';
            case 'medium':
                return 'orange';
            case 'high':
                return 'red';
            default:
                return 'grey'
        }
    };

    return { renderProjects, renderTodos };
})();

export default domManager;