import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProdutManagementService } from '../produt-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.scss']
})
export class StoreManagerComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'pname', 'wname', 'qty_req' , 'req_status'];
  dataSource = [];

  newRequestForm!: FormGroup;
  wareHouseList:any = [];
  productsList:any = [];
  
  constructor(private dialog: MatDialog,private fb: FormBuilder,private service: ProdutManagementService,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.wareHouseList = this.service.getWareHouses();
    this.fetchProducts();
    this.fetchRequests();
  }

  createNewRequest(template:any){
    let dialogRef = this.dialog.open(template,{
      width: '500px'
    });
    this.newRequestForm = this.fb.group({
      req_desc: [''],
      qty_req: ['' , [Validators.required]],
      req_status: ['in progress' , [Validators.required]],
      pname: ['', [Validators.required]],
      sname: ['amazon', [Validators.required]],
      wname: ['', [Validators.required]]
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
    this.service.submitStoreRequest(this.newRequestForm.getRawValue()).subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
          this.fetchRequests();
          this.snackbar.open("request created successfully")
          this.dialog.closeAll()
        }
        else{
          console.error('FAILED TO CREATE REQUEST')
          this.snackbar.open("FAILED TO CREATE REQUEST")
        }
      },
      error: (e) => {
        console.error('FAILED TO CREATE REQUEST');
        this.snackbar.open("FAILED TO CREATE REQUEST")
      },
      complete: () => {

      }
    })
  }

  fetchRequests(){
    this.service.fetchStoreRequests('amazon').subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
          this.dataSource = data['data'];
          
        }
        else{
          this.snackbar.open("Failed to Fetched Requests")
        }
      },
      error: (e) => {
        this.snackbar.open("Failed to Fetched Requests")
      },
      complete: () => {

      }
    })
  }

}
