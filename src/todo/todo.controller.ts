import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Headers('userId') userId: string) {
    return this.todoService.create(createTodoDto, +userId);
  }

  @Get()
  findAll(@Headers('userId') userId: string) {
    return this.todoService.findAll(+userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('userId') userId: string
  ) {
    return this.todoService.findOne(+id, +userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Headers('userId') userId: string
  ) {
    return this.todoService.update(+id, updateTodoDto, +userId);
  }

  @Patch(':id')
  changeStatus(
    @Param('id') id: string,
    @Headers('userId') userId: string
  ) {
    return this.todoService.changeStatus(+id, +userId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('userId') userId: string
  ) {
    return this.todoService.remove(+id, +userId);
  }
}
