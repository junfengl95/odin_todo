const projectFactory = (name) => {
    let todos = [];

    const addTodo = (todo) => {
        todos.push(todo);
    };

    const removeTodo = (todoTitle) => {
        todos = todos.filter(todo => todo.title !== todoTitle);
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