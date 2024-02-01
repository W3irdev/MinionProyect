import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnChanges{
  constructor(private route:Router, private router:ActivatedRoute){}
  ngOnChanges(changes: SimpleChanges): void {
    this.router.params.subscribe({
      next: (params) => {
        this.term = params['search']
      }
    })
    console.log(this.term)
  }

  term:string = "";
  @Output() searchTerm:EventEmitter<string> = new EventEmitter<string>();

  emitEvent(){
    this.searchTerm.emit(this.term);
  }

  goTo(){
    this.route.navigate(["minion", this.term])
  }

}
