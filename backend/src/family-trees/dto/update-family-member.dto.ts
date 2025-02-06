import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class UpdateFamilyMemberDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;
}
