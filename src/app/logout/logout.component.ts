import { Router } from '@angular/router';
import { MedicineService } from './../service/medicine.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private medicineService: MedicineService, private router: Router) { }

  ngOnInit(): void {
    this.userService.resetUserInfo();
    this.router.navigate(['']);
  }

}
