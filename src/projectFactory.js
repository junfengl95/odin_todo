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

export default projectFactory;