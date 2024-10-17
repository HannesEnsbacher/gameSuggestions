import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "./button/button.component";
import {CardComponent} from "./card/card.component";



@NgModule({
  declarations: [
  ],
  exports: [
    ButtonComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent
  ]
})
export class SharedModule { }
