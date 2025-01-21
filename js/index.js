class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.currentPriorityFilter = 'all';
        this.currentSort = 'date'; // default sort
        this.initializeElements();
        this.addEventListeners();
        this.render();
        this.initializeFooter();
    }

    initializeElements() {
        this.$form = $('.todo-form');
        this.$input = $('.form-control');
        this.$prioritySelect = $('.priority-select');
        this.$list = $('.todo-list');
        this.$filterButtons = $('.filter-btn');
        this.$priorityFilters = $('.priority-filter');
        this.$invalidFeedback = $('.invalid-feedback');
        this.$sortButtons = $('.sort-btn');
        this.$dateInput = $('.date-input');
        this.$dateInput.attr('min', new Date().toISOString().split('T')[0]);
    }

    initializeFooter() {
        const currentYear = new Date().getFullYear();
        $('#year').text(currentYear);
    }

    addEventListeners() {
        this.$form.on('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        this.$filterButtons.on('click', (e) => {
            this.setFilter($(e.currentTarget).data('filter'));
        });

        this.$list.on('click', '.delete-btn', (e) => {
            const $item = $(e.currentTarget).closest('.todo-item');
            $item.fadeOut(300, () => {
                this.deleteTodo($(e.currentTarget).data('id'));
            });
        });

        this.$list.on('change', '.todo-checkbox', (e) => {
            const $item = $(e.currentTarget).closest('.todo-item');
            $item.fadeOut(150).fadeIn(150);
            this.toggleTodo($(e.currentTarget).data('id'));
        });

        this.$priorityFilters.on('click', (e) => {
            e.preventDefault();
            this.setPriorityFilter($(e.currentTarget).data('priority'));
        });

        this.$sortButtons.on('click', (e) => {
            const sortType = $(e.currentTarget).data('sort');
            this.setSort(sortType);
        });
    }

    validateUniqueness(text) {
        const normalizedText = text.trim().toLowerCase();
        const exists = this.todos.some(todo => 
            todo.text.trim().toLowerCase() === normalizedText
        );

        if (exists) {
            this.$invalidFeedback.addClass('show');
            setTimeout(() => {
                this.$invalidFeedback.removeClass('show');
            }, 3000);
            return false;
        }
        return true;
    }

    addTodo() {
        const text = this.$input.val().trim();
        const dueDate = this.$dateInput.val();
        
        if (text && this.validateUniqueness(text)) {
            const newTodo = {
                id: Date.now(),
                text,
                completed: false,
                priority: this.$prioritySelect.val(),
                dueDate: dueDate || null,
                subtasks: [],
                parentId: null
            };
            
            this.todos.unshift(newTodo);
            this.$input.val('');
            this.$dateInput.val('');
            this.saveTodos();
            
            const $newTodoElement = this.createTodoElement(newTodo);
            $newTodoElement.hide();
            this.$list.prepend($newTodoElement);
            $newTodoElement.slideDown(300);
        }
    }

    setSort(sortType) {
        this.currentSort = sortType;
        this.$sortButtons.removeClass('active');
        this.$sortButtons.filter(`[data-sort="${sortType}"]`).addClass('active');
        this.render();
    }

    setPriorityFilter(priority) {
        this.currentPriorityFilter = priority;
        this.render();
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
        let filtered = this.todos;

        switch(this.currentFilter) {
            case 'active':
                filtered = filtered.filter(todo => !todo.completed);
                break;
            case 'completed':
                filtered = filtered.filter(todo => todo.completed);
                break;
        }

        if (this.currentPriorityFilter !== 'all') {
            filtered = filtered.filter(todo => todo.priority === this.currentPriorityFilter);
        }
        return filtered;
    }

    getFilteredAndSortedTodos() {
        let todos = this.getFilteredTodos();

        // Tri des tâches
        todos.sort((a, b) => {
            if (this.currentSort === 'date') {
                // Tâches sans date en dernier
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else {
                // Tri par priorité
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
        });

        return todos;
    }

    createTodoElement(todo) {
        const priorityText = {
            high: 'High Priority',
            medium: 'Medium Priority',
            low: 'Low Priority'
        };

        const dueDateHtml = todo.dueDate ? `
            <span class="date-badge ${this.isExpired(todo.dueDate) ? 'expired' : ''}">
                <i class="bi bi-calendar2"></i> 
                ${this.formatDate(todo.dueDate)}
            </span>
        ` : '';

        return $(`
            <li class="list-group-item todo-item priority-${todo.priority} ${todo.completed ? 'completed bg-light' : ''} ${todo.subtasks.length ? 'has-subtasks' : ''}">
                <div class="d-flex align-items-center">
                    <div class="form-check">
                        <input type="checkbox" 
                               class="form-check-input todo-checkbox" 
                               ${todo.completed ? 'checked' : ''}
                               data-id="${todo.id}">
                        <span class="todo-text ms-2">${todo.text}</span>
                        <span class="priority-badge">${priorityText[todo.priority]}</span>
                        ${dueDateHtml}
                    </div>
                    <div class="ms-auto">
                        <button class="btn btn-sm btn-outline-primary add-subtask-btn me-1" data-id="${todo.id}">
                            <i class="bi bi-list-nested"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${todo.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                ${todo.subtasks.length ? '<div class="subtasks-container"></div>' : ''}
            </li>
        `);
    }

    isExpired(date) {
        return new Date(date) < new Date().setHours(0, 0, 0, 0);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
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