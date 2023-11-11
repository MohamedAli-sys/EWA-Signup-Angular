import { FormControl } from '@angular/forms';

export interface ISignupForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  fullName: FormControl<string | null>;
  mobile: FormControl<string | null>;
}
