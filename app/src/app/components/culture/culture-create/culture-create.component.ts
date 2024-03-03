import { Component,Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor(
    private formBuilder: FormBuilder,
    private apiService: AppApiService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) {}

  ngOnInit() {
    this._formBuild();
    if(this.dialogdata.id){
      this.formTitle = 'Edit Culture';
      this.isEdit = true;
      this._getCulture();
      this._initialFormvalues = this.cultureForm.value;
    }

  }
  private _getCulture() {
    // TODO: update the patch with all detail values
    this.apiService.getCultureById(this.dialogdata.id).subscribe({
      next: (res) =>{
        this.cultureData = res;
        this.cultureForm.patchValue({
          id: this.dialogdata.id,
          name: this.cultureData.name,
          description: this.cultureData.description
        });
        this._initialFormvalues = this.cultureForm.value;


      },
      error: (e) => this.showErrorMessage(e)
    });

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
  onSubmitUpdate(){

    this.apiService.isUserStaff().subscribe({
      next: (res) => {
        if (res){
          if(this.cultureForm.invalid)
          {return;}
          this.data = this.cultureForm.value;
          this.submitUpdatedCultureData(this.data);
        }else{alert('User cannot add form. Insufficient privileges.');}
      }
    });

  }
// TODO: deal with page reloads
  submitUpdatedCultureData(data: any) {
    this.apiService.updateCultureById(this.dialogdata.id, data)
    .subscribe({
      next: () => this.toastr.success('Culture updated successfully', 'Culture Update'),
      error: (e) => this.toastr.error(e, 'Culture Update')
    });
  }

  onClear() {
    this.cultureForm.reset();
  }

  OnReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this._initialFormvalues);
  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
}
