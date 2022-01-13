import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'ed-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    brand: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, this.minPrince(1)]),
    salePrice: new FormControl('',[Validators.required, this.minPrince(1)]),
    thumbImage: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;

  @Input()
  set model(m: Product){
    if(!m){
      return;
    }
    console.log('set model ', m);
    this.form.patchValue(m);
  }

  @Output() submit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  onSubmit(){
    if(this.form.valid){
      this.submit.emit(this.form.value);    //Enviando el modelo de datos: Product
    } else {
      console.error('Invalid form');
    }
  }

  onCancel(){ 
    this.cancel.emit();
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
  }
  

}
