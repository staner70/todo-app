import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        {
            id: 1,
            title: 'Todo 1',
            description: 'Todo 1 description',
            done: false,
        },
        {
            id: 2,
            title: 'Todo 2',
            description: 'Todo 2 description',
            done: true,
        },        
        {
            id: 3,
            title: 'Todo 3',
            description: 'Todo 3 description',
            done: true,
        },
    ];

    findOne(id: string){
        return this.todos.find(todo => todo.id === Number(id));
    }

    findAll():Todo[] {
        return this.todos;
    }

    create(todo: CreateTodoDto) {

        this.todos = [...this.todos, todo];
    }

    update(id: string, todo: Todo) {
        const todoToUpdate = this.todos.find(t => t.id === +id);
        if (!todoToUpdate) {
            return new NotFoundException('booo did you find this todo');
        }
        if(todo.hasOwnProperty('done')){
            todoToUpdate.done = todo.done;
        }
        if(todo.title) {
            todoToUpdate.title = todo.title;
        }
        if(todo.description) {
            todoToUpdate.description = todo.description;
        }
        const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate);
        this.todos = [...updatedTodos];
        return { updatedTodo: 1, todo: todoToUpdate };
    }

    delete(id: string) {
        // const todoToDelete = this.todos.find(t => t.id === +id);
        // if (!todoToDelete) {
        //     return new NotFoundException('booo did you find this todo');
        // }
        // const updatedTodos = this.todos.filter(t => t.id !== +id);
        // this.todos = [...updatedTodos];
        // return { deletedTodo: 1, todo: todoToDelete };

        const nbOfTodosBeforeDelete = this.todos.length;
        this.todos = [...this.todos.filter(t => t.id !== +id)];
        if (this.todos.length < nbOfTodosBeforeDelete) {
            return { deletedTodos: 1, nbTodos: this.todos.length };
        } else {
            return { deletedTodos: 0, nbTodos: this.todos.length};
        }
    }


}
