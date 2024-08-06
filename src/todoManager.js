import TodoFactory from './todoFactory';
import ProjectFactory from './projectFactory';


const todoManager = (() => {
    let projects = [];
    let currentProject = null;

    const todoFactory = TodoFactory();

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
                const project = ProjectFactory(projectData.name);
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
            const defaultProject = ProjectFactory('Default');
            const todo1 = todoFactory.createTodo(
                'Clean house',
                'Spend the afternoon cleaning',
                '2024-08-10',
                'medium'
            );
            const todo2 = todoFactory.createTodo(
                'Clook Dinner',
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

    const addProject = (name) => {
        const project = ProjectFactory(name);
        projects.push(project);
        saveToLocalStorage();
    };

    const removeProject = (projectName) => {
        projects = projects.filter((project) => project.name !== name);
        if (currentProject.name === name){
            currentProject = project.length > 0 ? projects[0] : null;
        }
        saveToLocalStorage();
    };

    const setCurrentProject = (name) => {
        currentProject = projects.find((project) => project.name === name);
        saveToLocalStorage();
    };

    const addTodoToProject = (title, description, dueDute, priority, notes = '', checklist = []) => {
        const todoFactory = TodoFactory();
        const todo = todoFactory.createTodo(title, description, dueDute, priority, notes, checklist);
        currentProject.addTodo(todo);
        saveToLocalStorage();
    };

    const removeTodoFromProject = (title) => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        currentProject.removeTodo(title);
        saveToLocalStorage();
    };

    const getTodosFromProject = () => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        return currentProject ? currentProject.getTodos() : []; // either todos or empty array
    };

    const getProjects = () => {
        return projects;
    };

    loadFromLocalStorage(); // Initialize project with todos

    return {
        addProject,
        removeProject,
        setCurrentProject,
        addTodoToProject,
        removeTodoFromProject,
        getTodosFromProject,
        getProjects,
    };
})();

export default todoManager;