import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AppApiService } from 'src/app/services/app-api-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Tag } from 'src/app/shared/models/ethnic-group.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ethnic-group-create',
  templateUrl: './ethnic-group-create.component.html',
  styleUrls: ['./ethnic-group-create.component.css'],
})
export class EthnicGroupCreateComponent {
  ethnicGroupForm!: FormGroup;
  data: any;
  dropdownTagsList: any[] = [];
  selectedItems: any[] = [];
  dropdownTagsSettings: IDropdownSettings = {};
  formTitle: string = 'Create Ethnic Group';
  group_data: any;
  isEdit: boolean = false;
  _initialFormValues: any;


  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective


  constructor(
    private formBuilder: FormBuilder,
    private apiService: AppApiService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) {
    //TODO: implement image + tags
    this.ethnicGroupForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required],
      population: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      geography: ['', Validators.required],
      history: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit() {
    //TODO: implement tags
    //get all tags or for filter by ethnic group instance
    this.dropdownTagsList = [
      { item_id: 1, name: 'Item1' },
      { item_id: 2, name: 'Item2' },
      { item_id: 3, name: 'Item3' },
    ];

    //TODO: implement tags
    //get all tags or for filter by ethnic group instance
    this.dropdownTagsSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'There is no item availabale to show',
    };

    // default tag items
    this.selectedItems = [
      { item_id: 1, name: 'Item1' },
      { item_id: 2, name: 'Item2' },
    ];

    //TODO pull from Tag objects else add a tag using a modal

    //TODO: implement edit
    if (this.dialogdata.id) {
      // fetch group data
      this.formTitle = 'Edit Ethhnic Group';
      this.isEdit = true;
      this._getEGroup();
      this._initialFormValues = this.ethnicGroupForm.value;
    }
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
          this.data = this.ethnicGroupForm.value;

          //update tags
          this.data.tags = this.data.tags.map(({ ...rest }) => {
            return { name: rest['name'] };
          });

          this.submitFormData(this.data);
        } else {
          alert('User cannot add form. Insufficient privileges.');
        }
      },
      error: (e) => console.log(e),
    });
  }

  onSubmitUpdate() {
    //get the current user to patch to the data
    this.apiService.isUserStaff().subscribe({
      next: (v) => {

        if (v) {
          if (this.ethnicGroupForm.invalid) {
            return;
          }
          this.data = this.ethnicGroupForm.value;

          //update tags
          this.data.tags = this.data.tags.map(({ ...rest }) => { return { name: rest['name'] } });

          this.submitUpdatedGroupData(this.data);
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
    this._initialFormValues = this.ethnicGroupForm.value;
  }

  submitUpdatedGroupData(data: any) {
    this.apiService.updateEthnicGroupById(this.dialogdata.id,data).subscribe({
      next: () => {
        this.toastr.success('Group updated successfully', 'Group Update');
      },
      error: (e) => this.toastr.error(e, 'Group Update')
    });
    this._initialFormValues = this.ethnicGroupForm.value;
  }

  //get group details
  private _getEGroup() {
    this.apiService.getEthnicGroupById(this.dialogdata.id).subscribe({
      next: (res) => {
        this.group_data=res;
        this.ethnicGroupForm.patchValue({
          id: this.dialogdata.id,
          name: this.group_data.name,
          description: this.group_data.description,
          language: this.group_data.language,
          population: this.group_data.population,
          geography: this.group_data.geography,
          history: this.group_data.history,
          tags: this.group_data.tags.map(({...res}) => { return {name: res['name']}}),
        });
        this._initialFormValues = this.ethnicGroupForm.value;
      },
      error: (e) => this.showErrorMessage(e)
    });

  }

  onClear(){
    this.ethnicGroupForm.reset();
  }
  onReset(e: Event){
    e.preventDefault();
    this.formDir.resetForm(this._initialFormValues);
  }

  getTags() {
    //get tags
  }

  showErrorMessage(e: any) {
    this.toastr.error(e.message);
  }
}
