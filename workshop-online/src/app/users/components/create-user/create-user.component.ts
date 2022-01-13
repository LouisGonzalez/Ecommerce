import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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

  
  public identity:any;
  public token:any;

  constructor(private userService: UserService, private router: Router) { }

  submit(){
    if(this.form.valid){
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
          Swal.fire({
            title: 'Welcome!',
            text: 'User added succesfully',
            icon: 'success'
          })
          this.userService.login(this.user.username, this.user.password).subscribe(response => {
            this.token = response.success;
            this.identity = response.user;
            if(this.token.length <= 0){

            } else {
              localStorage.setItem("token", this.token);
              localStorage.setItem("user", JSON.stringify(this.identity));
              this.userService.setUserSesion(true);
              let user = this.userService.getIdentity();
              this.router.navigate(['/products/list']);
            }
          })
        }
      ) 
    }
  }

  cancel(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}