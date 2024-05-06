import { Routes } from '@angular/router';
import {NewProductComponent} from "./new-product/new-product.component";
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/AuthGuard";

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminTemplateComponent,canActivate:[AuthGuard], children: [
      {path: "products", component: ProductsComponent},
      {path: "home", component: HomeComponent},
      {path: "products/new", component: NewProductComponent},
      {path: "products/edit/:id", component: EditProductComponent}]},
  {path: "", redirectTo: "login", pathMatch:"full"}
];
