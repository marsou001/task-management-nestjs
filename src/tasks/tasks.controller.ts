import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Patch(':id/status')
    // updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }

    // @Delete(':id')
    // deleteTask(@Param('id') id: string): Task {
    //     return this.tasksService.deleteTask(id);
    // }
}
