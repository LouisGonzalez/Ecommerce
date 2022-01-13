import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import Swal from 'sweetalert2';
import { Product } from '../shared/models/product';
import { catchError, EMPTY } from 'rxjs';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'ed-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  user: any;

  constructor(private service: ProductsService, private router: Router) { }

  submit(product: Product){
    console.log('Going to save ', product);
    product.user= this.user.id;
    console.log(product)
    this.service.add(product)
    .subscribe(
      result => {
        console.log('The product has been added ', result);
        //confirmation message
        Swal.fire({
          text: 'product added successfully',
          icon: 'success',
        })
        this.router.navigate(['']);
      }
    );
  }

  cancel(){
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
