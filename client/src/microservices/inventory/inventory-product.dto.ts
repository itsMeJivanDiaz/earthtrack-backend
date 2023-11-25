import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({ readOnly: true })
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(10, { message: 'description must include atleast 10 characters' })
  @IsNotEmpty({ message: 'description must not be empty' })
  description: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'category must include atleast 3 characters' })
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'price must not be empty' })
  price: number;
}

export class DeleteProductResponseDTO {
  @ApiProperty({ type: [Object] })
  raw: [];

  @ApiProperty()
  @IsNumber()
  affected: number;
}

export class SearchProductResponseDTO {
  @ApiProperty({ type: [ProductDTO] })
  data: ProductDTO[];

  @ApiProperty()
  @IsNumber()
  total: number;
}
