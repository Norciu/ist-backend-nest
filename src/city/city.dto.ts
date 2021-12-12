import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';

export class AddCityDto {
  @IsNotEmpty()
  @IsString()
    city_name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\d{2}-\d{3}/)
    postal_code: string;

  @IsNotEmpty()
  @IsString()
  @Length(7)
    simc: string;
}
