import { MedicineService } from './../service/medicine.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.css']
})
export class MedicineDetailComponent implements OnInit {
  private medicineDataPath;
  private id;
  public medicine;
  private imagePath = "/assets/images/";

  constructor(private httpClient: HttpClient,private route: ActivatedRoute, public medicineservice: MedicineService,
    public setting: SettingService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.medicineDataPath = this.setting.requestUrl+"/medicineDetail";
      this.id = params.get('id');      
      if(this.id != ''){
        this.medicineDataPath = this.medicineDataPath+"?medicineId="+this.id;     

        /*get medicine detail*/
        this.httpClient.get(this.medicineDataPath).subscribe(data => {
          this.medicine = data;
          //console.log(data);
        }, err => {
          //console.log(err);
        })
      }

    });
  }
}
