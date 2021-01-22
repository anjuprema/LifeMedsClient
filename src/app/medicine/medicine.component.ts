import { MedicineService } from './../service/medicine.service';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  private medicineDataPath;  
  

  private imagePath = "/assets/images/";
  public medicineData;
  private id;
  private filterBy;
  constructor(private httpClient: HttpClient,private route: ActivatedRoute, private medicineservice: MedicineService,
     public setting: SettingService) { }
  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      this.medicineDataPath = this.setting.requestUrl+"/listMedicine";
      this.filterBy = params.get('by');
      this.id = params.get('id');
      //console.log(this.id);
      if(this.filterBy == 'category')
        this.medicineDataPath = this.medicineDataPath+"?categoryId="+this.id;
      else if(this.filterBy == 'seller')
        this.medicineDataPath = this.medicineDataPath+"?sellerId="+this.id;
      else if(this.filterBy == 'title')
        this.medicineDataPath = this.medicineDataPath+"?title="+this.id;

      /*get medicine list*/
      this.httpClient.get(this.medicineDataPath).subscribe(data => {
        this.medicineData = data;
        //console.log(data);
      }, err => {
        //console.log(err);
      })
    });   
  }

  public getSubString(data, count){
    return data.substring(0, count);
  }

}
