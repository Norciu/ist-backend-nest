import { IsNotEmpty } from 'class-validator';

export class InsertTechnologyDto {

  @IsNotEmpty()
    technologyName: string;
}
