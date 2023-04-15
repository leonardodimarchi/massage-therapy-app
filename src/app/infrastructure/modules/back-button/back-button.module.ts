import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BackButtonService } from "./services/back-button.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    BackButtonService,
  ]
})
export class BackButtonModule {}
