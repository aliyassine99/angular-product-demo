import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

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
    {title : "Home", route: "/admin/home", icon: "house"},
    {title : "Products", route: "/admin/products", icon: "house"},
    {title : "New Product", route: "/admin/products/new", icon: "house"}
  ];
  currentAction: any;

  constructor(public appState: AppStateService, private router: Router) {
  }
  setCurrentAction(action: any) {
    this.currentAction = action;

  }

  logout() {
    this.appState.authState={};
    this.router.navigateByUrl("/login");
  }

  login() {
    this.router.navigateByUrl("/login");
  }
}
