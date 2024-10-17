import { Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [
  { path: '', redirectTo: 'dev', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  // { path: 'pokedetails', component: HeaderComponent }, // TODO
  { path: 'dev', component: TestComponent}
];
