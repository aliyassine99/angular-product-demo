import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState:any = {
    keyword: "",
    products: [],
    errors: "",
    page: 1,
    pageSize: 10,
    totalPages: 3,
    currentPage: 1,
    status: "",
    errorMessage: ""
  }

  public authState: any = {
    username: undefined,
    roles: undefined,
    isAuthenticated: true,
    token: undefined
  }
  constructor() { }

  public setProductState(state: any){
    this.productState = {...this.productState, ...state}
  }

  public setAuthState(state: any){
    this.authState = {...this.authState, ...state}
  }

}
