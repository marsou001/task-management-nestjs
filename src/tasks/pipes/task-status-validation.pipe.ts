import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatues = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) throw new BadRequestException("Invalid status!");

        return value;
    }

    private isStatusValid(status: any): boolean {
        return this.allowedStatues.includes(status);
    }
} 