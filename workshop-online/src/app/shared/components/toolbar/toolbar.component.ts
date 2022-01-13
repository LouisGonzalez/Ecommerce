import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/shared/models/product';
import { CartService } from 'src/app/products/shared/services/cart.service';

@Component({
  selector: 'ed-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user: any;
  product: Product = {
      id: "-1",
      title: "",
      salePrice: 0,
      price: 0,
      brand: "",
      thumbImage: "",
      user: 1,
      description: ""
  };
  constructor(private router: Router, private cartService: CartService) {
  }

  showCart(){
    this.product.id = "-1";
    this.cartService.onCartListen(this.product);
    this.cartService.onCartListen2(-1);
  }

  logOut(){
    localStorage.clear();
    this.cartService.deleteProducts(1);
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
  
  }

}
