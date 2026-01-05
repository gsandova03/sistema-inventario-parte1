import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LowStockQueryDto {
  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Type(() => Number) // <--- Esta línea convierte el string a número
  @IsInt()
  @Min(0)
  threshold?: number = 10;
}