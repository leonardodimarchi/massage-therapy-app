import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: '[formGroup] app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss'],
})
export class BasicInformationFormComponent implements OnInit {

  constructor(
    private controlContainer: ControlContainer,
  ) { }

  public ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }

  public form!: FormGroup;

  public isShowingPassword: boolean = false;

  public isShowingConfirmationPassword: boolean = false;
}
