import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {


  currentUser:any = '';
  menuOptions:any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('current_user') ? localStorage.getItem('current_user') : '';

    if(this.currentUser === 'warehouse'){
      this.menuOptions = [];
      let obj1 = {
        icon: 'query_stats',
        title: 'View All Products',
        link: '/manage/warehouse-products'
      }
      let obj2 = {
        icon: 'query_stats',
        title: 'View Trade Requests',
        link: '/manage/warehouse-requests'
      }
      let obj3 = {
        icon: 'query_stats',
        title: 'My Trading',
        link: '/manage/warehouse'
      }
      this.menuOptions.push(obj1);
      this.menuOptions.push(obj2);
      this.menuOptions.push(obj3)
    }
    else if(this.currentUser === 'store'){
      this.menuOptions = [];
      let obj2 = {
        icon: 'query_stats',
        title: 'View Trade Requests',
        link: '/manage/store'
      }
      this.menuOptions.push(obj2)
    }
    else if(this.currentUser === 'supplier'){
      this.menuOptions = [];
      let obj2 = {
        icon: 'query_stats',
        title: 'View Trade Requests',
        link: '/manage/supplier'
      }
      this.menuOptions.push(obj2)
    }
  }

  navigate(url:string){
    this.router.navigate([`${url}`])
  }

  logout(){
    this.router.navigate(['/'])
  }

}
