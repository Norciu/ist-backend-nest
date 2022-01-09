import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertLocationDto {

  @IsOptional()
  @IsNotEmptyObject()
  clientInfo?: { [p: string]: unknown };

  @IsNumber()
  @IsNotEmpty()
  city_id: number;

  @IsNumber()
  @IsNotEmpty()
  street_id: number;

  @IsString()
  @IsOptional()
  flatNo: string;

  @IsString()
  @IsOptional()
  homeNo: string;

  @IsString()
  @IsOptional()
  plotNo: string;

  @IsNumber()
  @IsNotEmpty()
  technology_id: number;
}
