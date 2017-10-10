import { Component, OnInit } from '@angular/core';
import { OrdersServices, PaginationService } from '../services/index'
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
  search: string;

  constructor(
    private ordersServices: OrdersServices,
    private paginationService: PaginationService
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

  searchByProduct(search) {
    if(search.length != 0){
      this.pagedItems = [];
      this.paginationFlag = false;
      this.orders.forEach(order => {
        if (order.productName.match(search)) {
          this.pagedItems.push(order);
        }
      });
    }
    else{
      this.paginationFlag = true;
      this.pagedItems = [];
      this.setPage(1);
    }
    
    
  }
}
