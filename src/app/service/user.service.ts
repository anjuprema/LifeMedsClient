import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo: any[] = [];
  constructor() { }

  getUserInfo(){
    return this.userInfo;
  }

  setUserInfo(key, value){
    this.userInfo[key] = value;
  }

  resetUserInfo(){
    this.userInfo = [];
  }
}
