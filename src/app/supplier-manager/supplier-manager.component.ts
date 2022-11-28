import { Component, OnInit } from '@angular/core';
import { ProdutManagementService } from '../produt-management.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-manager',
  templateUrl: './supplier-manager.component.html',
  styleUrls: ['./supplier-manager.component.scss']
})
export class SupplierManagerComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'pname', 'wname', 'qty_req' , 'req_status'];
  dataSource = [];
  productsData:any = [];
  Reqdetails:any = {};
  
  constructor(private service: ProdutManagementService,private fb: FormBuilder,private dialog: MatDialog,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  manageTrade(modalType:any,data:any){
    this.Reqdetails = data;
    this.dialog.open(modalType,{
      width: '600px'
    })
  }

  fetchRequests(){
    this.service.fetchSupplierRequests('sup1').subscribe({
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


  declineReq(details:any){
    let finalDetails = {
      supid: details.id,
      sp_comments: details.sp_comments
    };
    this.service.declineReqSupplier(finalDetails).subscribe({
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

  approveReq(details:any){
  
    let finalDetails:any = {
      supid: details.id,
      sp_comments: details.sp_comments,
      pname: details.pname,
      qty: details.qty_req
    };

    
    this.service.approveReqSupplier(finalDetails).subscribe({
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
