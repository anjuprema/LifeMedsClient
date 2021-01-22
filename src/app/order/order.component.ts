import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderHistoryPath = "";
  orderHistory;
  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router,
    private setting: SettingService) { }
  ngOnInit(): void {
    /*if not logged in redirect user to home page*/
    if(!this.userService.getUserInfo()["userName"]){
      this.router.navigate(['']);
    }else {
      /*get medicine list*/
      this.orderHistoryPath = this.setting.requestUrl+"/orderHistory?userName="+ this.userService.getUserInfo()["userName"];
      this.httpClient.get(this.orderHistoryPath).subscribe(data => {
        this.orderHistory = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
    }    
  }

}
