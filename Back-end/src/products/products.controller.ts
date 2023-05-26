import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterProductDto: GetProductsFilterDto): Promise<Product[]> {
        return this.productsService.getProducts(filterProductDto);
    }

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Post()
    createTask(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): void {
        this.productsService.deleteProduct(id);
    }

    @Patch('/:id/update')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() ProductDto: CreateProductDto,
    ): Promise<Product> {

        return this.productsService.updateProduct(id, ProductDto);
    }
}
