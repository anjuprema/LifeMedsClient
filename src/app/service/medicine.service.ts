import { MedicineComponent } from './../medicine/medicine.component';
import { Injectable, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public medicines : any[] = [];
  public medicineCount : any[] = [];
  public totalCartAmount: number = 0;
  private calAmt;  
  constructor() {  }
  
  //function that calculates cart amount
  public updateCartAmount(action, amount){
    if(action == "add"){
      this.totalCartAmount = (this.totalCartAmount + amount);
      
    }else if(action == "sub"){
      this.totalCartAmount = (this.totalCartAmount - amount);
    }
    this.totalCartAmount = parseFloat (this.totalCartAmount.toFixed(2));
  }

  //function that add item to cart
  public setCartMedicine(medicine){
    if(this.medicineCount[medicine.idMedicine]){
      this.medicineCount[medicine.idMedicine] = this.medicineCount[medicine.idMedicine] +1;
      
    }else {
      this.medicineCount[medicine.idMedicine] = 1;      
      this.medicines[this.medicines.length] = medicine;
    }
    this.updateCartAmount("add", medicine.medicinePrice);
  }

  public getMedicineCount(medicine){
    return this.medicineCount[medicine.idMedicine];
  }

  //function that provides cart items
  public getCartMedicine(){
    return this.medicines;
  }

  //function that returns medicine count array
  public getMedicineCountList(){
    return this.medicineCount;
  }

  //function to return cart item count
  public getCartMedicineCount(){
    return this.medicines.length;
  }

  //function that removes item from cart
  public removeItem(medicine, index){
    this.calAmt = this.medicineCount[medicine.idMedicine] * medicine.medicinePrice;
    this.medicines.splice(index, 1);
    this.medicineCount[medicine.idMedicine] = 0;
    this.updateCartAmount("sub", this.calAmt);
  }

  public resetCart(){
    this.medicines = [];
    this.medicineCount = [];
    this.totalCartAmount = 0;
    this.calAmt = 0;
  }
  
}
