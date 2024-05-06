import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

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




  constructor(private productService: ProductService,
              private router: Router,
              public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.getProducts()

  }

  searchProducts(keyword: string) {

    this.appState.setProductState({
      status: "LOADING"
    })
    this.productService.searchByKeyword(keyword, this.appState.productState.currentPage, this.appState.productState.totalPages).subscribe(
      {
        next: (response) => {
          this.appState.productState.products = response
          this.appState.setProductState({
            status: "LOADED"
          })
        },
        error: (error) => {

        }

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
        this.appState.productState.products.splice(product.id, 1)
      }
    });
  }
  getProducts(){
    this.productService.getProducts(this.appState.productState.page, this.appState.productState.pageSize).subscribe({
      next: (responseData) => {
        console.log(responseData)
        this.appState.productState.products = responseData.body as Product[]
        let totalProducts: number =parseInt(responseData.headers.get("x-total-count")!)
        this.appState.productState.totalPages =Math.floor( totalProducts/this.appState.productState.pageSize)

        if (totalProducts % this.appState.productState.pageSize != 0){
          this.appState.productState.totalPages = this.appState.productState.totalPages + 1
        }
      }
    });
  }

  paginate(page: number) {
    this.appState.productState.currentPage = page
    this.getProducts();

  }

  handleEdit(product: any) {

    this.router.navigateByUrl("admin/products/edit/"+ product.id)
  }
}
