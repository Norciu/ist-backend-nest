import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertStreetDto {
  @IsNotEmpty()
  @IsNumber()
    cityId: number;

  @IsNotEmpty()
  @IsString()
    streetName: string;

  @IsNotEmpty()
  @IsString()
    ulic: string;
}
