import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            id: uuidv4(),
            ...createTaskDto,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): Task {
        const taskToDelete = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
        return taskToDelete;
    }
}
