import { MedicineService } from './../service/medicine.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private medicineservice: MedicineService) { }
  @Input() medicineList: any[] = [];
 
  ngOnInit(): void {
    this.medicineList = this.medicineservice.getCartMedicine();    
    //console.log(this.medicineList);
  }

}
