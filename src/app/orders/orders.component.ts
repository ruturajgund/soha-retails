import { Component, OnInit } from '@angular/core';
import { OrdersServices } from '../services/index'
import { Order } from '../models/index'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(
    private ordersServices: OrdersServices
  ) { }

  ngOnInit() {
    this.ordersServices.getAllOrders().subscribe(
      response => {
        var data = response.json();
        this.orders = data.orders;
        console.log(this.orders);
      })
  }
}
