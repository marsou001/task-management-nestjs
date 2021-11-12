import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        
        if (!task) throw new NotFoundException();
        
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const task: Task = {
    //         id: uuidv4(),
    //         ...createTaskDto,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks.push(task);
    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const taskToUpdate = this.getTaskById(id);

    //     taskToUpdate.status = status;
    //     return taskToUpdate;
    // }

    // deleteTask(id: string): Task {
    //     const taskToDelete = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    //     return taskToDelete;
    // }
}
