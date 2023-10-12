import { Component } from '@angular/core';

@Component({
  selector: 'app-bmicalculator',
  templateUrl: './bmicalculator.component.html',
  styleUrls: ['./bmicalculator.component.css']
})
export class BmicalculatorComponent {

  weight!:number
  height!:number
  bmi!:number|null

  constructor(){

  }
  calculateBMI(){

    if(this.weight && this.height){
    this.bmi = this.weight / (0.3048 * this.height) ** 2;}
  }
}
