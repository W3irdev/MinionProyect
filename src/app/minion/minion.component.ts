import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Minion } from '../../interface/minion';
import { MinionService } from '../services/minion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minion.component.html',
  styleUrl: './minion.component.css'
})
export class MinionComponent implements OnInit, OnChanges{
  minions:Minion[]=[];

  constructor(private readonly minionService:MinionService){}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.name){
      this.minionService.getMinion(this.name).subscribe({next: (minions) => this.minions=minions});
    }
    console.log(this.name)
  }

  @Input() searchTerm:string = '';

  @Input() name:string = '';
  ngOnInit(): void {
    this.minionService.getMinions().subscribe({next: (minions) => this.minions=minions});
    if(this.name){
      this.minionService.getMinion(this.name).subscribe({next: (minions) => this.minions=minions});
    }
    console.log(this.name)
  }




}
