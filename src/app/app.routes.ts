import { Routes } from '@angular/router';
import { MinionComponent } from './minion/minion.component';
import { FocusMinionComponent } from './focus-minion/focus-minion.component';
import { FormMinionComponent } from './form-minion/form-minion.component';

export const routes: Routes = [
    {path: "", component: MinionComponent},
    {path:"minion", component:MinionComponent,children:[{path:'focus/:id', component:FocusMinionComponent}]},
    {path:"minion/:name", component:MinionComponent},
    {path:"add/minion", component:FormMinionComponent},
    {path:"edit/minion/:id", component:FormMinionComponent}];
