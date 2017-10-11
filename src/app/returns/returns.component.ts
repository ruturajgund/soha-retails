import { Component, OnInit } from '@angular/core';
import { Return } from '../models/index'
import { ReturnsService, PaginationService } from '../services/index'
import * as _ from 'underscore';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {
 
  returns : Return[];
  spinnerFlag: boolean = false;
  paginationFlag: boolean = true;
  pager: any = {};
  pagedItems: Return[];
  search: string;
  selectedReturn = new Return();
  
  constructor(
    private returnsService: ReturnsService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.spinnerFlag = true;
    this.returnsService.getAllReturns().subscribe(
      response => {
        var data = response.json();
        this.returns = data.returns;
        this.spinnerFlag = false;
        this.setPage(1);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginationService.getPager(this.returns.length, page);

    // get current page of items
    this.pagedItems = this.returns.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getOrderDetailsById(orderId) {
    this.selectedReturn = _.findWhere(this.returns, { orderId: orderId });;
  }


  searchByProduct(search) {
    if (search.length != 0) {
      this.pagedItems = [];
      this.paginationFlag = false;
      this.returns.forEach(order => {
        if (order.productName.match(search)) {
          this.pagedItems.push(order);
        }
      });
    }
    else {
      this.paginationFlag = true;
      this.pagedItems = [];
      this.setPage(1);
    }
  }
}
