import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateFamilyMemberDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: { value: string | number | undefined }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  firstParentId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: { value: string | number | undefined }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  secondParentId: number;
}
