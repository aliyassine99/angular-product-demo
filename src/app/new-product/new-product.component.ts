import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  productForm!: FormGroup;
  product!: Product;
  ngOnInit(): void {
      this.productForm = this.fb.group(
        {
          name: this.fb.control(""),
          price: this.fb.control(""),
          checked: this.fb.control(false),
        }
      );
  }

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) {
  }

  saveProduct() {
    this.product = this.productForm.value;
    this.productService.saveProduct(this.product).subscribe({
      next: (data) =>{
        this.router.navigate(["/"]);
      }
    });

  }
}
