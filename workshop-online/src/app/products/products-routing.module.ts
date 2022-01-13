import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { LoginGuard } from '../users/guards/login.guard';
import { ProductUserlistComponent } from './product-userlist/product-userlist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',   //products
    component: ProductsComponent,
    children: [
      {
        path: '',     //products -> /products/list
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',       //    products/list
        component: ProductListComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'add',  //  products/add
        component: ProductAddComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'edit/:id',   
        component: ProductEditComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'my-list/:user',
        component: ProductUserlistComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent,
        canActivate: [LoginGuard]
      },
      // {
      //   path: 'cart',
      //   component: ShoppingCartComponent,
      //   canActivate: [LoginGuard]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
