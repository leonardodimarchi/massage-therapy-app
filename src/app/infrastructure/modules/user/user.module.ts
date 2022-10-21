import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceInterface } from 'src/app/domain/contracts/services/user_service.interface';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: UserServiceInterface, useClass: UserService },
  ]
})
export class UserModule { }
