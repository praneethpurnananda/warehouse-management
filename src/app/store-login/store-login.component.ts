import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.scss' , '../main-login/main-login.component.scss']
})
export class StoreLoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private snackbar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  userLogin() {
    if(this.loginForm.value.email === 'amazon.store@gmail.com' && this.loginForm.value.password === 'Amazon@123'){
      localStorage.setItem('current_user' , 'store')
      this.router.navigate(['manage/store']);
    }
    else{
      this.snackbar.open('Invalid Credentials')
    }
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  routerNavigate(url: string) {}

}
