import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"Home", component: HomeComponent },
  {path:"products", component: ProductsComponent },
  {path:"NewProduct", component: NewProductComponent },
  {path:"EditProduct/:id", component: EditProductComponent }
];
