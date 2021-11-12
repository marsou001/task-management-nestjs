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
        
        if (!task) throw new NotFoundException("Task not found!");
        
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const taskToUpdate = this.getTaskById(id);

    //     taskToUpdate.status = status;
    //     return taskToUpdate;
    // }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
        
        if (result.affected === 0) throw new NotFoundException("Task not found!");
    }
}
