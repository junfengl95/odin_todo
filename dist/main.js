/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domManager.js":
/*!***************************!*\
  !*** ./src/domManager.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todoManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoManager */ "./src/todoManager.js");


const domManager = (() => {
    const renderProjects = () => {

        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].projects.forEach((project, index) => {

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
                    _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].removeProject(index);
                    renderProjects();
                    // Re0render if there is a current Project
                    if (_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].currentProject){
                        renderTodos(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getTodosFromProject());
                    }
                }
            });


            projectItem.addEventListener('click', () => {
                _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].setCurrentProject(project.name);
                renderTodos(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getTodosFromProject());
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
                _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].saveToLocalStorage();
                renderTodos(todos);
            });

            // Delete button to remove todos
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this task?')){
                    _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].removeTodoFromProject(index);
                    _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].saveToLocalStorage();
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
            _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodoInProject(index, title, description, dueDate, priority);

            updateDialog.close();

            //Re-render todos
            renderTodos(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentProject().getTodos());
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domManager);

/***/ }),

/***/ "./src/projectFactory.js":
/*!*******************************!*\
  !*** ./src/projectFactory.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const projectFactory = (name) => {
    let todos = [];

    const addTodo = (todo) => {
        todos.push(todo);
    };

    const removeTodo = (index) => {
        todos.splice(index, 1); // Remove todo by index
    };

    const getTodos = () => {
        return todos;
    }

    return {
        name,
        addTodo,
        removeTodo,
        getTodos
    };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectFactory);

/***/ }),

/***/ "./src/todoFactory.js":
/*!****************************!*\
  !*** ./src/todoFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const todoFactory = () => {
    const createTodo = (title, description, dueDate, priority, notes = '', checklist = []) => {
        return {
            title, 
            description, 
            dueDate,
            priority, 
            notes,
            checklist,
            completed: false,
            toggleComplete(){
                this.completed = !this.completed;
            },
        };
    };

    return { createTodo };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoFactory);

/***/ }),

/***/ "./src/todoManager.js":
/*!****************************!*\
  !*** ./src/todoManager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todoFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoFactory */ "./src/todoFactory.js");
/* harmony import */ var _projectFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectFactory */ "./src/projectFactory.js");



const todoManager = (() => {
    let projects = [];
    let currentProject = null;

    const todoFactory = (0,_todoFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();

    const saveToLocalStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects.map(project => ({
            name: project.name,
            todos: project.getTodos().map(todo => ({
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority,
                notes: todo.notes,
                checklist: todo.checklist,
                completed: todo.completed
            }))
        }))));
        localStorage.setItem('currentProject', JSON.stringify(currentProject ? { name: currentProject.name } : null));
    };

    const loadFromLocalStorage = () => {
        const storedProjects = localStorage.getItem('projects');
        const storedCurrentProject = localStorage.getItem('currentProject');

        if (storedProjects) {
            projects = JSON.parse(storedProjects).map(projectData => {
                const project = (0,_projectFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(projectData.name);
                projectData.todos.forEach(todoData => {
                    const todo = todoFactory.createTodo(
                        todoData.title,
                        todoData.description,
                        todoData.dueDate, // Parse back to Date object
                        todoData.priority,
                        todoData.notes,
                        todoData.checklist
                    );
                    project.addTodo(todo);
                });
                return project;
            });
        }

        // Check if storedCurrentProject exist
        if (storedCurrentProject){
            try {
                const currentProjectData = JSON.parse(storedCurrentProject);
                currentProject = projects.find(project => project.name === currentProjectData.name) || null;
            } catch (error){
                console.error("Error parsing current project data from localStorage", error);
                currentProject = null;
            }
        } else {
            currentProject = null;
        }

        // project empty
        if (!projects.length) {
            // Create default project with default todos
            const defaultProject = (0,_projectFactory__WEBPACK_IMPORTED_MODULE_1__["default"])('Default');
            const todo1 = todoFactory.createTodo(
                'Clean house',
                'Spend the afternoon cleaning',
                '2024-08-10',
                'medium'
            );
            const todo2 = todoFactory.createTodo(
                'Cook Dinner',
                'Prepare Dinner ingredients',
                '2024-08-10',
                'high'
            );

            defaultProject.addTodo(todo1);
            defaultProject.addTodo(todo2);
            projects.push(defaultProject);
            currentProject = defaultProject;
        } else if (!currentProject) {
            currentProject = projects[0];
        }

        saveToLocalStorage();
    };

    const getProjects = () => {
        return projects;
    };

    const getCurrentProject = () => {
        return currentProject;
    }

    const addProject = (name) => {
        const project = (0,_projectFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(name);
        projects.push(project);
        saveToLocalStorage();
    };

    const removeProject = (index) => {
        projects.splice(index, 1);
        
        // Update current Project
        if (projects.length > 0) {
            // Set the previous project as the current project if it exist
            currentProject = projects[Math.min(index, projects.length -1)];
        } else {
            currentProject = null;
        }

        saveToLocalStorage();
    };

    const setCurrentProject = (name) => {
        currentProject = projects.find((project) => project.name === name);
        saveToLocalStorage();
    };

    const addTodoToProject = (title, description, dueDute, priority, notes = '', checklist = []) => {
        const todoFactory = (0,_todoFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
        const todo = todoFactory.createTodo(title, description, dueDute, priority, notes, checklist);
        currentProject.addTodo(todo);
        saveToLocalStorage();
    };

    // Update using index of todo []
    const updateTodoInProject = (index, title, description, dueDate, priority) => {
        if (currentProject){
            const todo = currentProject.getTodos()[index];
            if (todo){
                // Update todo properties
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.priority = priority

                saveToLocalStorage();
            } else {
                console.error('Todo not found at index', index);
            }
        } else {
            console.error('No current project selected');
        }
    };

    const removeTodoFromProject = (index) => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        currentProject.removeTodo(index);
        saveToLocalStorage();
    };

    const getTodosFromProject = () => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        return currentProject ? currentProject.getTodos() : []; // either todos or empty array
    };

    

    loadFromLocalStorage(); // Initialize project with todos

    return {
        projects,
        currentProject,
        addProject,
        removeProject,
        setCurrentProject,
        addTodoToProject,
        updateTodoInProject,
        removeTodoFromProject,
        getTodosFromProject,
        getProjects,
        getCurrentProject,
        saveToLocalStorage
    };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoManager);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todoManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoManager */ "./src/todoManager.js");
