import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProdutManagementService } from '../produt-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.scss']
})
export class WarehouseManagerComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'pname', 'wname', 'qty_req' , 'req_status'];
  dataSource = [];

  newRequestForm!: FormGroup;
  wareHouseList:any = [];
  supplierList:any = [];
  productsList:any = [];
  
  constructor(private dialog: MatDialog,private fb: FormBuilder,private service: ProdutManagementService,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.wareHouseList = this.service.getWareHouses();
    this.supplierList = this.service.getSuppliers();

    this.fetchProducts();
    this.fetchWarehouseRequests();
  }

  createNewRequest(template:any){
    let dialogRef = this.dialog.open(template,{
      width: '500px'
    });
    this.newRequestForm = this.fb.group({
      req_desc: [''],
      qty_req: ['' , [Validators.required]],
      pname: ['', [Validators.required]],
      supname: ['', [Validators.required]],
      wname: ['Walmart', [Validators.required]]
    })
  }

  fetchProducts(){
    this.service.fetchProducts().subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
          this.productsList = [];
          data['data'].forEach((x:any) => {
            this.productsList.push(x.pname)
          });
        }
        else{
          console.error("FAILED TO FETCH PRODUCTS");
        }
      },
      error : (e) => {
        console.error("FAILED TO FETCH PRODUCTS");
      },
      complete: () => {

      }
    })
  }

  submiteNewRequest(){
    this.service.submitWareHouseRequest(this.newRequestForm.getRawValue()).subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
          this.ngOnInit();
          this.dialog.closeAll();
        }
        else{
          console.error(data)
          this.snackbar.open("Failed to create request")
        }
      },
      error: (e) => {
        console.error(e)
        this.snackbar.open("Failed to create request")
      },
      complete: () => {}
    })
  }

  fetchWarehouseRequests(){
    this.service.fetchWarehouseRequests('Walmart').subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
          this.dataSource = data['data']
        }
        else{
          this.snackbar.open("Failed to fetch request")
        }
      },
      error: (e) => {
        console.error(e);
        this.snackbar.open("Failed to fetch request")
      },
      complete: () => {

      }
    })
  }

}
