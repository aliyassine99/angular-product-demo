import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly url: string = "http://localhost:3000/users"
  constructor(private httpClient: HttpClient, private appState: AppStateService) { }

  async login(username: string, password: string){
    let user:any = this.httpClient.get<any>(this.url+"");
    if (password == atob(user.password)){
      let decodeJwt: any = jwtDecode(user.token);
      this.appState.setAuthState({
        username: decodeJwt.sub,
        isAuthenticated: true,
        password: user.password,
        roles: decodeJwt.roles,
        token: user.token
      });
      return Promise.resolve(true)
    }
    else {
      return Promise.reject();
    }
  }
}
