import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('id', id);
        return this.todoService.findOne(id);
        
    }

    @Get()
    findAll(): Todo[] {
        return this.todoService.findAll();
    }

    @Post()
    createTodo(@Body() newTodo: CreateTodoDto) {
        console.log('newTodo', newTodo);
        
        this.todoService.create(newTodo);
    }

    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todoService.delete(id);
    }
}
