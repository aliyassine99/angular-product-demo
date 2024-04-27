import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri: string ="http://localhost:3000/products"

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number ){
   return this.http.get("http://localhost:3000/products?_page="+page+"&_limit="+size, {observe: "response"});
  }

  changeStatus(product: Product): Observable<Product>{
    return this.http.patch<Product>("http://localhost:3000/products/"+ product.id,{checked: !product.checked});
  }
  deleteProduct(product: Product): Observable<any>{
    return this.http.delete("http://localhost:3000/products" + product.id);
  }

  saveProduct(product: Product): Observable<Product>{
    return this.http.post<Product>("http://localhost:3000/products", product);
  }

  searchByKeyword(keyword: string, page: number, size: number): Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:3000/products?_page="+page+"&_limit="+size);
  }
  getProduct(idProduct: number): Observable<Product>{
    return this.http.get<Product>("http://localhost:3000/products/"+ idProduct);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>("http://localhost:3000/products/"+ product.id, product);
  }
}
