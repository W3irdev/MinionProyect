import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Minion } from '../../interface/minion';
import { MinionService } from '../services/minion.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, catchError, ignoreElements, of } from 'rxjs';

@Component({
  selector: 'app-minion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './minion.component.html',
  styleUrl: './minion.component.css'
})
export class MinionComponent implements OnInit, OnChanges{
  //minions:Minion[]=[];
  minions$!: Observable<Minion[]>
  errorMessage: any;
  minionError$!:Observable<any>;
  constructor(private readonly minionService:MinionService, private router:Router){}
  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.name!=undefined && this.name.match(RegExp('[0-9]'))){
      //this.minions = [];
      //this.minionService.getMinionById(this.name).subscribe({next: (minion) => this.minions.push(minion)});
      this.minions$ =  this.minionService.getMinionById(this.name).pipe(
        catchError((error) => {
          this.error=true; 
          return of(error)}));;
      
    }else if(this.name!=undefined && this.name.match(RegExp('[A-Za-z]'))){
      //this.minionService.getMinion(this.name).subscribe({next: (minions) => this.minions=minions});
      this.minions$ =  this.minionService.getMinion(this.name)
      .pipe(
        catchError((error) => {
          this.error=true; 
          return of(error)}));
    }else{
      //this.minionService.getMinions().subscribe({next: (minions) => this.minions=minions});
      this.minions$ = this.minionService.getMinions().pipe(
        catchError((error) => {
          this.error=true; 
          return of(error)}));
          this.minionError$ = this.minions$.pipe(ignoreElements(),
          catchError((err)=>of(err)))
    }
    console.log(this.name)
  }

  @Input() searchTerm:string = '';
  error: boolean = false;
  @Input() name:string = '';
  @Input() id:string = '';
  ngOnInit(): void {
  
/*     if(!this.name) this.minionService.getMinions().subscribe({
       next: (minions) => {//this.minions=minions;
      this.error= true;},
       error: ()=> this.error=true});
     */

       /* if(!this.name) this.minions$ = this.minionService.getMinions().pipe(
        catchError((error) => {
          this.error=true; 
          return of(error)})); */
      
      if(!this.name) {
        this.minions$ = this.minionService.getMinions();
        this.minionError$ = this.minions$.pipe(ignoreElements(),
        catchError((err)=>of(err)))
      
      };
      

  }

  goToInfo(id:string|undefined){
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

  deleteMinion(minion:Minion){

    try {
      this.minionService.deleteMinion(minion).subscribe({next: (deleted) => {
        //let newMinions = this.minions.filter(oldMinion => oldMinion!==minion);
        //this.minions = newMinions;
        this.minions$ = this.minionService.getMinions();
       
      }});
    } catch (error) {
      console.log(error)
    }
  }

  editMinion(id:string|undefined){
    this.router.navigate(["edit/minion/", id]);
  }

}
