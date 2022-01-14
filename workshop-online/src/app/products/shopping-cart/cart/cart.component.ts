import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Switch } from 'src/app/shared/models/switch';
import { AdminService } from 'src/app/shared/services/admin.service';
import Swal from 'sweetalert2';
import { Product } from '../../shared/models/product';
import * as moment from 'moment'
import { Report } from 'src/app/shared/models/report';
import { User } from 'src/app/users/models/user';
import { Bill } from '../../shared/models/bill';
import { BillService } from '../../shared/services/bill.service';
import { ProductBill } from '../../shared/models/product-bill';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'ed-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() product: string;
  @Input() amount: number;

  @Input() totalProducts: Product[];
  @Input() totalAmount: number[];

  @Output() productFather: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  @Output() amountFather: EventEmitter<number[]> = new EventEmitter<number[]>();
  sw: Switch;
  date:any;
  date2: any;
  hourMinute:any;
  report: Report;
  user: User;
  user2: User;
  bill: Bill;
  productBill: ProductBill;

  txtAmount: number;

  totalProduct: number;
  totalShipping: number;
  totalFinal: number;

  amountXproducts: number[] = [];
  constructor(private adminService: AdminService, private billService: BillService, private cartService: CartService) { 

 }

  public eventHandler(row: any){
    this.txtAmount = Number(((document.getElementById(row) as HTMLInputElement).value));
    console.log(this.txtAmount+'  '+row)
    this.totalAmount[row] = this.txtAmount;
    this.calculateTotals();
    this.showTotals();
  }

  buy(){
    this.adminService.getStatus("1").subscribe(data => {
      this.sw = data.sw;
      let status = '';
      this.date = moment(new Date()).format('YYYY');
      this.hourMinute = new Date().getHours() + ' : '+ new Date().getMinutes();
      this.user = JSON.parse(localStorage.getItem("user")!);
      if(this.sw.status){
        status = "Solicitud aceptada"
        //Realiza la compra
        this.createBill();
      } else {
        status = "Solicitud denegada";
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'The server has blocked in this moment, please try again later.'
        })
      }
      this.report = {
        type: 'Inicio de sesion',
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

  calculateTotals(){
     for(let i=0;i < this.totalProducts.length; i++){
       this.amountXproducts[i] = this.totalProducts[i].price * this.totalAmount[i];
     }
  }

  showTotals(){
    this.totalShipping = 2;
    this.totalProduct = 0;
    for(let i = 0; i< this.amountXproducts.length; i++){
      this.totalProduct = this.totalProduct + this.amountXproducts[i];
    }
    this.totalFinal = this.totalShipping + this.totalProduct;
  }

  defineNewFatherValues(){
    this.productFather.emit(this.totalProducts);
    this.amountFather.emit(this.totalAmount);
  }

  closeCart(){
    document.getElementById('shopping-cart')?.remove();
    document.getElementById('cart-overlay')?.remove();
  }

  clearCart(){
      Swal.fire({
        title: 'Are you sure to delete the cart?',
        text: 'These changes cannot be reversed',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'Cancel',
      }).then((result) => {
        if(result.isConfirmed){
          this.cartService.deleteProducts(1);
          Swal.fire({
            text: 'Cart deleted succesfully',
            icon: 'success',
          })  
          this.closeCart();
        } else if(result.isDenied){
          Swal.fire('The operation has been canceled', '', 'info');
        }
      
  
    })
  }

  /*-----------------METODOS PARA LA FACTURA--------------------*/

  createBill(){
    Swal.fire({
      title: 'Buy details',
      text: 'Total to pay: $'+this.totalFinal,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Buy',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if(result.isConfirmed){
        this.user2 = JSON.parse(localStorage.getItem('user')!);
        this.date2 = moment(new Date()).format('YYYY');
        this.bill = {
          user: this.user2.id,
          subtotal: this.totalProduct,
          shipping: this.totalShipping,
          total: this.totalFinal,
          date: this.date2
        }
        this.billService.add(this.bill).subscribe(data => {
          console.log(data.bill.id, "     safasfesadf")
          for(let i = 0; i <this.totalProducts.length; i++){
            this.productBill = {
              idBill: data.bill.id,
              idProduct: this.totalProducts[i].id,
              total: this.amountXproducts[i],
              amount: this.totalAmount[i]
            }
            this.createProductBill(this.productBill);
          }
    
        })   
        Swal.fire('Buy sccessful!', '', 'success')
        this.cartService.deleteProducts(1);
        this.closeCart();
      } else if(result.isDenied){
        Swal.fire('The buy has been canceled!', '', 'info');
      }
    })

  }

  createProductBill(pB: ProductBill){
    this.billService.addProduct(this.productBill).subscribe(data =>{

    });
  }
  


  ngOnInit(): void {
    this.calculateTotals();
    this.showTotals();
  }

}
