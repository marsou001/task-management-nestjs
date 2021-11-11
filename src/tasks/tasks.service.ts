import { Injectable, NotFoundException } from '@nestjs/common';
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
        const task =  this.tasks.find(task => task.id === id);

        if (!task) throw new NotFoundException();

        return task;
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

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const taskToUpdate = this.getTaskById(id);

        taskToUpdate.status = status;
        return taskToUpdate;
    }

    deleteTask(id: string): Task {
        const taskToDelete = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
        return taskToDelete;
    }
}
