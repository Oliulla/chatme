import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'Oli' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'MS' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ example: '66f7c600f0e87949c13c02ae' })
  @IsOptional()
  @IsMongoId()
  supervisor: string;

  @ApiProperty({ example: ['66f7c600f0e87949c13c02ae'] })
  @IsOptional()
  @IsMongoId()
  @IsArray()
  subordinates: string[];
}
