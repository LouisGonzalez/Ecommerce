import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';



@Component({
  selector: 'ed-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() id = "";
  product2: Product;
  @Output() close = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private service: ProductsService, private router: Router) { }


  //Cierra el modal
  ok(){
    this.close.emit("a");
  }

  ngOnInit(): void {
     if(this.id != ''){
       this.service.get(this.id).subscribe(product => {
         console.log('product ', product);
         this.product2 = product.product;
         console.log(this.product2.description);
       })
     }
  }

}
