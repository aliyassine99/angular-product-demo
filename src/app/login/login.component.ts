import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  errorMessage: any;
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private loginService: AuthenticationService,
              private appState: AppStateService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group(
      {
        username: this.fb.control( "", Validators.required),
        password: this.fb.control( "", Validators.required),
      }
    );
    }
  handleLogin() {
    console.log(this.formLogin.value)
    let username = this.formLogin.value.username
    let password = this.formLogin.value.password

    this.loginService.login(username, password).then(resp => {
    this.router.navigate(["/admin/products"]);
    })
      .catch(error => {
        this.errorMessage = error
      })

  }
}
