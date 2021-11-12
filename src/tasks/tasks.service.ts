import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
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

    // getTaskById(id: string): Task {
    //     const task =  this.tasks.find(task => task.id === id);

    //     if (!task) throw new NotFoundException();

    //     return task;
    // }

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
