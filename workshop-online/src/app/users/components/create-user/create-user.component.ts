import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Switch } from 'src/app/shared/models/switch';
import { AdminService } from 'src/app/shared/services/admin.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as moment from 'moment'
import { Report } from 'src/app/shared/models/report';

@Component({
  selector: 'ed-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    extension: new FormControl('', [Validators.required])
  })
  user: User;
  sw: Switch;
  date: any;
  date2: any;
  hourMinute: any;
  report: Report;

  public identity: any;
  public token: any;

  constructor(private userService: UserService, private router: Router, private adminService: AdminService) { }

  submit() {
    if (this.form.valid) {
      this.user = this.form.value;
      this.userService.add(this.user).pipe(
        catchError(error => {
          Swal.fire({
            icon: 'error',
            title: ':(',
            text: error,
          })
          return EMPTY;
        })
      )
        .subscribe(
          result => {

            this.adminService.getStatus("2").subscribe(data => {
              this.sw = data.sw;
              let status = '';
              this.date = moment(new Date()).format('YYYY');
              this.hourMinute = new Date().getHours() + ' : ' + new Date().getMinutes();
              if (this.sw.status) {
                //loguearse
                Swal.fire({
                  title: 'Welcome!',
                  text: 'User added succesfully',
                  icon: 'success'
                })
                this.userService.login(this.user.username, this.user.password).subscribe(response => {
                  this.token = response.success;
                  this.identity = response.user;
                  if (this.token.length <= 0) {

                  } else {
                    localStorage.setItem("token", this.token);
                    localStorage.setItem("user", JSON.stringify(this.identity));
                    this.userService.setUserSesion(true);
                    let user = this.userService.getIdentity();
                    this.router.navigate(['/products/list']);
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
                type: 'Creacion de usuario',
                user: this.user.username,
                date: this.date,
                hour: this.hourMinute,
                status: status
              }
              this.sendReport();
            })




          }
        )
    }
  }

  sendReport(){
    this.adminService.createReport(this.report).subscribe(data => {
    })
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
