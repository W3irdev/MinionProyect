import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Minion } from '../../interface/minion';
import { MinionService } from '../services/minion.service';

@Component({
  selector: 'app-form-minion-reactivo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-minion-reactivo.component.html'
})
export class FormMinionReactivoComponent {


  constructor(private fb:FormBuilder, private minionService:MinionService){}

  minion!:Minion;

  myForm:FormGroup = this.fb.group({
    name: ['',Validators.required],
    birthDate: ['',Validators.required],
    align: ['',Validators.required],
    bio: ['',Validators.required],
    image: ['',Validators.required]
  })

status:boolean=false;

isValidField(field: string){
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched
}

submit(){
  if(this.myForm.valid){
    this.minion = this.myForm.value
    this.minionService.createMinion(this.minion)
console.log(this.minion)
this.myForm.reset();
  }else{
    this.myForm.markAllAsTouched();
  }
  
}

}
