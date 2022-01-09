import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';

export class AddCityDto {
  @IsNotEmpty()
  @IsString()
    cityName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\d{2}-\d{3}/)
    postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(7)
    simc: string;
}
