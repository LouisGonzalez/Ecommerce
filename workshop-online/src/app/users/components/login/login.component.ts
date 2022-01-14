import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Switch } from 'src/app/shared/models/switch';
import { AdminService } from 'src/app/shared/services/admin.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as moment from 'moment'
import { Report } from 'src/app/shared/models/report';

@Component({
  selector: 'ed-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  username: string = "";
  password: string = "";
  sw: Switch;
  date:any;
  date2: any;
  hourMinute:any;
  user: User;
  report: Report;


  public identity:any;
  public token:any;

  constructor(private router: Router, private userService: UserService, private adminService: AdminService) { }

  submit(){
    if(this.form.valid){
      console.log('Submit', this.form.value);
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: User){

    this.adminService.getStatus("2").subscribe(data => {
      this.sw = data.sw;
      let status = '';
      this.date = moment(new Date()).format('YYYY');
      this.hourMinute = new Date().getHours() + ' : '+ new Date().getMinutes();
      if(this.sw.status){
        //loguearse
        status = "Solicitud aceptada";
        this.userService.login(user.username, user.password).subscribe(response => {
          this.token = response.success;
          this.identity = response.user;
          if(this.token.length <= 0){
    
          } else {
            console.log(this.token);
            console.log(this.identity);
            localStorage.setItem("token", this.token);
            localStorage.setItem("user", JSON.stringify(this.identity));
            this.userService.setUserSesion(true);
            let user = this.userService.getIdentity();
            this.router.navigate(['/products/list']);
            console.log('emtrp aquifasdfasf');
          }
        },
        (error) => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          Swal.fire({
            title: errorMessage.error.error,
            icon: 'warning'
          })
          if(errorMessage != null){
            //
          }
        })
    




      } else {
        status = "Solicitud denegada";
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'The login service has blocked in this moment, please try again later'
        })
      }
      this.report = {
        type: 'Inicio de sesion',
        user: user.username,
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

  ngOnInit(): void {
  }

}
