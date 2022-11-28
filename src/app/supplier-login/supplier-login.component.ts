import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-login',
  templateUrl: './supplier-login.component.html',
  styleUrls: ['./supplier-login.component.scss' , '../main-login/main-login.component.scss']
})
export class SupplierLoginComponent implements OnInit {

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
    if(this.loginForm.value.email === 'supplier.store@gmail.com' && this.loginForm.value.password === 'Supplier@123'){
      localStorage.setItem('current_user' , 'supplier')
      this.router.navigate(['manage/supplier']);
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
