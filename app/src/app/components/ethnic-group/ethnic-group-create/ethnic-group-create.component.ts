import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppApiService } from 'src/app/services/app-api-service.service';

@Component({
  selector: 'app-ethnic-group-create',
  templateUrl: './ethnic-group-create.component.html',
  styleUrls: ['./ethnic-group-create.component.css'],
})
export class EthnicGroupCreateComponent {
  ethnicGroupForm!: FormGroup;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: AppApiService
  ) {}

  ngOnInit() {
    //TODO: check the user role

    this.ethnicGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required],
      population: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      geography: ['', Validators.required],
      history: ['', Validators.required],
      //tags: ['', Validators.required],
      //TODO: implement image + tags
    });
  }

  get f() {
    return this.ethnicGroupForm.controls;
  }
  onSubmit() {
    //get the current user to patch to the data
    this.apiService.isUserStaff().subscribe({
      next: (v) => {
        if (v) {
          // User is staff, proceed with form submission logic

          if (this.ethnicGroupForm.invalid) {
            return;
          }
          this.submitFormData(this.ethnicGroupForm.value);
        } else {
          alert('User cannot add form. Insufficient privileges.');
        }
      },
      error: (e) => console.log(e),
    });
  }

  submitFormData(data: any) {
    this.apiService.createEthnicGroup(data).subscribe({
      next: () => {
        alert(
          'Creation Success of group :-)\n\n' +
            JSON.stringify(this.ethnicGroupForm.value['name'], null, 4)
        );
        //reload the data
      },
      error: (e) => console.log(e),
    });
  }
}
