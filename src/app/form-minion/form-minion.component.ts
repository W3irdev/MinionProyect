import { Component, Input, OnInit } from '@angular/core';
import { Minion } from '../../interface/minion';
import { FormsModule } from '@angular/forms';
import { MinionService } from '../services/minion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-minion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-minion.component.html',
  styleUrl: './form-minion.component.css'
})
export class FormMinionComponent implements OnInit{
  minion:Minion;
  added:boolean = false;
  @Input() id!:string;
  status:string = "creating";
  constructor(private minionService:MinionService){
    this.minion = {name:'', bio:'', birth:'', img:'assets/img/noImage.jpg', like:false, side:''};
  }
  ngOnInit(): void {
    if(this.id){
      this.minionService.getMinionById(this.id).subscribe({next: (minion) => this.minion=minion});
      this.status = "editing";
    }
  }



  addMinion(){
    if(this.minion.name && this.minion.bio && this.minion.birth && this.minion.img && this.minion.side){
      console.log("Registrando")
      
      try {
          this.minionService.createMinion(this.minion).subscribe();
          this.added = true;
          
        } catch (error) {
          console.log(error);
        }
      
    }
  }

  editMinion(){
    if(this.minion.name && this.minion.bio && this.minion.birth && this.minion.img && this.minion.side){
      console.log("Editando")
      
      try {
          this.minionService.updateMinionById(this.minion).subscribe();
          this.added = true;
          
        } catch (error) {
          console.log(error);
        }
      
    }
  }



}
