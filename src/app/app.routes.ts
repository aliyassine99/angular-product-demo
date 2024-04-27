import { Routes } from '@angular/router';
import {NewProductComponent} from "./new-product/new-product.component";
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

export const routes: Routes = [
  {path: "", component: ProductsComponent},
  {path: "products/new", component: NewProductComponent},
  {path: "products", component: ProductsComponent},
  {path: "home", component: HomeComponent},
  {path: "products/edit/:id", component: EditProductComponent}
];
