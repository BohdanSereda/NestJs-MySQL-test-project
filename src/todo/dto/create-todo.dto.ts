import {IsString, IsBoolean, IsNumber} from  'class-validator'

export class CreateTodoDto {
    @IsString()
    readonly title: string;

    @IsBoolean()
    readonly isCompleted: boolean;
}
