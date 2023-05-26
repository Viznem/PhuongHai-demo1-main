import { Injectable, NotFoundException } from '@nestjs/common';


import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';


@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(Task)
       private tasksRepository: Repository<Task>,
    ){}

    // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         )
    //     }

    //     return tasks;
    // }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.tasksRepository.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status } );
        }

        if (search) {
            query.andWhere('(task.description LIKE :search OR task.title LIKE :search)', {search: `${search}`});
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({id: id});

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found!`)
        }

        return found;
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;

    //     const task: Task = {
    //         id: uuid.v1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    async createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN

        await this.tasksRepository.save(task);
        
        return task;
    }

    async deleteTask(id: number): Promise<void> {
       const result = await this.tasksRepository.delete(id);
      
       if(result.affected === 0) {
        throw new  NotFoundException(`Task with ID "${id}" not found!`);
       }
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
