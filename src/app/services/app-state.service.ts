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
  constructor() { }

  public setProductState(state: any){
    this.productState = {...this.productState, ...state}
  }
}
