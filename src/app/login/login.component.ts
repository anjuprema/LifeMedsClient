import { UserService } from './../service/user.service';
import { Router } from '@angular/router';
import { MedicineService } from './../service/medicine.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';
const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type':  'application/json'
});
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, 
    private medicineservice: MedicineService, private router: Router,
    private userservice: UserService, private setting: SettingService) { }

  public loginForm: FormGroup;
  public showMessage: boolean = false;
  public userMessage: String = '';
  private loginUrl = "";
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });
  }

  resetForm(form: any){    
    form.reset();
  }

  hasErrors(field: any){
    //return (this.registerForm.get(field).invalid && this.registerForm.get(field).touched && this.registerForm.get(field).errors);
    //OR
    //use getter
    return (this.userName.touched && this.userPassword.touched && this.loginForm.get(field).errors);
  }

  get userName(){ return this.loginForm.get('userName') }
  get userPassword(){ return this.loginForm.get('userPassword') }
  
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
      //console.log('Your order has been submitted', this.loginForm.value);
      this.loginUrl = this.setting.requestUrl+"/login";
      this.httpClient.post(this.loginUrl, JSON.stringify(this.loginForm.value), { headers: httpHeaders })
      .subscribe(data => {
        if(data == "200"){
          //if successfully logged in, set user into to user service
          this.userservice.setUserInfo('userName', this.loginForm.value.userName);
          
          this.resetForm(form);
          this.showMessage = true;
          this.userMessage = "Login Successful";          

          //if succesfully logged in, redirect to cart
          if(this.medicineservice.getCartMedicineCount() > 0){
            this.router.navigate(['/cart'])
          }
        }else if(data == "500"){          
          this.showMessage = true;
          this.userMessage = "Invalid Credentials";
        }
      }, err => {
        console.log(err);
      });
    }
  }

}
