import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto } from './createproduct.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  #products = [
    {
      name: 'Bucket',
      price: 3500,
    },
    {
      name: 'REST API for dummies',
      price: 7850,
    },
    {
      name: 'Tablet',
      price: 45000,
    }
  ];

  @Get('products')
  listProducts() {
    return this.#products;
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    const idNum = Number(id);
    if (idNum >= this.#products.length || idNum < 0) {
      throw new NotFoundException("No product with this ID")
    }
    return this.#products[Number(id)];
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    const idNum = Number(id);
    if (idNum >= this.#products.length || idNum < 0) {
      throw new NotFoundException("No product with this ID")
    }
    this.#products.splice(idNum, 1);
  }

  @Post('products')
  newProduct(@Body() createProductDto: CreateProductDto) {
    this.#products.push(createProductDto);
  }
}
