import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Minion } from '../../interface/minion';
import { CommonModule } from '@angular/common';
import { MinionService } from '../services/minion.service';

@Component({
  selector: 'app-focus-minion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './focus-minion.component.html',
  styleUrl: './focus-minion.component.css'
})
export class FocusMinionComponent implements OnInit, OnChanges{
  constructor(private readonly minionService:MinionService){}
  @Input() id!:string;
  ngOnInit(): void {
    this.minionService.getMinionById(this.id).subscribe({next: (minionRescue) => this.minion = minionRescue});
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.minionService.getMinionById(this.id).subscribe({next: (minionRescue) => this.minion = minionRescue});
  }

  minion!:Minion;



}
