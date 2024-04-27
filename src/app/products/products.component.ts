import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{


  keyword: string = "";
  products: any;
  errors: any;
  page: number = 1;
  pageSize: number = 10
  totalPages: number = 3
  currentPage: number = 1

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  searchProducts(keyword: string) {
    this.currentPage = 1;
    this.totalPages = 0;
    this.productService.searchByKeyword(keyword, this.currentPage, this.pageSize).subscribe(
      {
        next: (response) => this.products = response,
        error: (error) => console.log(error)

      }
    );
  }


  handleCheckProduct(product: Product) {
    this.productService.changeStatus(product).subscribe({
      next: (response) => {
        product.checked = !product.checked
      }
    });
  }

  handleDelete(product: any) {

    this.productService.deleteProduct(product).subscribe({
      next: (response) => {
        this.products.splice(product.id, 1)
      }
    });
  }
  getProducts(){
    this.productService.getProducts(this.page, this.pageSize).subscribe({
      next: (responseData) => {
        console.log(responseData)
        this.products= responseData.body as Product[]
        let totalProducts: number =parseInt(responseData.headers.get("x-total-count")!)
        this.totalPages =Math.floor( totalProducts/this.pageSize)
        console.log(this.totalPages)
        if (totalProducts % this.pageSize != 0){
          this.totalPages = this.totalPages + 1
        }
      }
    });
  }

  paginate(page: number) {
    this.currentPage = page
    this.getProducts();

  }

  handleEdit(product: any) {

    this.router.navigateByUrl("/products/edit/"+ product.id)
  }
}
