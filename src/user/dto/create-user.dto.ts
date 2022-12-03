import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @Length(16)
  @IsNotEmpty()
  readonly cardNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly cardType: string;
}
