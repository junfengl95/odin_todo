import todoManager from "./todoManager";

const domManager = (() => {
    const renderProjects = () => {

        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        todoManager.projects.forEach((project, index) => {

            const projectItem = document.createElement('li');
            projectItem.textContent = project.name;
            projectItem.className = 'project-item';

            // Create delete-btn to remove projects
            const removeBtn = document.createElement('span');
            removeBtn.textContent = 'X';
            removeBtn.className = 'remove-project-btn';

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this project?')){
                    todoManager.removeProject(index);
                    renderProjects();
                    // Re0render if there is a current Project
                    if (todoManager.currentProject){
                        renderTodos(todoManager.getTodosFromProject());
                    }
                }
            });


            projectItem.addEventListener('click', () => {
                todoManager.setCurrentProject(project.name);
                renderTodos(todoManager.getTodosFromProject());
            });

            projectItem.append(removeBtn);
            projectList.appendChild(projectItem);
        });
    };

    const renderTodos = (todos) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach((todo, index) => { // include index to ensure correct replacement
            const todoContainer = document.createElement('div');
            todoContainer.classList.add('todo-container');

            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;

            // Add click event listener to open the update dialog
            todoItem.addEventListener('click', () => {
                openUpdateTodoDialog(todo, index);
            });

            // Add a checkbox to toggle completion status
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.classList.add('todo-checkbox');
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the update dialog from opening
                todo.toggleComplete();
                todoManager.saveToLocalStorage();
                renderTodos(todos);
            });

            // Delete button to remove todos
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this task?')){
                    todoManager.removeTodoFromProject(index);
                    todoManager.saveToLocalStorage();
                    renderTodos(todos);
                }
            })

            // Set the background color based on priority
            todoItem.style.backgroundColor = getPriorityColor(todo.priority);

            // Add a class to todoItem if it is completed
            if (todo.completed){
                todoItem.classList.add('completed-todo');
            }
            
            todoList.appendChild(todoItem);
            todoItem.appendChild(checkbox);
            todoItem.appendChild(deleteBtn);
            todoList.appendChild(todoContainer);
        });
    };

    // Helper function to get color based on priority
    const getPriorityColor = (priority) => {
        // Apply background color based on priority
        switch (priority) {
            case 'low':
                return '#d4edda';
            case 'medium':
                return '#fff3cd';
            case 'high':
                return '#f8d7da';
        }
    };


    // helper function to open update dialog
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