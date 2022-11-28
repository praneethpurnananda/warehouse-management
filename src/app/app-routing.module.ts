import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { MainLoginComponent } from './main-login/main-login.component';
import { StoreLoginComponent } from './store-login/store-login.component';
import { SupplierLoginComponent } from './supplier-login/supplier-login.component';

import { WarehouseManagerComponent } from './warehouse-manager/warehouse-manager.component';
import { WarehouseProductsComponent } from './warehouse-products/warehouse-products.component';
import { WarehouseRequestsComponent } from './warehouse-requests/warehouse-requests.component';

import { StoreManagerComponent } from './store-manager/store-manager.component';
import { SupplierManagerComponent } from './supplier-manager/supplier-manager.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {path: '' , redirectTo: '/login-warehouse' , pathMatch: 'full'},
  {path: 'login-warehouse' , component: MainLoginComponent},
  {path: 'login-store' , component: StoreLoginComponent},
  {path: 'login-supplier' , component: SupplierLoginComponent},

  {
    path: 'manage',
    component: MainLayoutComponent,
    children: [
      {path: 'warehouse' , component: WarehouseManagerComponent},
      {path: 'warehouse-products' , component: WarehouseProductsComponent},
      {path: 'warehouse-requests' , component: WarehouseRequestsComponent},
      
      {path: 'store' ,  component: StoreManagerComponent},
      {path: 'supplier' , component: SupplierManagerComponent}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
