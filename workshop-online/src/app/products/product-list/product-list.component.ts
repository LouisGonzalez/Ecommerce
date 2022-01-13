import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import Swal from 'sweetalert2';
import { catchError, EMPTY } from 'rxjs';
import { CartService } from '../shared/services/cart.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Switch } from 'src/app/shared/models/switch';
import { Report } from 'src/app/shared/models/report';
import { User } from 'src/app/users/models/user';
import * as moment from 'moment'

@Component({
  selector: 'ed-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  showIt: boolean;
  idProd: string;

  @Input() typeList: string;

  sw: Switch;
  date:any;
  hourMinute:any;
  report: Report;
  user: User;
  
  constructor(private service: ProductsService, private cartService: CartService, private adminService: AdminService) {
    this.products = [];
    this.showIt = false;
    this.idProd = "";
  }

  showCart(id:any){
    //Envio de un nodo Product
    this.service.get(id).subscribe(product => {
      console.log('product ',product);
      this.cartService.onCartListen(product.product);
    //Envio de un nodo Amount
    this.cartService.onCartListen2(1);      //temporal
    });
  }


  showModal(id:any){
    this.showIt = true;
    this.idProd = id;
  }

  closeModal(a: string){
    this.showIt = false;
  }



  private loadProducts(){
    this.service.getAll().pipe(
      catchError(error => {
        Swal.fire({
          icon: 'error',
          title: ':(',
          text: 'Cannot get Products at this time. Please try again later'
        })
        return EMPTY;
      })
    )
    .subscribe(data => {
      console.log('data', data);
      this.products = data.product;
    })
    
  }

  ngOnInit(): void {
    this.loadProducts();
  }

}
