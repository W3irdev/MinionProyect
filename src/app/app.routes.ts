import { Routes } from '@angular/router';
import { MinionComponent } from './minion/minion.component';

export const routes: Routes = [
    {path: "", component: MinionComponent},
    {path:"minion/:name", component:MinionComponent}];
