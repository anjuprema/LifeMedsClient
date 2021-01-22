import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';
import { MedicineService } from './../service/medicine.service';
import { Component, OnInit, Input } from '@angular/core';
import { SettingService } from '../service/setting.service';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type':  'application/json'
});

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  constructor(public medicineservice: MedicineService, private router: Router, private userservice: UserService,
    private httpClient: HttpClient, private formBuilder: FormBuilder, private setting: SettingService) { }
 
  @Input() medicineList: any[] = [];
  @Input() medicineCountList: any[] = [];
  public checkoutForm: FormGroup;
  public data;
  private purchaseUrl = "";
  ngOnInit(): void {
    this.medicineList = this.medicineservice.getCartMedicine();
    this.medicineCountList = this.medicineservice.getMedicineCountList();
    console.log(this.userservice.getUserInfo());
    //if no cart content, redirect to home page
    if(this.medicineList.length <= 0){
      this.router.navigate(['']);
    }else if(this.userservice.getUserInfo()['userName'] == null){
      //if user not logged in, force user to login
      this.router.navigate(['/login']);
    }    

    this.checkoutForm = this.formBuilder.group({
      deliveryAddress: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiryMonth: ['', [Validators.required]],
      cvvCode: ['', [Validators.required]],
      amountPayed: [this.medicineservice.totalCartAmount]
    });
  }


  resetForm(form: any){    
    form.reset();
  }

  hasErrors(field: any){
    //return (this.registerForm.get(field).invalid && this.registerForm.get(field).touched && this.registerForm.get(field).errors);
    //OR
    //use getter
    return (this.deliveryAddress.touched && this.cardNumber.touched 
      && this.expiryMonth.touched && this.cvvCode.touched && this.checkoutForm.get(field).errors);
  }

  get deliveryAddress(){ return this.checkoutForm.get('deliveryAddress') }
  get cardNumber(){ return this.checkoutForm.get('cardNumber') }
  get expiryMonth(){ return this.checkoutForm.get('expiryMonth') }
  get cvvCode(){ return this.checkoutForm.get('cvvCode') }
    
  validateForm(form: any){
    Object.keys(form.controls).forEach( field =>{
      const control = form.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({ onlySelf: true});
      }else if(control instanceof FormGroup){
        this.validateForm(control);
      }
    })
  }

  submitForm(form: any){
    if(!form.valid){
      this.validateForm(form);
    }else{      
      console.log('Your order has been submitted', this.checkoutForm.value);
      this.data = {
        "medicineList": this.medicineList,
        "medicineCount": this.medicineCountList,
        "userInfo": {"userName": this.userservice.getUserInfo()['userName']},
        "paymentInfo": this.checkoutForm.value
      };
      //console.log(this.data);
      //console.log(JSON.stringify(this.data));
      this.purchaseUrl = this.setting.requestUrl+"/purchase";
      this.httpClient.post(this.purchaseUrl, JSON.stringify(this.data), { headers: httpHeaders })
      .subscribe(data => {
        if(data == "200"){
          //if successfully placed order
          this.resetForm(form);
          this.medicineservice.resetCart();
          this.router.navigate(['/order']);
        }else if(data == "500"){          
          console.log(data);
        }
      }, err => {
        console.log(err);
      });
    }
  }



}
