import { LogoutComponent } from './logout/logout.component';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicineDetailComponent } from './medicine-detail/medicine-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicineComponent } from './medicine/medicine.component';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [{
  path:'', component:MedicineComponent  
}, {
  path:'filter/:by/:id', component:MedicineComponent  
}, {
  path:'details/:id', component:MedicineDetailComponent
},  {
  path:'cart', component:CartComponent
}, {
  path:'register', component:RegisterComponent
}, {
  path:'login', component:LoginComponent
}, {
  path:'checkout', component:CheckoutComponent
}, {
  path:'order', component:OrderComponent
}, {
  path:'logout', component:LogoutComponent
}, {
  path:'**', component:MedicineComponent  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
