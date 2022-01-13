import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Report } from 'src/app/shared/models/report';
import { Switch } from 'src/app/shared/models/switch';
import { AdminService } from 'src/app/shared/services/admin.service';
import { User } from 'src/app/users/models/user';
import Swal from 'sweetalert2';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import * as moment from 'moment'

@Component({
  selector: 'ed-product-userlist',
  templateUrl: './product-userlist.component.html',
  styleUrls: ['./product-userlist.component.css']
})
export class ProductUserlistComponent implements OnInit {

  products: Product[];
  idUser: string;

  sw: Switch;
  date:any;
  hourMinute:any;
  report: Report;
  user: User;

  constructor(private route: ActivatedRoute, private service: ProductsService, private adminService: AdminService) { }


  deleteProduct(product:Product){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: "#d33",
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if(result.isConfirmed){
        this.service.delete(product.id).subscribe(response => {
          console.log('Product has been deleted', response);
          Swal.fire(
            'Deleted!',
            'Your product has been deleted',
            'success'
          )
          this.loadProducts();
        })
      }
    })
  }


  //Verifica si la solicitud puede ser procesada actualmente
  verifySwitchDelete(product: Product){
    this.adminService.getStatus("1").subscribe(data => {
      this.sw = data.sw;
      let status = '';
      this.date = moment(new Date()).format('YYYY');
      this.hourMinute = new Date().getHours() + ' : '+ new Date().getMinutes();
      this.user = JSON.parse(localStorage.getItem("user")!);
      if(this.sw.status){
        status = "Solicitud aceptada";
        //Elimina el producto
        this.deleteProduct(product);
      } else {
        status = "Solicitud denegada";
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'The server has blocked in this moment, please try again later.'
        })

      }
      this.report = {
        type: 'Edicion de un producto',
        user: this.user.username,
        date: this.date,
        hour: this.hourMinute,
        status: status
      }
      this.sendReport();
    })
  }

  sendReport(){
    this.adminService.createReport(this.report).subscribe(data => {
      
    })
  }










  private loadProducts(){
    this.service.getByUser(this.idUser).pipe(
      catchError(error => {
        Swal.fire({
          icon: 'error',
          title: ':(',
          text: 'Cannot get products at this time. Please try again later'
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
    this.idUser = this.route.snapshot.paramMap.get('user')||'';
    console.log(this.idUser)
    this.loadProducts();
  }

}
