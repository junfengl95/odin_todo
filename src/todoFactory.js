const TodoFactory = () => {
    const createTodo = (title, description, dueDate, priority, note = '', checklist = []) => {
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

    return { createTodo};
};

export default TodoFactory;