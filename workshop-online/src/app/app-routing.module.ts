import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './users/components/login/login.component';
import { LoginGuard } from './users/guards/login.guard';
import { ProfileComponent } from './users/components/profile/profile.component';
import { ProfileEditComponent } from './users/components/profile-edit/profile-edit.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: CreateUserComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'edit-profile/:id',
    component: ProfileEditComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',       //localhost:4200/ -> /products  -> /products/list
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
