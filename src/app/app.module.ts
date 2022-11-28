import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

//angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

//components
import { AppComponent } from './app.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { WarehouseManagerComponent } from './warehouse-manager/warehouse-manager.component';
import { StoreLoginComponent } from './store-login/store-login.component';
import { SupplierLoginComponent } from './supplier-login/supplier-login.component';
import { StoreManagerComponent } from './store-manager/store-manager.component';
import { SupplierManagerComponent } from './supplier-manager/supplier-manager.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { WarehouseProductsComponent } from './warehouse-products/warehouse-products.component';
import { WarehouseRequestsComponent } from './warehouse-requests/warehouse-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLoginComponent,
    WarehouseManagerComponent,
    StoreLoginComponent,
    SupplierLoginComponent,
    StoreManagerComponent,
    SupplierManagerComponent,
    MainLayoutComponent,
    WarehouseProductsComponent,
    WarehouseRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatDialogModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
