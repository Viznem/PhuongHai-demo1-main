import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
     ){}

    async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
        const { search } = filterDto;

        const query = this.productsRepository.createQueryBuilder('product');

        if (search) {
            query.andWhere('(product.name LIKE :search OR product.price LIKE :search)', {search: `${search}`});
        }

        const products = await query.getMany();
        return products;
    }

    async getProductById(id: number): Promise<Product> {
        const found = await this.productsRepository.findOneBy({id: id});

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found!`)
        }

        return found;
    }

    async createProduct(createProductDto: CreateProductDto) {
        const { name, caculationUnit, amount, price, totalPrice } = createProductDto;

        const product = new Product();
        product.name = name;
        product.caculationUnit = caculationUnit;
        product.amount = amount;
        product.price = price;
        product.totalPrice = totalPrice;
        
        await this.productsRepository.save(product);
        
        return product;
    }

    async deleteProduct(id: number): Promise<void> {
        const result = await this.productsRepository.delete(id);
       
        if(result.affected === 0) {
         throw new  NotFoundException(`Task with ID "${id}" not found!`);
        }
     }

     async updateProduct(id: number, productDto: CreateProductDto): Promise<Product> {
        const { name, caculationUnit, amount, price, totalPrice } = productDto;

        const product = await this.getProductById(id);
        product.name = name;
        product.caculationUnit = caculationUnit;
        product.amount = amount;
        product.price = price;
        product.totalPrice = totalPrice;

        await this.productsRepository.save(product);
        return product;
    }
}
