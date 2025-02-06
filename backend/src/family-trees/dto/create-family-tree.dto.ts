import { IsString, Length } from 'class-validator';

export class CreateFamilyTreeDto {
  @IsString()
  @Length(5, 50)
  name: string;
}
