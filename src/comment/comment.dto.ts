import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCommentDto {

  @IsNumber()
  @IsNotEmpty()
    location_id: number;

  @IsString()
  @IsNotEmpty()
    description: string;
}
