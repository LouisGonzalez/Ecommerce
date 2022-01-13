import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CartComponent } from 'src/app/products/shopping-cart/cart/cart.component';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'ed-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

 
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  totalProducts: Product[] = [];
  totalAmount: number[] = [];

  constructor(private cartService: CartService,private componentFactoryResolver: ComponentFactoryResolver) { 

  }

  closeCart(){
    document.getElementById('shopping-cart')?.remove();
  }

  init(){

    this.cartService.invocateCart3.subscribe((data) => {
      this.totalProducts = [];
      this.totalAmount = [];
    })

    //Se define el vector productos
    this.cartService.invocateCart.subscribe((data) => {
      console.log(this.totalProducts.length+"       asfasfasdfase");
      if(data.id != "-1"){
        this.totalProducts.push(data);
      }

      //Se define el vector amounts
      this.cartService.invocateCart2.subscribe((data) => {
        if(data != -1){
          this.totalAmount.push(data);
        }
      })
      this.createCart();

    })



  }

  createCart(){
    const dynamicComponent = this.componentFactoryResolver.resolveComponentFactory(CartComponent);
    const componentRef = this.container.createComponent(dynamicComponent);
    //Definicion de parametros hacia el hijo
    componentRef.instance.totalProducts = this.totalProducts;
    componentRef.instance.totalAmount = this.totalAmount;
    //Suscripcion a los parametros que reciba del hijo
   
   
    // componentRef.instance.productFather.subscribe(val => {
    //   this.totalProducts = val;
    // })
    // componentRef.instance.amountFather.subscribe(val => {
    //   this.totalAmount = val;
    // })


  }

  ngOnInit(): void {
    this.init();
  }


}
