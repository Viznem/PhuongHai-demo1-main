import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    caculationUnit: string;

    @Column()
    amount: string;

    @Column()
    price: string;

    @Column()
    totalPrice: string;
}