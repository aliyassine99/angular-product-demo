import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {ProductsComponent} from "./products/products.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent, NgForOf, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions: Array<any> = [
    {title : "Home", route: "/home", icon: "house"},
    {title : "Products", route: "/products", icon: "house"},
    {title : "New Product", route: "/products/new", icon: "house"}
  ];
  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;

  }
}
