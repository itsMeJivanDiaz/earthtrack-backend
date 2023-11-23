import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class ProductDTO {
  id: string;

  @IsString()
  @MinLength(2, { message: 'name must include atleast 2 characters' })
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @IsString()
  @MinLength(10, { message: 'description must include atleast 10 characters' })
  @IsNotEmpty({ message: 'description must not be empty' })
  description: string;

  @IsString()
  @MinLength(3, { message: 'category must include atleast 3 characters' })
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty({ message: 'price must not be empty' })
  price: number;
}
