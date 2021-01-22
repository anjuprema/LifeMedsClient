import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SettingService } from '../service/setting.service';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type':  'application/json'
});

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public showMessage: boolean = false;
  public userMessage: String = '';
  private registerUrl = "";
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private setting: SettingService ) { }

  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      userPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    });
  }

  resetForm(form: any){    
    form.reset();
  }

  hasErrors(field: any){
    //return (this.registerForm.get(field).invalid && this.registerForm.get(field).touched && this.registerForm.get(field).errors);
    //OR
    //use getter
    return (this.userName.touched && this.userPassword.touched && this.confirmPassword.touched && this.registerForm.get(field).errors);
  }

  get userName(){ return this.registerForm.get('userName') }
  get userPassword(){ return this.registerForm.get('userPassword') }
  get confirmPassword(){ return this.registerForm.get('confirmPassword') }

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
      //console.log('Your order has been submitted', this.registerForm.value);
      this.registerUrl = this.setting.requestUrl+"/register";
      this.httpClient.post(this.registerUrl, JSON.stringify(this.registerForm.value), { headers: httpHeaders })
      .subscribe(data => {
        if(data == "200"){
          this.resetForm(form);
          this.showMessage = true;
          this.userMessage = "Registation Successful. Please Login";
        }else if(data == "500"){          
          this.showMessage = true;
          this.userMessage = "User Name already exists.. Please choose another user name.";
        }
      }, err => {
        console.log(err);
      });
    }
  }
}
