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

export default todoFactory;