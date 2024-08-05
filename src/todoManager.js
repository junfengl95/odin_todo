import Project from './project';
import TodoFactory from './todoFactory';

const todoManager = (() => {
    const projects = [];
    let currentProject = new Project('Default');
    projects.push(project);

    const addProject = (name) => {
        const project = new Project(name);
        projects.push(project);
    }

    const setCurrentProject = (name) => {
        currentProject = projects.find(project => project.name === name);
    }

    const addTodoToCurrentProject = (name) => {
        const todoFactory = TodoFactory();
        const todo = todoFactory.createTodo(title, description, dueDate, priority, note, checklist);
        currentProject.addTodo(todo);
    };

    return { addProject, setCurrentProject, addTodoToCurrentProject, currentProject, projects};

})();

export default todoManager;