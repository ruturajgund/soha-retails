import { Component, OnInit } from '@angular/core';
import { OrdersServices, PaginationService, SearchService } from '../services/index'
import { Order } from '../models/index';
import * as _ from 'underscore';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder = new Order();
  spinnerFlag: boolean = false;
  paginationFlag: boolean = true;
  pager: any = {};
  pagedItems: Order[];
  searchModel: any = {};
  datePickerFlag: boolean = true;

    constructor(
    private ordersServices: OrdersServices,
    private paginationService: PaginationService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.spinnerFlag = true;
    this.ordersServices.getAllOrders().subscribe(
      response => {
        var data = response.json();
        this.orders = data.orders;
        this.spinnerFlag = false;
        this.setPage(1);
      });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginationService.getPager(this.orders.length, page);

    // get current page of items
    this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getOrderDetailsById(orderId) {
    this.selectedOrder = _.findWhere(this.orders, { amazonOrderId: orderId });;
  }

  search(){
    this.spinnerFlag = true;
    this.orders = [];
    this.searchService.search(this.searchModel).subscribe(
      response => {
        var data = response.json();
        this.orders = data.orders;
        this.spinnerFlag = false;
        this.setPage(1);
      });
    
  }

  checkVisibility(flag){
    if(flag == "particularDate"){
      this.searchModel.startDate="";
      this.searchModel.endDate="";
      this.datePickerFlag = true;
    }
    else{
      this.searchModel.particularDate = "";
      this.datePickerFlag = false;
    }
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }
}
