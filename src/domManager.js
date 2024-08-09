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
        todos.forEach((todo, index) => { // include index to ensure correct replacement
            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;

            // Add click event listener to open the update dialog
            todoItem.addEventListener('click', () => {
                openUpdateTodoDialog(todo, index);
            });
            
            todoList.appendChild(todoItem);
        });
    };

    const openUpdateTodoDialog = (todo, index) => {
        const updateDialog = document.getElementById('update-todo-dialog');
        const updateTodoForm = document.getElementById('update-todo-form');

        updateTodoForm.elements['update-todo-title'].value = todo.title;
        updateTodoForm.elements['update-todo-description'].value = todo.description;
        updateTodoForm.elements['update-todo-duedate'].value = todo.dueDate;
        updateTodoForm.elements['update-todo-priority'].value = todo.priority;

        // Open the dialog
        updateDialog.showModal();

        updateTodoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('update-todo-title').value;
            const description = document.getElementById('update-todo-description').value;
            const dueDate = document.getElementById('update-todo-duedate').value;
            const priority = document.getElementById('update-todo-priority').value;

            // update the todo in the project
            todoManager.updateTodoInProject(index, title, description, dueDate, priority);

            updateDialog.close();

            //Re-render todos
            renderTodos(todoManager.getCurrentProject().getTodos());
        })
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