import { Component, OnInit } from '@angular/core';
import { ProdutManagementService } from '../produt-management.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse-products',
  templateUrl: './warehouse-products.component.html',
  styleUrls: ['./warehouse-products.component.scss']
})
export class WarehouseProductsComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'pname', 'baseprice', 'doexpiry' , 'category' , 'qty', 'supname'];
  dataSource = [];

  constructor(private service: ProdutManagementService,private fb: FormBuilder,private dialog: MatDialog,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(){
    this.service.fetchProducts().subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
            this.dataSource = data['data']
        }
        else{
          console.error("Failed to fetch products");
          this.snackbar.open("Failed to fetch products")
        }
      },
      error : (e) => {
        console.error("Failed to fetch products");
        this.snackbar.open("Failed to fetch products")
      },
      complete: () => {

      }
    })
  }

}
