import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) { }

  formateQuery(userId: number, completed: string) {
    if (completed === undefined) {
      return { where: { userId } }
    }
    const isCompleted = completed === 'true'
    return { where: { userId, isCompleted } }
  }

  create(createTodoDto: CreateTodoDto, user_id: number) {
    const todo = this.todoRepository.create(createTodoDto);
    todo.userId = user_id
    return this.todoRepository.save(todo)
  }

  findAll(userId: number, completed: string) {
    return this.todoRepository.find(this.formateQuery(userId, completed));
  }

  async findOne(id: number, userId: number) {
    const todo = await this.todoRepository.findOne({ where: { id, userId } })

    if (!todo) {
      throw new NotFoundException(`Todo not found`)
    }
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, userId: number) {
    const queryData = await this.todoRepository.update({ id, userId }, updateTodoDto)
    if (!queryData.affected) {
      throw new NotFoundException(`Todo not found`)
    }
    const todo = await this.findOne(id, userId)
    return todo
  }

  async remove(id: number, userId: number) {
    const todo = await this.findOne(id, userId)
    return this.todoRepository.remove(todo)
  }

  async changeStatus(id: number, userId: number, completed: string) {
    const todo = await this.findOne(id, userId)
    if (completed === undefined || completed === "false") {
      todo.isCompleted = !todo.isCompleted
    } else {
      todo.isCompleted = true
    }
    return this.todoRepository.save(todo)
  }
}
