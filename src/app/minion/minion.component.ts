import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Minion } from '../../interface/minion';
import { MinionService } from '../services/minion.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-minion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './minion.component.html',
  styleUrl: './minion.component.css'
})
export class MinionComponent implements OnInit, OnChanges{
  minions:Minion[]=[];

  constructor(private readonly minionService:MinionService, private router:Router){}
  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.name!=undefined && this.name.match(RegExp('[0-9]'))){
      this.minions = [];
      this.minionService.getMinionById(this.name).subscribe({next: (minion) => this.minions.push(minion)});
    }else if(this.name!=undefined && this.name.match(RegExp('[A-Za-z]'))){
      this.minionService.getMinion(this.name).subscribe({next: (minions) => this.minions=minions});
    }else{
      this.minionService.getMinions().subscribe({next: (minions) => this.minions=minions});
    }
    console.log(this.name)
  }

  @Input() searchTerm:string = '';

  @Input() name:string = '';
  @Input() id:string = '';
  ngOnInit(): void {
  
    if(!this.name) this.minionService.getMinions().subscribe({next: (minions) => this.minions=minions});
    

  }

  goToInfo(id:string){
    this.router.navigate(["minion", id]);
  }

  switchLike(minion:Minion){
    if(minion.like){
      minion.like=false;
    }else{
      minion.like=true;
    }
    this.minionService.updateMinionById(minion).subscribe();
  }

}
