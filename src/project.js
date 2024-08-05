class Project {
    constructor(name){
        this.name = name;
        this.todo = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(todoTitle){
        this.todo = this.todos.filter(todo => todo.title !== todoTitle);
    }
}

export default Project;