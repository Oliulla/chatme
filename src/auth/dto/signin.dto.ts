import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'Oli' })
  @IsNotEmpty()
  username: string;
}
