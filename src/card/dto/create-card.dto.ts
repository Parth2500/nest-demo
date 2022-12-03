import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @Length(16)
  @IsNotEmpty()
  readonly number: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly color: string;
}
