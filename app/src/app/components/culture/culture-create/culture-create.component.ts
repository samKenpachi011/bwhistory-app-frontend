import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppApiService } from 'src/app/services/app-api-service.service';

@Component({
  selector: 'app-culture-create',
  templateUrl: './culture-create.component.html',
  styleUrls: ['./culture-create.component.css'],
})
export class CultureCreateComponent {
  formTitle: string = 'Create Culture';
  cultureForm!: FormGroup;
  isEdit: boolean = false;
  cultureData: any;
  data: any;
  _initialFormvalues: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: AppApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._formBuild();
  }

  _formBuild() {
    this.cultureForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.apiService.isUserStaff().subscribe({
      next: (v) => {
        if (v) {
          if (this.cultureForm.invalid) {
            return;
          }
          this.data = this.cultureForm.value;
          this.submitFormData(this.data);
        }
      },
      error: (e) => console.log(e),
    });
  }

  submitFormData(data: any) {
    console.log('---Submit form data---');
    this.apiService.createCulture(data).subscribe({
      next: () => {
        alert(
          'Creation Success of group :-)\n\n' +
            JSON.stringify(this.cultureForm.value['name'], null, 4)
        );
      },
      error: (e) => console.log(e),
    });
    //TODO: set initial form values
  }

  OnClear() {
    this.cultureForm.reset();
  }
  OnReset(e: Event) {
    e.preventDefault();
  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
}
