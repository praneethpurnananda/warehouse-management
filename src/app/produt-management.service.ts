import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProdutManagementService {

  wareHouseDetails:any = [
    'Walmart'
  ];

  supplierDetails:any = [
    'sup1'
  ]

  letFakeProductsList:any = [
    {
      pname: 'Dell Inspiron',
      doexpiry: '07/05/2023',
      baseprice: 550,
      category: 'electronics',
      supname: 'Dell',
      qty: 158
    }
  ]

  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getWareHouses(){
    return this.wareHouseDetails;
  }

  getSuppliers(){
    return this.supplierDetails;
  }

  getProductsList(){
    return this.letFakeProductsList;
  }

  fetchProducts(){
    return this.http.get(`${this.url}/portal/viewProducts`);
  }

  submitStoreRequest(body:any){
    return this.http.post(`${this.url}/portal/addStoreRequest`,body);
  }

  fetchStoreRequests(storeName:string){
    return this.http.get(`${this.url}/portal/fetchStoreRequests?sname=${storeName}`)
  }

  fetchStoreRequestsForWareHouse(wname:string){
    return this.http.get(`${this.url}/portal/fetchStoreRequests?wname=${wname}`)
  }

  approveReqWarehouse(details:any){
    return this.http.post(`${this.url}/portal/acceptStoreRequest`, details);
  }

  declineReqWarehouse(details:any){
    return this.http.post(`${this.url}/portal/rejectStoreRequest`, details);
  }

  submitWareHouseRequest(details:any){
    return this.http.post(`${this.url}/portal/addSuppliesRequest`, details);
  }

  fetchWarehouseRequests(wname:string){
    return this.http.get(`${this.url}/portal/fetchSuppliesRequests?wname=${wname}`);
  }

  fetchSupplierRequests(sname:string){
    return this.http.get(`${this.url}/portal/fetchSuppliesRequests?sname=${sname}`);
  }

  approveReqSupplier(details:any){
    return this.http.post(`${this.url}/portal/acceptSuppliesRequest`, details);
  }

  declineReqSupplier(details:any){
    return this.http.post(`${this.url}/portal/rejectSuppliesRequest`, details);
  }

}
