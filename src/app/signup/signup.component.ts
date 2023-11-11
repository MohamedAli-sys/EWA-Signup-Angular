import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignupForm } from '../shared/models/isignup-form';
import { IContacts } from '../shared/models/icontacts';
import { SignupService } from '../shared/services/signup.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<ISignupForm>;
  submitted: boolean = false;
  subscribes!: Subscription;
  constructor(private service: SignupService) {}

  initForm(): void {
    this.formGroup = new FormGroup<ISignupForm>({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  setSelected(evt: IContacts) {
    console.log(evt);
    this.formGroup.patchValue({
      firstName: evt.firstName,
      lastName: evt.lastName,
      mobile: evt.contactNo,
      fullName: `${evt.firstName} ${evt.lastName}`,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) return;
    this.subscribes = this.service
      .signup(this.formGroup.value! as IContacts)
      .subscribe((res: HttpResponse<any>) => {
        if (res.status) alert('Signed Up');
        else alert('Something went wrong');
      });
  }

  ngOnDestroy(): void {
    if (this.subscribes) this.subscribes.unsubscribe();
  }
}
