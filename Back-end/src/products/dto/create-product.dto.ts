import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    caculationUnit: string;

    @IsNotEmpty()
    amount: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    totalPrice: string;
}