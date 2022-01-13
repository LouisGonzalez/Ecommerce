import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ed-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
  })

  id: string;
  user: User;

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) {
    this.id = "";
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')||'';
    console.log(this.id);
    if(this.id != ''){
      this.service.get(this.id).subscribe(user => {
        console.log('user ', user);
        this.form.patchValue(user.user);
        this.user = user.user;
      })
    }
  }



}
