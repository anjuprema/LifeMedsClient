import { SettingService } from './service/setting.service';
import { MedicineService } from './service/medicine.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  appTitle = 'Life Meds';
  
  private categoryPath = "";
  private sellerPath = "";  
  private imagePath = "/assets/images/";  
  public categoryData;
  public sellerData;
   
  
  getMedicine(searchFor){
    this.router.navigate(['/filter/title/'+searchFor.value]);
  }
 
  constructor(private httpClient: HttpClient, private router: Router, private medicineservice: MedicineService,
    public userservice: UserService, public setting: SettingService) {  }
  @Input() medicineList: any[] = [];
  ngOnInit(): void {          
    this.medicineList = this.medicineservice.getCartMedicine();
    this.categoryPath = this.setting.requestUrl+"/listCategory";
    /*get category list*/
    this.httpClient.get(this.categoryPath).subscribe(data => {
      this.categoryData = data;
      //console.log(data);
    }, err => {
      console.log(err);
    })
    
    /*get seller list*/
    this.sellerPath =  this.setting.requestUrl+"/listSeller";
    this.httpClient.get(this.sellerPath).subscribe(data => {
      this.sellerData = data;
      //console.log(data);
    }, err => {
      console.log(err);
    })

  }

}
