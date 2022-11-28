import { Component, OnInit } from '@angular/core';
import { ProdutManagementService } from '../produt-management.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse-requests',
  templateUrl: './warehouse-requests.component.html',
  styleUrls: ['./warehouse-requests.component.scss']
})
export class WarehouseRequestsComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'pname', 'wname', 'qty_req' , 'req_status'];
  dataSource = [];
  productsData:any = [];
  Reqdetails:any = {};
  
  constructor(private service: ProdutManagementService,private fb: FormBuilder,private dialog: MatDialog,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRequests();
    this.fetchProducts();
  }

  manageTrade(modalType:any,data:any){
    this.Reqdetails = data;
    this.dialog.open(modalType,{
      width: '600px'
    })
  }

  fetchRequests(){
    this.service.fetchStoreRequestsForWareHouse('walmart').subscribe({
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

  fetchProducts(){
    this.service.fetchProducts().subscribe({
      next:
      (data:any) => {
        if('status' in data && data['status']){
            this.productsData = data['data']
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

  declineReq(details:any){
    if(this.productsData.length > 0){
      let finalDetails = {
        sid: details.id,
        comments: details.wh_comments
      };
      this.service.declineReqWarehouse(finalDetails).subscribe({
        next:
        (data:any) => {
          if('status' in data && data['status']){
            this.ngOnInit();
            this.dialog.closeAll();
          }
          else{
            this.snackbar.open("Failed to decline")
          }
        },
        error: (e) => {
          this.snackbar.open("Failed to decline")
        },
        complete: () => {

        }
      })
    }
    else{
      this.snackbar.open("Failed to decline")
    }
  }

  approveReq(details:any){
    if(this.productsData.length > 0){
      let finalDetails:any = {};
      this.productsData.forEach((product:any) => {
        if(product.pname === details.pname){
          finalDetails['pid'] = product.id;
          finalDetails['sid'] = details.id;
          finalDetails['p_qty'] = product.qty;
          finalDetails['s_qty'] = details.qty_req
        }
      });

      if(finalDetails['p_qty'] < finalDetails['s_qty']){
        this.snackbar.open("Cant trade items requested more that avaliable stock")
      }
      else{
        this.service.approveReqWarehouse(finalDetails).subscribe({
          next:
          (data:any) => {
            if('status' in data && data['status']){
              this.ngOnInit();
              this.dialog.closeAll();
            }
            else{
              this.snackbar.open("Failed to approve")
            }
          },
          error: (e) => {
            this.snackbar.open("Failed to approve")
          },
          complete: () => {

          }
        })
      }
    }
    else{
      this.snackbar.open("Failed to approve")
    }
  }


}