/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManager */ "./src/domManager.js");



document.addEventListener('DOMContentLoaded', () => {

    const projectDialog = document.getElementById('project-dialog');
    const projectCloseBtn = document.getElementById('close-project-dialog');
    
    const todoDialog = document.getElementById('todo-dialog');
    const todoCloseBtn = document.getElementById('close-todo-dialog');

    const updateDialog = document.getElementById('update-todo-dialog');
    const updateTodoCloseBtn = document.getElementById('close-update-todo-dialog');

    //Initial render
    _domManager__WEBPACK_IMPORTED_MODULE_1__["default"].renderProjects(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects());
    _domManager__WEBPACK_IMPORTED_MODULE_1__["default"].renderTodos(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getTodosFromProject());

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
        _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectName);
        _domManager__WEBPACK_IMPORTED_MODULE_1__["default"].renderProjects(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects());
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

            _todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].addTodoToProject(title.value, description.value, dueDate.value, priority.value);
            _domManager__WEBPACK_IMPORTED_MODULE_1__["default"].renderTodos(_todoManager__WEBPACK_IMPORTED_MODULE_0__["default"].getTodosFromProject());
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFXO0FBQ25CLFFBQVEsbURBQVUsZ0JBQWdCLG9EQUFXO0FBQzdDLDBCQUEwQjtBQUMxQjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLG9EQUFXO0FBQ3ZCLFlBQVksbURBQVUsYUFBYSxvREFBVztBQUM5QztBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW5fdG9kby8uL3NyYy9kb21NYW5hZ2VyLmpzIiwid2VicGFjazovL29kaW5fdG9kby8uL3NyYy9wcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9vZGluX3RvZG8vLi9zcmMvdG9kb0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vb2Rpbl90b2RvLy4vc3JjL3RvZG9NYW5hZ2VyLmpzIiwid2VicGFjazovL29kaW5fdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluX3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW5fdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW5fdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW5fdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdG9kb01hbmFnZXIgZnJvbSBcIi4vdG9kb01hbmFnZXJcIjtcblxuY29uc3QgZG9tTWFuYWdlciA9ICgoKSA9PiB7XG4gICAgY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0b2RvTWFuYWdlci5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICAgICAgICAgIHByb2plY3RJdGVtLmNsYXNzTmFtZSA9ICdwcm9qZWN0LWl0ZW0nO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGVsZXRlLWJ0biB0byByZW1vdmUgcHJvamVjdHNcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgIHJlbW92ZUJ0bi5jbGFzc05hbWUgPSAncmVtb3ZlLXByb2plY3QtYnRuJztcblxuICAgICAgICAgICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvamVjdD8nKSl7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9NYW5hZ2VyLnJlbW92ZVByb2plY3QoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBSZTByZW5kZXIgaWYgdGhlcmUgaXMgYSBjdXJyZW50IFByb2plY3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvZG9NYW5hZ2VyLmN1cnJlbnRQcm9qZWN0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclRvZG9zKHRvZG9NYW5hZ2VyLmdldFRvZG9zRnJvbVByb2plY3QoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0b2RvTWFuYWdlci5zZXRDdXJyZW50UHJvamVjdChwcm9qZWN0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIHJlbmRlclRvZG9zKHRvZG9NYW5hZ2VyLmdldFRvZG9zRnJvbVByb2plY3QoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJvamVjdEl0ZW0uYXBwZW5kKHJlbW92ZUJ0bik7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJUb2RvcyA9ICh0b2RvcykgPT4ge1xuICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWxpc3QnKTtcbiAgICAgICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7IC8vIGluY2x1ZGUgaW5kZXggdG8gZW5zdXJlIGNvcnJlY3QgcmVwbGFjZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRvZG9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kby1jb250YWluZXInKTtcblxuICAgICAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgdG9kb0l0ZW0udGV4dENvbnRlbnQgPSBgJHt0b2RvLnRpdGxlfSAoRHVlOiAke3RvZG8uZHVlRGF0ZX0pYDtcblxuICAgICAgICAgICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIG9wZW4gdGhlIHVwZGF0ZSBkaWFsb2dcbiAgICAgICAgICAgIHRvZG9JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9wZW5VcGRhdGVUb2RvRGlhbG9nKHRvZG8sIGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBZGQgYSBjaGVja2JveCB0byB0b2dnbGUgY29tcGxldGlvbiBzdGF0dXNcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRvZG8uY29tcGxldGVkO1xuICAgICAgICAgICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZCgndG9kby1jaGVja2JveCcpO1xuICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgdGhlIHVwZGF0ZSBkaWFsb2cgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgICAgICAgdG9kby50b2dnbGVDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRvZG9NYW5hZ2VyLnNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICAgICAgICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgYnV0dG9uIHRvIHJlbW92ZSB0b2Rvc1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idG4nKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHRhc2s/Jykpe1xuICAgICAgICAgICAgICAgICAgICB0b2RvTWFuYWdlci5yZW1vdmVUb2RvRnJvbVByb2plY3QoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0b2RvTWFuYWdlci5zYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyVG9kb3ModG9kb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBiYXNlZCBvbiBwcmlvcml0eVxuICAgICAgICAgICAgdG9kb0l0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ2V0UHJpb3JpdHlDb2xvcih0b2RvLnByaW9yaXR5KTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgY2xhc3MgdG8gdG9kb0l0ZW0gaWYgaXQgaXMgY29tcGxldGVkXG4gICAgICAgICAgICBpZiAodG9kby5jb21wbGV0ZWQpe1xuICAgICAgICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZC10b2RvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgY29sb3IgYmFzZWQgb24gcHJpb3JpdHlcbiAgICBjb25zdCBnZXRQcmlvcml0eUNvbG9yID0gKHByaW9yaXR5KSA9PiB7XG4gICAgICAgIC8vIEFwcGx5IGJhY2tncm91bmQgY29sb3IgYmFzZWQgb24gcHJpb3JpdHlcbiAgICAgICAgc3dpdGNoIChwcmlvcml0eSkge1xuICAgICAgICAgICAgY2FzZSAnbG93JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyNkNGVkZGEnO1xuICAgICAgICAgICAgY2FzZSAnbWVkaXVtJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyNmZmYzY2QnO1xuICAgICAgICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcjZjhkN2RhJztcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vIGhlbHBlciBmdW5jdGlvbiB0byBvcGVuIHVwZGF0ZSBkaWFsb2dcbiAgICBjb25zdCBvcGVuVXBkYXRlVG9kb0RpYWxvZyA9ICh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB1cGRhdGVEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLXRvZG8tZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS10b2RvLWZvcm0nKTtcblxuICAgICAgICB1cGRhdGVUb2RvRm9ybS5lbGVtZW50c1sndXBkYXRlLXRvZG8tdGl0bGUnXS52YWx1ZSA9IHRvZG8udGl0bGU7XG4gICAgICAgIHVwZGF0ZVRvZG9Gb3JtLmVsZW1lbnRzWyd1cGRhdGUtdG9kby1kZXNjcmlwdGlvbiddLnZhbHVlID0gdG9kby5kZXNjcmlwdGlvbjtcbiAgICAgICAgdXBkYXRlVG9kb0Zvcm0uZWxlbWVudHNbJ3VwZGF0ZS10b2RvLWR1ZWRhdGUnXS52YWx1ZSA9IHRvZG8uZHVlRGF0ZTtcbiAgICAgICAgdXBkYXRlVG9kb0Zvcm0uZWxlbWVudHNbJ3VwZGF0ZS10b2RvLXByaW9yaXR5J10udmFsdWUgPSB0b2RvLnByaW9yaXR5O1xuXG4gICAgICAgIC8vIE9wZW4gdGhlIGRpYWxvZ1xuICAgICAgICB1cGRhdGVEaWFsb2cuc2hvd01vZGFsKCk7XG5cbiAgICAgICAgdXBkYXRlVG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLXRvZG8tdGl0bGUnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS10b2RvLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS10b2RvLWR1ZWRhdGUnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS10b2RvLXByaW9yaXR5JykudmFsdWU7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdG9kbyBpbiB0aGUgcHJvamVjdFxuICAgICAgICAgICAgdG9kb01hbmFnZXIudXBkYXRlVG9kb0luUHJvamVjdChpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZURpYWxvZy5jbG9zZSgpO1xuXG4gICAgICAgICAgICAvL1JlLXJlbmRlciB0b2Rvc1xuICAgICAgICAgICAgcmVuZGVyVG9kb3ModG9kb01hbmFnZXIuZ2V0Q3VycmVudFByb2plY3QoKS5nZXRUb2RvcygpKTtcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgXG4gICBcblxuICAgIFxuXG4gICAgLy8gY29uc3QgZ2V0UHJpb3JpdHlDb2xvciA9IChwcmlvcml0eSkgPT4ge1xuICAgIC8vICAgICBzd2l0Y2ggKHByaW9yaXR5KXtcbiAgICAvLyAgICAgICAgIGNhc2UgJ2xvdyc6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuICdncmVlbic7XG4gICAgLy8gICAgICAgICBjYXNlICdtZWRpdW0nOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiAnb3JhbmdlJztcbiAgICAvLyAgICAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiAncmVkJztcbiAgICAvLyAgICAgICAgIGRlZmF1bHQ6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuICdncmV5J1xuICAgIC8vICAgICB9XG4gICAgLy8gfTtcblxuICAgIHJldHVybiB7IHJlbmRlclByb2plY3RzLCByZW5kZXJUb2RvcyB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tTWFuYWdlcjsiLCJjb25zdCBwcm9qZWN0RmFjdG9yeSA9IChuYW1lKSA9PiB7XG4gICAgbGV0IHRvZG9zID0gW107XG5cbiAgICBjb25zdCBhZGRUb2RvID0gKHRvZG8pID0+IHtcbiAgICAgICAgdG9kb3MucHVzaCh0b2RvKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlVG9kbyA9IChpbmRleCkgPT4ge1xuICAgICAgICB0b2Rvcy5zcGxpY2UoaW5kZXgsIDEpOyAvLyBSZW1vdmUgdG9kbyBieSBpbmRleFxuICAgIH07XG5cbiAgICBjb25zdCBnZXRUb2RvcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRvZG9zO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFkZFRvZG8sXG4gICAgICAgIHJlbW92ZVRvZG8sXG4gICAgICAgIGdldFRvZG9zXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RGYWN0b3J5OyIsImNvbnN0IHRvZG9GYWN0b3J5ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZVRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMgPSAnJywgY2hlY2tsaXN0ID0gW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlLCBcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLCBcbiAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICBwcmlvcml0eSwgXG4gICAgICAgICAgICBub3RlcyxcbiAgICAgICAgICAgIGNoZWNrbGlzdCxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICB0b2dnbGVDb21wbGV0ZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgY3JlYXRlVG9kbyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0ZhY3Rvcnk7IiwiaW1wb3J0IFRvZG9GYWN0b3J5IGZyb20gJy4vdG9kb0ZhY3RvcnknO1xuaW1wb3J0IFByb2plY3RGYWN0b3J5IGZyb20gJy4vcHJvamVjdEZhY3RvcnknO1xuXG5jb25zdCB0b2RvTWFuYWdlciA9ICgoKSA9PiB7XG4gICAgbGV0IHByb2plY3RzID0gW107XG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvZG9GYWN0b3J5ID0gVG9kb0ZhY3RvcnkoKTtcblxuICAgIGNvbnN0IHNhdmVUb0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMubWFwKHByb2plY3QgPT4gKHtcbiAgICAgICAgICAgIG5hbWU6IHByb2plY3QubmFtZSxcbiAgICAgICAgICAgIHRvZG9zOiBwcm9qZWN0LmdldFRvZG9zKCkubWFwKHRvZG8gPT4gKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdG9kby50aXRsZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdG9kby5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBkdWVEYXRlOiB0b2RvLmR1ZURhdGUsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IHRvZG8ucHJpb3JpdHksXG4gICAgICAgICAgICAgICAgbm90ZXM6IHRvZG8ubm90ZXMsXG4gICAgICAgICAgICAgICAgY2hlY2tsaXN0OiB0b2RvLmNoZWNrbGlzdCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IHRvZG8uY29tcGxldGVkXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSkpKSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvamVjdCcsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRQcm9qZWN0ID8geyBuYW1lOiBjdXJyZW50UHJvamVjdC5uYW1lIH0gOiBudWxsKSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGxvYWRGcm9tTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdG9yZWRQcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpO1xuICAgICAgICBjb25zdCBzdG9yZWRDdXJyZW50UHJvamVjdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpO1xuXG4gICAgICAgIGlmIChzdG9yZWRQcm9qZWN0cykge1xuICAgICAgICAgICAgcHJvamVjdHMgPSBKU09OLnBhcnNlKHN0b3JlZFByb2plY3RzKS5tYXAocHJvamVjdERhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0RmFjdG9yeShwcm9qZWN0RGF0YS5uYW1lKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGF0YS50b2Rvcy5mb3JFYWNoKHRvZG9EYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kbyA9IHRvZG9GYWN0b3J5LmNyZWF0ZVRvZG8oXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvRGF0YS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9EYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb0RhdGEuZHVlRGF0ZSwgLy8gUGFyc2UgYmFjayB0byBEYXRlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb0RhdGEucHJpb3JpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvRGF0YS5ub3RlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9EYXRhLmNoZWNrbGlzdFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmFkZFRvZG8odG9kbyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHN0b3JlZEN1cnJlbnRQcm9qZWN0IGV4aXN0XG4gICAgICAgIGlmIChzdG9yZWRDdXJyZW50UHJvamVjdCl7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0RGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVkQ3VycmVudFByb2plY3QpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QubmFtZSA9PT0gY3VycmVudFByb2plY3REYXRhLm5hbWUpIHx8IG51bGw7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgY3VycmVudCBwcm9qZWN0IGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByb2plY3QgZW1wdHlcbiAgICAgICAgaWYgKCFwcm9qZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IHByb2plY3Qgd2l0aCBkZWZhdWx0IHRvZG9zXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IFByb2plY3RGYWN0b3J5KCdEZWZhdWx0Jyk7XG4gICAgICAgICAgICBjb25zdCB0b2RvMSA9IHRvZG9GYWN0b3J5LmNyZWF0ZVRvZG8oXG4gICAgICAgICAgICAgICAgJ0NsZWFuIGhvdXNlJyxcbiAgICAgICAgICAgICAgICAnU3BlbmQgdGhlIGFmdGVybm9vbiBjbGVhbmluZycsXG4gICAgICAgICAgICAgICAgJzIwMjQtMDgtMTAnLFxuICAgICAgICAgICAgICAgICdtZWRpdW0nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgdG9kbzIgPSB0b2RvRmFjdG9yeS5jcmVhdGVUb2RvKFxuICAgICAgICAgICAgICAgICdDb29rIERpbm5lcicsXG4gICAgICAgICAgICAgICAgJ1ByZXBhcmUgRGlubmVyIGluZ3JlZGllbnRzJyxcbiAgICAgICAgICAgICAgICAnMjAyNC0wOC0xMCcsXG4gICAgICAgICAgICAgICAgJ2hpZ2gnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkZWZhdWx0UHJvamVjdC5hZGRUb2RvKHRvZG8xKTtcbiAgICAgICAgICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRvZG8odG9kbzIpO1xuICAgICAgICAgICAgcHJvamVjdHMucHVzaChkZWZhdWx0UHJvamVjdCk7XG4gICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IGRlZmF1bHRQcm9qZWN0O1xuICAgICAgICB9IGVsc2UgaWYgKCFjdXJyZW50UHJvamVjdCkge1xuICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9qZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdEZhY3RvcnkobmFtZSk7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgY3VycmVudCBQcm9qZWN0XG4gICAgICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHByZXZpb3VzIHByb2plY3QgYXMgdGhlIGN1cnJlbnQgcHJvamVjdCBpZiBpdCBleGlzdFxuICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1tNYXRoLm1pbihpbmRleCwgcHJvamVjdHMubGVuZ3RoIC0xKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBhZGRUb2RvVG9Qcm9qZWN0ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRHV0ZSwgcHJpb3JpdHksIG5vdGVzID0gJycsIGNoZWNrbGlzdCA9IFtdKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9GYWN0b3J5ID0gVG9kb0ZhY3RvcnkoKTtcbiAgICAgICAgY29uc3QgdG9kbyA9IHRvZG9GYWN0b3J5LmNyZWF0ZVRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEdXRlLCBwcmlvcml0eSwgbm90ZXMsIGNoZWNrbGlzdCk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LmFkZFRvZG8odG9kbyk7XG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICAvLyBVcGRhdGUgdXNpbmcgaW5kZXggb2YgdG9kbyBbXVxuICAgIGNvbnN0IHVwZGF0ZVRvZG9JblByb2plY3QgPSAoaW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRQcm9qZWN0KXtcbiAgICAgICAgICAgIGNvbnN0IHRvZG8gPSBjdXJyZW50UHJvamVjdC5nZXRUb2RvcygpW2luZGV4XTtcbiAgICAgICAgICAgIGlmICh0b2RvKXtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdG9kbyBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgdG9kby50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgICAgICAgIHRvZG8uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB0b2RvLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRvZG8ucHJpb3JpdHkgPSBwcmlvcml0eVxuXG4gICAgICAgICAgICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RvZG8gbm90IGZvdW5kIGF0IGluZGV4JywgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gY3VycmVudCBwcm9qZWN0IHNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlVG9kb0Zyb21Qcm9qZWN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICghY3VycmVudFByb2plY3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY3VycmVudCBwcm9qZWN0IHNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2plY3QucmVtb3ZlVG9kbyhpbmRleCk7XG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRUb2Rvc0Zyb21Qcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWN1cnJlbnRQcm9qZWN0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvamVjdCA/IGN1cnJlbnRQcm9qZWN0LmdldFRvZG9zKCkgOiBbXTsgLy8gZWl0aGVyIHRvZG9zIG9yIGVtcHR5IGFycmF5XG4gICAgfTtcblxuICAgIFxuXG4gICAgbG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTsgLy8gSW5pdGlhbGl6ZSBwcm9qZWN0IHdpdGggdG9kb3NcblxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjdXJyZW50UHJvamVjdCxcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgc2V0Q3VycmVudFByb2plY3QsXG4gICAgICAgIGFkZFRvZG9Ub1Byb2plY3QsXG4gICAgICAgIHVwZGF0ZVRvZG9JblByb2plY3QsXG4gICAgICAgIHJlbW92ZVRvZG9Gcm9tUHJvamVjdCxcbiAgICAgICAgZ2V0VG9kb3NGcm9tUHJvamVjdCxcbiAgICAgICAgZ2V0UHJvamVjdHMsXG4gICAgICAgIGdldEN1cnJlbnRQcm9qZWN0LFxuICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2VcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb01hbmFnZXI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdG9kb01hbmFnZXIgZnJvbSBcIi4vdG9kb01hbmFnZXJcIjtcbmltcG9ydCBkb21NYW5hZ2VyIGZyb20gXCIuL2RvbU1hbmFnZXJcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblxuICAgIGNvbnN0IHByb2plY3REaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kaWFsb2cnKTtcbiAgICBjb25zdCBwcm9qZWN0Q2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtcHJvamVjdC1kaWFsb2cnKTtcbiAgICBcbiAgICBjb25zdCB0b2RvRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZGlhbG9nJyk7XG4gICAgY29uc3QgdG9kb0Nsb3NlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXRvZG8tZGlhbG9nJyk7XG5cbiAgICBjb25zdCB1cGRhdGVEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLXRvZG8tZGlhbG9nJyk7XG4gICAgY29uc3QgdXBkYXRlVG9kb0Nsb3NlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXVwZGF0ZS10b2RvLWRpYWxvZycpO1xuXG4gICAgLy9Jbml0aWFsIHJlbmRlclxuICAgIGRvbU1hbmFnZXIucmVuZGVyUHJvamVjdHModG9kb01hbmFnZXIuZ2V0UHJvamVjdHMoKSk7XG4gICAgZG9tTWFuYWdlci5yZW5kZXJUb2Rvcyh0b2RvTWFuYWdlci5nZXRUb2Rvc0Zyb21Qcm9qZWN0KCkpO1xuXG4gICAgLy9FdmVudCBMaXN0ZW5lcnNcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRpYWxvZycpLnNob3dNb2RhbCgpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10b2RvLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1kaWFsb2cnKS5zaG93TW9kYWwoKTtcbiAgICB9KTtcblxuICAgIHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignZm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBlLnRhcmdldC5lbGVtZW50c1sncHJvamVjdC1uYW1lJ10udmFsdWU7XG4gICAgICAgIHRvZG9NYW5hZ2VyLmFkZFByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICBkb21NYW5hZ2VyLnJlbmRlclByb2plY3RzKHRvZG9NYW5hZ2VyLmdldFByb2plY3RzKCkpO1xuICAgICAgICBlLnRhcmdldC5yZXNldCgpOyAvLyBSZXNldCB0aGUgZm9ybVxuICAgICAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XG4gICAgfSlcblxuICAgIHByb2plY3RDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHJvamVjdERpYWxvZy5jbG9zZSgpO1xuICAgIH0pXG5cbiAgICB0b2RvRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5lbGVtZW50c1sndG9kby10aXRsZSddO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGUudGFyZ2V0LmVsZW1lbnRzWyd0b2RvLWRlc2NyaXB0aW9uJ107XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBlLnRhcmdldC5lbGVtZW50c1sndG9kby1kdWVkYXRlJ107XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZS50YXJnZXQuZWxlbWVudHNbJ3RvZG8tcHJpb3JpdHknXTtcblxuICAgICAgICBjb25zdCBkdWVEYXRlU3RyaW5nID0gZHVlRGF0ZS52YWx1ZTtcbiAgICAgICAgLy8gY29uc3QgZHVlRGF0ZU9iamVjdCA9IG5ldyBEYXRlKGR1ZURhdGVTdHJpbmcpO1xuXG4gICAgICAgIGlmICh0aXRsZSAmJiBkZXNjcmlwdGlvbiAmJiBkdWVEYXRlICYmIHByaW9yaXR5KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRpdGxlLFwiLCB0aXRsZS52YWx1ZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlc2NyaXB0aW9uLFwiLCBkZXNjcmlwdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkR1ZSBEYXRlIGFzIFN0cmluZyxcIiwgZHVlRGF0ZVN0cmluZyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkR1ZSBEYXRlIGFzIE9iamVjdCxcIiwgZHVlRGF0ZU9iamVjdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByaW9yaXR5LFwiLCBwcmlvcml0eS52YWx1ZSk7XG5cbiAgICAgICAgICAgIHRvZG9NYW5hZ2VyLmFkZFRvZG9Ub1Byb2plY3QodGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLnZhbHVlLCBwcmlvcml0eS52YWx1ZSk7XG4gICAgICAgICAgICBkb21NYW5hZ2VyLnJlbmRlclRvZG9zKHRvZG9NYW5hZ2VyLmdldFRvZG9zRnJvbVByb2plY3QoKSk7XG4gICAgICAgICAgICBlLnRhcmdldC5yZXNldCgpO1xuICAgICAgICAgICAgdG9kb0RpYWxvZy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9uZSBvciBtb3JlIGZvcm0gZWxlbWVudHMgYXJlIHVuZGVmaW5lZFwiKVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0b2RvQ2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZG9EaWFsb2cuY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIHVwZGF0ZVRvZG9DbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXBkYXRlRGlhbG9nLmNsb3NlKCk7XG4gICAgfSlcblxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9