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

    createTask(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            id: uuidv4(),
            ...createTaskDto,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }
}
