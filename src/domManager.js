import todoManager from "./todoManager";

const domManager = (() => {
    const renderProjects = (projects) => {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        projects.forEach(project => {
            const projectItem = document.createElement('li');
            projectItem.textContent = project.name;
            projectItem.addEventListener('click', () => {
                todoManager.setCurrentProject(project.name);
                renderTodos(todoManager.getTodosFromProject());
            });
            projectList.appendChild(projectItem);
        });
    };

    const renderTodos = (todos) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;
            todoItem.addEventListener('click', () => {
                // Expand details to change ~ maybe a dialog box
                console.log(`Title: ${todo.title}, \n Description: ${todo.description} \n Due Date: ${todo.dueDate}`)
            });
            todoList.appendChild(todoItem);
        });
    };

    // const getPriorityColor = (priority) => {
    //     switch (priority){
    //         case 'low':
    //             return 'green';
    //         case 'medium':
    //             return 'orange';
    //         case 'high':
    //             return 'red';
    //         default:
    //             return 'grey'
    //     }
    // };

    return { renderProjects, renderTodos };
})();

export default domManager;