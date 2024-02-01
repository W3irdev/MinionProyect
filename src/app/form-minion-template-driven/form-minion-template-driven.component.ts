import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Minion } from '../../interface/minion';
import { MinionService } from '../services/minion.service';

@Component({
  selector: 'app-form-minion-template-driven',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-minion-template-driven.component.html'
})
export class FormMinionTemplateDrivenComponent {

  constructor(private minionService:MinionService){}
  @ViewChild('myForm') myForm!:NgForm;

  minion!:Minion;

  notValid(field: string): boolean{
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }


  submit(){
    if(this.myForm.valid){
      this.minion=this.myForm.value;
      this.minionService.createMinion(this.minion);
      this.myForm.reset();
      
    }
  }

}
