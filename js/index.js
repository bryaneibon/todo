class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.initializeElements();
        this.addEventListeners();
        this.render();
    }

    initializeElements() {
        this.$form = $('.todo-form');
        this.$input = $('.todo-input');
        this.$list = $('.todo-list');
        this.$filterButtons = $('.filter-btn');
    }

    addEventListeners() {
        this.$form.on('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        this.$filterButtons.on('click', (e) => {
            this.setFilter($(e.currentTarget).data('filter'));
        });

        // Ajout de l'animation de suppression
        this.$list.on('click', '.delete-btn', (e) => {
            const $item = $(e.currentTarget).closest('.todo-item');
            $item.fadeOut(300, () => {
                this.deleteTodo($(e.currentTarget).data('id'));
            });
        });

        // Toggle avec animation
        this.$list.on('change', '.todo-checkbox', (e) => {
            const $item = $(e.currentTarget).closest('.todo-item');
            $item.fadeOut(150).fadeIn(150);
            this.toggleTodo($(e.currentTarget).data('id'));
        });
    }

    addTodo() {
        const text = this.$input.val().trim();
        if (text) {
            const newTodo = {
                id: Date.now(),
                text,
                completed: false
            };
            
            this.todos.push(newTodo);
            this.$input.val('');
            this.saveTodos();
            
            // Ajouter avec animation
            const $newTodoElement = this.createTodoElement(newTodo);
            $newTodoElement.hide();
            this.$list.prepend($newTodoElement);
            $newTodoElement.slideDown(300);
        }
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        this.saveTodos();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.$filterButtons.removeClass('active');
        this.$filterButtons.filter(`[data-filter="${filter}"]`).addClass('active');
        this.render();
    }

    getFilteredTodos() {
        switch(this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    createTodoElement(todo) {
        return $(`
            <li class="list-group-item todo-item ${todo.completed ? 'completed bg-light' : ''}">
                <div class="d-flex align-items-center">
                    <div class="form-check">
                        <input type="checkbox" 
                               class="form-check-input todo-checkbox" 
                               ${todo.completed ? 'checked' : ''}
                               data-id="${todo.id}">
                        <span class="todo-text ms-2">${todo.text}</span>
                    </div>
                    <button class="btn btn-danger btn-sm ms-auto delete-btn" data-id="${todo.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </li>
        `);
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        this.$list.empty();
        
        filteredTodos.forEach(todo => {
            this.$list.append(this.createTodoElement(todo));
        });
    }
}

$(document).ready(() => {
    const todoList = new TodoList();
});