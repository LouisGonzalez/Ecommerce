import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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

  public identity:any;
  public token:any;

  constructor(private router: Router, private userService: UserService) { }

  submit(){
    if(this.form.valid){
      console.log('Submit', this.form.value);
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: User){
    // if(user.username === 'admin' && user.password === 'admin'){
    //   this.router.navigate(['']);
    // } else {
    //   console.error('Invalid credentials');
    // }
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
  }

  ngOnInit(): void {
  }

}
