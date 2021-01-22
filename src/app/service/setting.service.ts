import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  //public requestUrl = "http://ec2-54-157-212-61.compute-1.amazonaws.com:8090//client";
  //public imageUrl = "http://ec2-54-157-212-61.compute-1.amazonaws.com:8090/images";
  public requestUrl = "http://localhost:8090/client";
  public imageUrl = "http://localhost:8090/images";
  constructor() { }
  
}
