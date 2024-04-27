import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

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
