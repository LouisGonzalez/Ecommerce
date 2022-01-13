import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ed-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  id:string;
  user: User;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    extension: new FormControl('')
  })

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) {
    this.id = "";
  }

  submit(){
    if(this.form.valid){
      const user = this.form.value;
      user.id = this.id;
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if(result.isConfirmed){
          this.service.update(user).pipe(
            catchError(error => {
              Swal.fire({
                icon: 'error',
                title: ':(',
                text: 'Cannot get user details at this time. Please try again later'
              })
              return EMPTY;
            })
          )
          .subscribe(result => {
            console.log('Update finished', result);
            Swal.fire('Saved!', '', 'success');
            this.router.navigate(['/profile/'+user.id]);
          })
        } else if(result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      })
    }
  }

  cancel(){
    this.router.navigate(['/profile/'+this.id]);
  }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')||'';
    if(this.id != ''){
      this.service.get(this.id).subscribe(user => {
        this.form.patchValue(user.user);
      })
    }
  }

}
