import { de } from 'date-fns/locale/de';
import TodoFactory from './todoFactory';
import ProjectFactory from './projectFactory';


const todoManager = (() => {
    let projects = [];
    let currentProject = null;

    // Initialize project
    const init = () => {
        const defaultProject = ProjectFactory('Default');
        const todoFactory = TodoFactory();

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
    };


    const addProject = (name) => {
        if (projects.some(project => project.name === name)) {
            throw new Error(`Project with ${name} already exists`)
        }
        const newProject = ProjectFactory(name);
        projects.push(newProject);
        if (!currentProject) {
            currentProject = newProject;
        }
    };

    const removeProject = (projectName) => {
        if (projects.length === 1) {
            throw new Error('Cannot remove the last project');
        }
        projects = projects.filter(project => project.name !== projectName);
        if (currentProject.name === projectName) {
            currentProject = projects[0] || null;
        }
    };

    const setCurrentProject = (name) => {
        const project = projects.find(project => project.name === name);
        if (project) {
            currentProject = project;
        } else {
            throw new Error('Project not found');
        }
    };

    const addTodoToProject = ( title, description, dueDute, priority, notes = '', checklist = []) => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        const todoFactory = TodoFactory();
        const todo = todoFactory.createTodo(title, description, dueDute, priority, notes, checklist);
        currentProject.addTodo(todo);
    };

    const removeTodoFromProject = (title) => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        currentProject.removeTodo(title);
    };

    const getTodosFromProject = (projectName) => {
        if (!currentProject) {
            throw new Error('No current project selected');
        }
        return currentProject ? currentProject.getTodos(): []; // either todos or empty array
    };
    

    const getProjects = () => {
        return projects;
    };

    init(); // Initialize project with todos

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