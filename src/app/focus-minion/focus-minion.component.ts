import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Minion } from '../../interface/minion';
import { CommonModule } from '@angular/common';
import { MinionService } from '../services/minion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-focus-minion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './focus-minion.component.html',
  styleUrl: './focus-minion.component.css'
})
export class FocusMinionComponent implements OnInit{
  constructor(private readonly minionService:MinionService, private route:ActivatedRoute){}
  @Input() id!:string;
  ngOnInit(): void {
    this.route.params.subscribe({next: (data)=>{
      this.minionService.getMinionById(data['id']).subscribe({next: (minionRescue) => this.minion = minionRescue}) // Devuelve un objeto con los parametros
    }})
    ;
  }
/*   ngOnChanges(changes: SimpleChanges): void {
    this.minionService.getMinionById(this.id).subscribe({next: (minionRescue) => this.minion = minionRescue});
  } */

  minion!:Minion[];



}
