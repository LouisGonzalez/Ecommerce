import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import Swal from 'sweetalert2';
import { Product } from '../shared/models/product';
import { catchError, EMPTY } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Switch } from 'src/app/shared/models/switch';
import { Report } from 'src/app/shared/models/report';
import { User } from 'src/app/users/models/user';
import * as moment from 'moment'

@Component({
  selector: 'ed-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    brand: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, this.minPrince(1)]),
    salePrice: new FormControl('',[Validators.required, this.minPrince(1)]),
    thumbImage: new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]),
    description: new FormControl('')
  })

  id: string;
  product: Product;

  sw: Switch;
  date:any;
  hourMinute:any;
  report: Report;
  user: User;

  constructor(private route: ActivatedRoute, 
    private service: ProductsService, 
    private router: Router,
    private adminService: AdminService) {
    this.id = "";
  }

  submit() {
    if (this.form.valid) {
      const product = this.form.value;
      product.id = this.id;
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.update(product).pipe(
            catchError(error => {
              Swal.fire({
                icon: 'error',
                title: ':(',
                text: 'Cannot get product details at this time. Please try again later'
              })
              return EMPTY;
            })
          )
          .subscribe(result => {
            console.log('Update finished', result);
            Swal.fire('Saved!', '', 'success')
            this.router.navigate(['/products']);
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }

  //Verifica si la solicitud puede ser procesada actualmente
  verifySwitchEdit(){
    this.adminService.getStatus("1").subscribe(data => {
      this.sw = data.sw;
      let status = '';
      this.date = moment(new Date()).format('YYYY');
      this.hourMinute = new Date().getHours() + ' : '+ new Date().getMinutes();
      this.user = JSON.parse(localStorage.getItem("user")!);
      if(this.sw.status){
        status = "Solicitud aceptada";
        //Edita el archivo
          this.submit();
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



  cancel(){
    this.router.navigate(['/products']);
  }

  private minPrince(minPrice: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]:any} | null => {
      if(control.value !== undefined && control.value <= minPrice){
        return {
          'minprice' : true
        }
      } else {
        return null;
      }
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')||'';
    if(this.id != ''){
      this.service.get(this.id).subscribe(product => {
        console.log('product ', product);
        //this.form.setValue(product)
        this.form.patchValue(product.product);
      })
    }
    
  }

}
